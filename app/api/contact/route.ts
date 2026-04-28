import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';
import { render } from '@react-email/render';
import ContactEmail from '@/emails/ContactEmail';
import { checkRateLimit } from '@/lib/rate-limit';

const schema = z.object({
  company: z.string().min(1).max(200),
  email: z.string().email().max(200),
  jurisdiction: z.string().min(1).max(200),
  message: z.string().min(1).max(4000),
  _hp: z.string().max(0, 'Bot detected'), // honeypot must be empty
  _t: z.string().transform(Number).pipe(z.number().min(3000)), // min 3 s fill time
});

export async function POST(req: NextRequest) {
  // Rate-limit by IP
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    'unknown';

  const { ok, retryAfterMs } = checkRateLimit(ip);
  if (!ok) {
    return NextResponse.json(
      { error: 'Too many requests' },
      {
        status: 429,
        headers: { 'Retry-After': String(Math.ceil(retryAfterMs / 1000)) },
      },
    );
  }

  // Parse and validate body
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed', issues: parsed.error.issues }, { status: 400 });
  }

  const { company, email, jurisdiction, message } = parsed.data;

  // Send via Resend
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO ?? 'corporate@allianzgold.com';
  const from = process.env.CONTACT_FROM ?? 'onboarding@resend.dev';

  if (!apiKey) {
    console.error('[contact] RESEND_API_KEY not configured');
    return NextResponse.json({ error: 'Mail service not configured' }, { status: 503 });
  }

  const resend = new Resend(apiKey);

  try {
    const html = await render(
      ContactEmail({ company, email, jurisdiction, message }),
    );

    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Institutional enquiry — ${company}`,
      html,
    });

    if (error) {
      console.error('[contact] Resend error:', error);
      return NextResponse.json({ error: 'Mail delivery failed' }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[contact] Unexpected error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

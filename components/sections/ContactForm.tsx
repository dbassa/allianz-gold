'use client';

import { useState, useRef, useId } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/cn';
import { ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';

type FormState = 'idle' | 'submitting' | 'success' | 'error' | 'rate-limited';

type FieldError = Partial<Record<'company' | 'email' | 'jurisdiction' | 'message', string>>;

function validate(data: {
  company: string;
  email: string;
  jurisdiction: string;
  message: string;
}): FieldError {
  const errors: FieldError = {};
  if (!data.company.trim()) errors.company = 'required';
  if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = 'required';
  if (!data.jurisdiction.trim()) errors.jurisdiction = 'required';
  if (!data.message.trim()) errors.message = 'required';
  return errors;
}

export function ContactForm() {
  const t = useTranslations('contact.form');
  const [state, setState] = useState<FormState>('idle');
  const [errors, setErrors] = useState<FieldError>({});
  const formRef = useRef<HTMLFormElement>(null);
  const startRef = useRef<number>(Date.now());
  const honeypotId = useId();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = {
      company: (form.elements.namedItem('company') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      jurisdiction: (form.elements.namedItem('jurisdiction') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
      _hp: (form.elements.namedItem('_hp') as HTMLInputElement).value,
      _t: String(Date.now() - startRef.current),
    };

    const fieldErrors = validate(data);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setState('submitting');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.status === 429) {
        setState('rate-limited');
      } else if (res.ok) {
        setState('success');
        formRef.current?.reset();
      } else {
        setState('error');
      }
    } catch {
      setState('error');
    }
  }

  if (state === 'success') {
    return (
      <div className="flex flex-col items-start gap-4 py-12">
        <CheckCircle strokeWidth={1} className="h-8 w-8 text-champagne" />
        <p className="max-w-md text-base text-bone/80">{t('success')}</p>
      </div>
    );
  }

  const isSubmitting = state === 'submitting';

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
      {/* Honeypot — hidden from real users */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label htmlFor={honeypotId}>Leave empty</label>
        <input id={honeypotId} name="_hp" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Field
          name="company"
          label={t('company')}
          type="text"
          autoComplete="organization"
          error={errors.company ? t(`validation.company`) : undefined}
          disabled={isSubmitting}
        />
        <Field
          name="email"
          label={t('email')}
          type="email"
          autoComplete="email"
          error={errors.email ? t(`validation.email`) : undefined}
          disabled={isSubmitting}
        />
      </div>
      <Field
        name="jurisdiction"
        label={t('jurisdiction')}
        type="text"
        error={errors.jurisdiction ? t(`validation.jurisdiction`) : undefined}
        disabled={isSubmitting}
      />
      <Field
        name="message"
        label={t('message')}
        as="textarea"
        rows={5}
        error={errors.message ? t(`validation.message`) : undefined}
        disabled={isSubmitting}
      />

      {(state === 'error' || state === 'rate-limited') && (
        <div className="flex items-start gap-3 text-sm text-bone/70">
          <AlertCircle strokeWidth={1} className="mt-0.5 h-4 w-4 shrink-0 text-champagne" />
          <span>{state === 'rate-limited' ? t('rateLimited') : t('error')}</span>
        </div>
      )}

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="group inline-flex items-center gap-3 border border-champagne/60 px-7 py-4 text-sm uppercase tracking-[0.25em] text-champagne transition-all duration-500 hover:border-champagne hover:bg-champagne/[0.06] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span>{isSubmitting ? t('submitting') : t('submit')}</span>
          {!isSubmitting && (
            <ArrowRight
              strokeWidth={1}
              className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
            />
          )}
        </button>
      </div>
    </form>
  );
}

type FieldProps = {
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  error?: string;
  disabled?: boolean;
  as?: 'input' | 'textarea';
  rows?: number;
};

function Field({ name, label, type = 'text', autoComplete, error, disabled, as = 'input', rows }: FieldProps) {
  const id = `field-${name}`;
  const inputClass = cn(
    'w-full border-b border-rule/70 bg-transparent py-4 text-base text-paper placeholder-transparent transition-colors duration-300 focus:border-champagne/70 focus:outline-none',
    error && 'border-champagne/40',
    disabled && 'cursor-not-allowed opacity-60',
  );

  return (
    <div className="group relative flex flex-col-reverse gap-1">
      {error && (
        <span className="text-xs text-champagne/80">{error}</span>
      )}
      {as === 'textarea' ? (
        <textarea
          id={id}
          name={name}
          rows={rows ?? 4}
          disabled={disabled}
          placeholder={label}
          className={cn(inputClass, 'resize-none')}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          autoComplete={autoComplete}
          disabled={disabled}
          placeholder={label}
          className={inputClass}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      )}
      <label
        htmlFor={id}
        className="text-xs uppercase tracking-[0.2em] text-champagne/60 transition-colors group-focus-within:text-champagne/90"
      >
        {label}
      </label>
    </div>
  );
}

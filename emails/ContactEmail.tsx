import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Hr,
  Preview,
} from '@react-email/components';
import type { CSSProperties } from 'react';

type ContactEmailProps = {
  company: string;
  email: string;
  jurisdiction: string;
  message: string;
};

const dark = '#0C0C0E';
const champagne = '#9C8660';
const bone = '#E3DDD1';

const styles: Record<string, CSSProperties> = {
  body: { backgroundColor: dark, margin: 0, padding: 0 },
  container: { maxWidth: '600px', margin: '0 auto', padding: '40px 32px' },
  eyebrow: {
    color: champagne,
    fontSize: '10px',
    letterSpacing: '0.3em',
    textTransform: 'uppercase' as const,
    marginBottom: '24px',
  },
  heading: {
    color: bone,
    fontFamily: 'Georgia, serif',
    fontSize: '24px',
    fontWeight: '400',
    margin: '0 0 32px',
    lineHeight: '1.3',
  },
  label: {
    color: champagne,
    fontFamily: 'Georgia, serif',
    fontSize: '11px',
    letterSpacing: '0.2em',
    textTransform: 'uppercase' as const,
    marginBottom: '6px',
  },
  value: {
    color: bone,
    fontFamily: 'Arial, sans-serif',
    fontSize: '14px',
    lineHeight: '1.6',
    marginBottom: '24px',
  },
  hr: { borderColor: '#1E3040', margin: '32px 0' },
  footer: {
    color: '#4A5568',
    fontFamily: 'Arial, sans-serif',
    fontSize: '11px',
    letterSpacing: '0.1em',
  },
};

export default function ContactEmail({ company, email, jurisdiction, message }: ContactEmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>New institutional enquiry from {company}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Text style={styles.eyebrow}>Allianz Gold · Institutional Contact</Text>
          <Text style={styles.heading}>New enquiry received</Text>

          <Text style={styles.label}>Company</Text>
          <Text style={styles.value}>{company}</Text>

          <Text style={styles.label}>Corporate email</Text>
          <Text style={styles.value}>{email}</Text>

          <Text style={styles.label}>Asset jurisdiction</Text>
          <Text style={styles.value}>{jurisdiction}</Text>

          <Hr style={styles.hr} />

          <Text style={styles.label}>Message</Text>
          <Text style={{ ...styles.value, whiteSpace: 'pre-wrap' }}>{message}</Text>

          <Hr style={styles.hr} />
          <Text style={styles.footer}>
            Allianz Gold · Business Center Dubai South · Dubai · UAE · DED 1065531
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Button, ButtonLink } from '../components/Button/Button';
import { TextField } from '../components/TextField/TextField';
import {
  INTENTS,
  MESSAGE_MAX,
  submitContact,
  validateContact,
  type ContactErrors,
  type ContactInput,
  type SubmitResult,
} from '../lib/contact';
import styles from './ContactForm.module.css';

const EMPTY: ContactInput = { name: '', email: '', intent: 'own-idea', message: '' };

type Status = 'idle' | 'sending' | 'sent';

export interface ContactFormProps {
  /** Injected for tests; defaults to the real submitter. */
  onSubmit?: (input: ContactInput) => Promise<SubmitResult>;
}

export function ContactForm({ onSubmit = submitContact }: ContactFormProps) {
  const [values, setValues] = useState<ContactInput>(EMPTY);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [sendError, setSendError] = useState<string | null>(null);
  const [sentVia, setSentVia] = useState<'endpoint' | 'email'>('endpoint');
  const successRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (status === 'sent') successRef.current?.focus();
  }, [status]);

  function update<K extends keyof ContactInput>(key: K, value: ContactInput[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    // Clear a field's error as soon as the person starts fixing it.
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validateContact(values);
    setErrors(found);
    setSendError(null);
    const firstInvalid = (Object.keys(found) as Array<keyof ContactInput>)[0];
    if (firstInvalid) {
      document.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    setStatus('sending');
    const result = await onSubmit(values);
    if (result.ok) {
      setSentVia(result.via);
      setStatus('sent');
      setValues(EMPTY);
    } else {
      setSendError(result.message);
      setStatus('idle');
    }
  }

  if (status === 'sent') {
    return (
      <div className={styles.panel}>
        <div className={styles.success} role="status">
          <span aria-hidden="true" className={styles.successArch} />
          <h2 ref={successRef} tabIndex={-1} className={styles.successTitle}>
            {sentVia === 'email' ? 'Almost there.' : 'Thank you. We’ve got it.'}
          </h2>
          <p className={styles.note}>
            {sentVia === 'email'
              ? 'Your email app should have opened with your message ready to send. Press send there and we’ll be in touch.'
              : 'Someone from the team will be in touch soon. In the meantime, see how we work.'}
          </p>
          <div className={styles.successActions}>
            <ButtonLink to="/how-we-work" variant="secondary">
              How we work
            </ButtonLink>
            <Button variant="ghost" onClick={() => setStatus('idle')}>
              Send another message
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const sending = status === 'sending';

  return (
    <div className={styles.panel}>
      <form className={styles.form} onSubmit={handleSubmit} noValidate aria-busy={sending}>
        <div className={styles.row}>
          <TextField
            label="Your name"
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={(e) => update('name', e.target.value)}
            error={errors.name}
            required
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            value={values.email}
            onChange={(e) => update('email', e.target.value)}
            error={errors.email}
            required
          />
        </div>

        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>I&rsquo;d like to</legend>
          {INTENTS.map((intent) => (
            <label key={intent.value} className={styles.option}>
              <input
                type="radio"
                name="intent"
                value={intent.value}
                checked={values.intent === intent.value}
                onChange={() => update('intent', intent.value)}
              />
              {intent.label}
            </label>
          ))}
        </fieldset>

        <TextField
          multiline
          label="Tell us more"
          name="message"
          rows={5}
          maxLength={MESSAGE_MAX}
          hint="What problem does it solve, and for whom? A few sentences is plenty."
          value={values.message}
          onChange={(e) => update('message', e.target.value)}
          error={errors.message}
          required
        />

        {sendError && (
          <p className={styles.alert} role="alert">
            {sendError}
          </p>
        )}

        <div className={styles.submitRow}>
          <Button type="submit" variant="primary" disabled={sending}>
            {sending ? 'Sending…' : 'Send message'}
          </Button>
          <span className={styles.note}>We&rsquo;ll only use your details to reply.</span>
        </div>
      </form>
    </div>
  );
}

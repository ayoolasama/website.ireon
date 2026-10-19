import { site } from '../data/site';

export const INTENTS = [
  { value: 'own-idea', label: 'Share an idea of my own' },
  { value: 'build-ireon-idea', label: "Build and run one of Ireon's ideas" },
  { value: 'partner', label: 'Partner or invest with Ireon' },
] as const;

export type Intent = (typeof INTENTS)[number]['value'];

export interface ContactInput {
  name: string;
  email: string;
  intent: Intent;
  message: string;
}

export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const MESSAGE_MAX = 2000;

/** Validates the contact form. Returns an empty object when everything is fine. */
export function validateContact(input: ContactInput): ContactErrors {
  const errors: ContactErrors = {};
  if (!input.name.trim()) {
    errors.name = 'Please tell us your name.';
  }
  if (!input.email.trim()) {
    errors.email = 'Please add your email so we can reply.';
  } else if (!EMAIL_PATTERN.test(input.email.trim())) {
    errors.email = 'That email doesn’t look right — check for a typo.';
  }
  if (!INTENTS.some((i) => i.value === input.intent)) {
    errors.intent = 'Please choose what you’d like to do.';
  }
  if (input.message.trim().length < 10) {
    errors.message = 'A sentence or two is plenty — but we need something to go on.';
  } else if (input.message.length > MESSAGE_MAX) {
    errors.message = `Please keep it under ${MESSAGE_MAX} characters.`;
  }
  return errors;
}

export function intentLabel(intent: Intent): string {
  return INTENTS.find((i) => i.value === intent)?.label ?? intent;
}

/** Builds a mailto: link carrying the form contents — the fallback when no endpoint is configured. */
export function buildMailto(input: ContactInput): string {
  const subject = `${intentLabel(input.intent)} — ${input.name.trim()}`;
  const body = `${input.message.trim()}\n\n— ${input.name.trim()} (${input.email.trim()})`;
  return `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export type SubmitResult = { ok: true; via: 'endpoint' | 'email' } | { ok: false; message: string };

/**
 * Sends the enquiry. With VITE_CONTACT_ENDPOINT set, POSTs JSON there (Formspree, Basin, your own API…).
 * Without it, opens the visitor's email app addressed to the contact email, so no message is lost.
 */
export async function submitContact(
  input: ContactInput,
  endpoint: string | undefined = import.meta.env.VITE_CONTACT_ENDPOINT,
  fetchImpl: typeof fetch = fetch,
): Promise<SubmitResult> {
  if (!endpoint) {
    window.location.href = buildMailto(input);
    return { ok: true, via: 'email' };
  }
  try {
    const response = await fetchImpl(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        ...input,
        intentLabel: intentLabel(input.intent),
        source: 'ireon.org',
      }),
    });
    if (!response.ok) {
      return {
        ok: false,
        message: `We couldn’t send that just now. Please try again, or email us at ${site.contact.email}.`,
      };
    }
    return { ok: true, via: 'endpoint' };
  } catch {
    return {
      ok: false,
      message: `Your connection dropped before we got it. Please try again, or email us at ${site.contact.email}.`,
    };
  }
}

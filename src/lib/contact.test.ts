import { describe, expect, it, vi } from 'vitest';
import { buildMailto, submitContact, validateContact, type ContactInput } from './contact';

const valid: ContactInput = {
  name: 'Ada Obi',
  email: 'ada@example.com',
  intent: 'own-idea',
  message: 'A cold-chain network for fish traders in Lagos markets.',
};

describe('validateContact', () => {
  it('accepts a complete enquiry', () => {
    expect(validateContact(valid)).toEqual({});
  });

  it('flags every missing field in plain language', () => {
    const errors = validateContact({ name: ' ', email: '', intent: 'own-idea', message: '' });
    expect(errors.name).toBe('Please tell us your name.');
    expect(errors.email).toBe('Please add your email so we can reply.');
    expect(errors.message).toMatch(/A sentence or two/);
  });

  it('rejects a malformed email', () => {
    expect(validateContact({ ...valid, email: 'ada@ojafresh' }).email).toMatch(
      /doesn’t look right/,
    );
  });

  it('rejects an unknown intent', () => {
    expect(
      validateContact({ ...valid, intent: 'spam' as ContactInput['intent'] }).intent,
    ).toBeDefined();
  });
});

describe('buildMailto', () => {
  it('addresses the contact email and encodes the message', () => {
    const href = buildMailto(valid);
    expect(href.startsWith('mailto:hello@ireon.org?subject=')).toBe(true);
    expect(decodeURIComponent(href)).toContain('Share an idea of my own — Ada Obi');
    expect(decodeURIComponent(href)).toContain('ada@example.com');
  });
});

describe('submitContact', () => {
  it('posts JSON to the configured endpoint', async () => {
    const fetchImpl = vi.fn().mockResolvedValue({ ok: true });
    const result = await submitContact(valid, 'https://example.com/form', fetchImpl);
    expect(result).toEqual({ ok: true, via: 'endpoint' });
    const [url, init] = fetchImpl.mock.calls[0]!;
    expect(url).toBe('https://example.com/form');
    expect(JSON.parse(init.body)).toMatchObject({
      name: 'Ada Obi',
      intentLabel: 'Share an idea of my own',
    });
  });

  it('returns a friendly error when the endpoint fails', async () => {
    const fetchImpl = vi.fn().mockResolvedValue({ ok: false });
    const result = await submitContact(valid, 'https://example.com/form', fetchImpl);
    expect(result.ok).toBe(false);
  });

  it('returns a friendly error when the network drops', async () => {
    const fetchImpl = vi.fn().mockRejectedValue(new TypeError('Failed to fetch'));
    const result = await submitContact(valid, 'https://example.com/form', fetchImpl);
    expect(result).toMatchObject({ ok: false });
  });
});

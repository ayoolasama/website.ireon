import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { routerFuture } from '../routerFuture';
import { ContactForm } from './ContactForm';

function renderForm(onSubmit = vi.fn().mockResolvedValue({ ok: true, via: 'endpoint' })) {
  render(
    <MemoryRouter future={routerFuture}>
      <ContactForm onSubmit={onSubmit} />
    </MemoryRouter>,
  );
  return { onSubmit, user: userEvent.setup() };
}

describe('ContactForm', () => {
  it('shows errors and does not submit when fields are empty', async () => {
    const { onSubmit, user } = renderForm();
    await user.click(screen.getByRole('button', { name: 'Send message' }));
    expect(screen.getByText('Please tell us your name.')).toBeInTheDocument();
    expect(screen.getByLabelText('Your name')).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByLabelText('Your name')).toHaveFocus();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('submits a valid enquiry and confirms it', async () => {
    const { onSubmit, user } = renderForm();
    await user.type(screen.getByLabelText('Your name'), 'Ada Obi');
    await user.type(screen.getByLabelText('Email'), 'ada@example.com');
    await user.click(screen.getByLabelText("Build and run one of Ireon's ideas"));
    await user.type(
      screen.getByLabelText('Tell us more'),
      'I have run logistics teams for ten years.',
    );
    await user.click(screen.getByRole('button', { name: 'Send message' }));

    expect(onSubmit).toHaveBeenCalledWith({
      name: 'Ada Obi',
      email: 'ada@example.com',
      intent: 'build-ireon-idea',
      message: 'I have run logistics teams for ten years.',
    });
    expect(await screen.findByRole('heading', { name: 'Thank you. We’ve got it.' })).toHaveFocus();
  });

  it('keeps the form and shows the error when sending fails', async () => {
    const { user } = renderForm(
      vi.fn().mockResolvedValue({ ok: false, message: 'Please try again.' }),
    );
    await user.type(screen.getByLabelText('Your name'), 'Ada');
    await user.type(screen.getByLabelText('Email'), 'ada@example.com');
    await user.type(screen.getByLabelText('Tell us more'), 'A short description of the idea.');
    await user.click(screen.getByRole('button', { name: 'Send message' }));
    expect(await screen.findByRole('alert')).toHaveTextContent('Please try again.');
    expect(screen.getByLabelText('Your name')).toHaveValue('Ada');
  });
});

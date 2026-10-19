import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { App } from './App';
import { routerFuture } from './routerFuture';

function renderAt(path: string) {
  render(
    <MemoryRouter initialEntries={[path]} future={routerFuture}>
      <App />
    </MemoryRouter>,
  );
}

describe('routing', () => {
  it.each([
    ['/', 'Where ideas are built and given room to fly.'],
    ['/how-we-work', 'Built together. Then free to fly.'],
    ['/ventures', 'Ideas we’ve built, and the teams flying them.'],
    ['/contact', 'Start a conversation.'],
    ['/nope', 'This page hasn’t been built yet.'],
  ])('renders %s', (path, heading) => {
    renderAt(path);
    expect(screen.getByRole('heading', { level: 1, name: heading })).toBeInTheDocument();
  });

  it('marks the current page in the main navigation', async () => {
    renderAt('/');
    const nav = screen.getByRole('navigation', { name: 'Main' });
    await userEvent.setup().click(within(nav).getByRole('link', { name: 'How we work' }));
    expect(within(nav).getByRole('link', { name: 'How we work' })).toHaveAttribute(
      'aria-current',
      'page',
    );
    expect(
      screen.getByRole('heading', { level: 1, name: 'Built together. Then free to fly.' }),
    ).toBeInTheDocument();
  });

  it('shows the contact details in the footer', () => {
    renderAt('/');
    expect(screen.getByRole('link', { name: 'hello@ireon.org' })).toHaveAttribute(
      'href',
      'mailto:hello@ireon.org',
    );
  });
});

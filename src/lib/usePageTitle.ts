import { useEffect } from 'react';
import { site } from '../data/site';

/** Sets document.title (and the meta description, when given) for the current page. */
export function usePageTitle(title: string | null, description?: string): void {
  useEffect(() => {
    document.title = title
      ? `${title} — ${site.name}`
      : `${site.name} — ${site.tagline.replace(/\.$/, '')}`;
    if (description) {
      document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    }
  }, [title, description]);
}

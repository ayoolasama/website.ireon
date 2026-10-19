import { ButtonLink } from '../components/Button/Button';
import { Eyebrow } from '../components/SectionIntro/SectionIntro';
import { cx } from '../lib/cx';
import { usePageTitle } from '../lib/usePageTitle';
import styles from './pages.module.css';

export default function NotFoundPage() {
  usePageTitle('Page not found');

  return (
    <section className={cx('container', styles.pageHero)} aria-labelledby="nf-title">
      <div className={styles.pageHeroText}>
        <Eyebrow>Page not found</Eyebrow>
        <h1 id="nf-title" className={styles.display}>
          This page hasn&rsquo;t been built yet.
        </h1>
        <p className={styles.lead}>The link may be old, or the address may have a typo.</p>
        <div className={styles.actions}>
          <ButtonLink to="/" variant="primary">
            Go to the home page
          </ButtonLink>
          <ButtonLink to="/contact" variant="secondary">
            Contact us
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

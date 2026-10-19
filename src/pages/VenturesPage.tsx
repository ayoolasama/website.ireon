import { Link } from 'react-router-dom';
import { Eyebrow } from '../components/SectionIntro/SectionIntro';
import { VentureCard } from '../components/VentureCard/VentureCard';
import { ventures } from '../data/ventures';
import { cx } from '../lib/cx';
import { usePageTitle } from '../lib/usePageTitle';
import styles from './pages.module.css';

export default function VenturesPage() {
  usePageTitle('Ventures', 'The ventures built at Ireon Ventures, and the teams flying them.');

  return (
    <>
      <section className={cx('container', styles.pageHero)} aria-labelledby="ventures-title">
        <div className={styles.pageHeroText}>
          <Eyebrow>Our ventures</Eyebrow>
          <h1 id="ventures-title" className={styles.display}>
            Ideas we&rsquo;ve built, and the teams flying them.
          </h1>
          <p className={styles.lead}>
            Every venture here started as an idea, ours or a founder&rsquo;s, and grew with Ireon
            behind it.
          </p>
        </div>
      </section>

      <section className="container" aria-label="Portfolio">
        {/* role="list" keeps list semantics in Safari, which drops them when list-style is none. */}
        {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
        <ul className={styles.ventureGrid} role="list">
          {ventures.map((venture) => (
            <li key={venture.id}>
              <VentureCard venture={venture} />
            </li>
          ))}
          <li>
            <Link to="/contact" className={styles.nextCard}>
              <span aria-hidden="true" className={styles.nextArch} />
              <span className={styles.nextText}>
                <span className={styles.cardTitle}>Your idea could be next</span>
                <span className={styles.nextLink}>Start a conversation →</span>
              </span>
            </Link>
          </li>
        </ul>
      </section>
    </>
  );
}

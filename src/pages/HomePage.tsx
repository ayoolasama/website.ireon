import { Arch } from '../components/Arch/Arch';
import { ButtonLink } from '../components/Button/Button';
import { CtaBand } from '../components/CtaBand/CtaBand';
import { HeroArt } from '../components/HeroArt/HeroArt';
import { Eyebrow, SectionIntro } from '../components/SectionIntro/SectionIntro';
import { journey, pillars } from '../data/content';
import { cx } from '../lib/cx';
import { usePageTitle } from '../lib/usePageTitle';
import styles from './pages.module.css';

export default function HomePage() {
  usePageTitle(null);

  return (
    <>
      <section className={cx('container', styles.hero)} aria-labelledby="home-title">
        <div className={styles.heroText}>
          <Eyebrow>Venture lab</Eyebrow>
          <h1 id="home-title" className={styles.display}>
            Where ideas are built and given room to fly.
          </h1>
          <p className={styles.lead}>
            Some ideas start with us. Some start with founders who come to us. Either way, we
            provide the technology, the platform, sound governance and access to capital — and help
            each venture grow until it can fly on its own.
          </p>
          <div className={styles.actions}>
            <ButtonLink to="/contact" variant="primary">
              Tell us about your idea
            </ButtonLink>
            <ButtonLink to="/how-we-work" variant="secondary">
              How we work
            </ButtonLink>
          </div>
        </div>
        <HeroArt />
      </section>

      <section className={styles.raised} aria-labelledby="bring-title">
        <div className={cx('container', styles.section)}>
          <SectionIntro
            id="bring-title"
            eyebrow="What we bring"
            title="Everything a young venture needs, rarely found in one place."
          />
          <div className={styles.pillarGrid}>
            {pillars.map((pillar) => (
              <article key={pillar.id} className={styles.pillarCard}>
                <Arch colour={pillar.colour} />
                <h3 className={styles.cardTitle}>{pillar.title}</h3>
                <p className={styles.muted}>{pillar.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={cx('container', styles.section)} aria-labelledby="how-title">
        <SectionIntro id="how-title" eyebrow="How it works" title="Build. Grow. Fly." />
        <ol className={styles.steps}>
          {journey.map((step, i) => (
            <li
              key={step.number}
              className={cx(styles.step, i === journey.length - 1 && styles.stepLast)}
            >
              <span className={styles.stepNumber}>{step.number}</span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.muted}>{step.short}</p>
            </li>
          ))}
        </ol>
      </section>

      <CtaBand />
    </>
  );
}

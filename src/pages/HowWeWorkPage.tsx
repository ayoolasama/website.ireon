import { Arch } from '../components/Arch/Arch';
import { CtaBand } from '../components/CtaBand/CtaBand';
import { Eyebrow, SectionIntro } from '../components/SectionIntro/SectionIntro';
import { journey, lookingFor, pillars } from '../data/content';
import { cx } from '../lib/cx';
import { usePageTitle } from '../lib/usePageTitle';
import styles from './pages.module.css';

export default function HowWeWorkPage() {
  usePageTitle(
    'How we work',
    'Technology, platform, governance and access to capital — how Ireon Ventures builds ventures and gives them room to fly.',
  );

  return (
    <>
      <section className={cx('container', styles.pageHero)} aria-labelledby="hww-title">
        <div className={styles.pageHeroText}>
          <Eyebrow>How we work</Eyebrow>
          <h1 id="hww-title" className={styles.display}>
            Built together. Then free to fly.
          </h1>
        </div>
        <p className={styles.pageHeroLead}>
          A good idea needs more than money. It needs people who can build it, foundations that let
          it scale and the discipline that earns trust. We bring all of that, then step back when
          it&rsquo;s ready.
        </p>
      </section>

      <section className={styles.raised} aria-label="What we bring">
        <div className={cx('container', styles.pillarDetailGrid)}>
          {pillars.map((pillar) => (
            <article key={pillar.id} className={styles.pillarDetail}>
              <div className={styles.pillarHeading}>
                <Arch colour={pillar.colour} width={32} height={40} />
                <h2 className={styles.h2Small}>{pillar.title}</h2>
              </div>
              <p className={styles.lead}>{pillar.description}</p>
              <ul className={styles.list}>
                {pillar.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className={cx('container', styles.section)} aria-labelledby="journey-title">
        <SectionIntro
          id="journey-title"
          eyebrow="The journey"
          title="From first sketch to flying solo."
        />
        <ol className={styles.journey}>
          {journey.map((step, i) => (
            <li
              key={step.number}
              className={cx(styles.journeyRow, i === journey.length - 1 && styles.stepLast)}
            >
              <div className={styles.journeyLabel}>
                <span className={styles.stepNumber}>{step.number}</span>
                <h3 className={styles.h2Small}>{step.title}</h3>
              </div>
              <p className={styles.lead}>{step.long}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.sunken} aria-labelledby="look-title">
        <div className={cx('container', styles.section)}>
          <SectionIntro id="look-title" title="What we look for" />
          <div className={styles.lookGrid}>
            {lookingFor.map((item) => (
              <div key={item.title} className={styles.lookItem}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.muted}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.cta}>
        <CtaBand />
      </div>
    </>
  );
}

import type { Venture } from '../../data/ventures';
import { Tag } from '../Tag/Tag';
import styles from './VentureCard.module.css';

const TRACK_LABEL = { roots: 'Roots', signal: 'Signal' } as const;

export interface VentureCardProps {
  venture: Venture;
}

/** A portfolio entry: arch monogram, track and stage tags, name, sector and a one-line summary. */
export function VentureCard({ venture }: VentureCardProps) {
  const { name, track, stage, sector, summary, monogram, href } = venture;
  const initial = (monogram ?? name.charAt(0)).slice(0, 2);

  const content = (
    <>
      <span aria-hidden="true" className={`${styles.monogram} ${styles[track]}`}>
        {initial}
      </span>
      <div className={styles.body}>
        <div className={styles.meta}>
          <Tag tone={track}>{TRACK_LABEL[track]}</Tag>
          {stage && <Tag>{stage}</Tag>}
        </div>
        <h3 className={styles.name}>{name}</h3>
        {sector && <p className={styles.sector}>{sector}</p>}
        {summary && <p className={styles.summary}>{summary}</p>}
      </div>
    </>
  );

  return href ? (
    <a className={styles.card} href={href}>
      {content}
    </a>
  ) : (
    <article className={styles.card}>{content}</article>
  );
}

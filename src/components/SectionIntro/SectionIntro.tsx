import type { ReactNode } from 'react';
import { cx } from '../../lib/cx';
import styles from './SectionIntro.module.css';

export interface EyebrowProps {
  children: ReactNode;
  className?: string;
}

/** Small all-caps kicker above a heading. Keep it to three words. */
export function Eyebrow({ children, className }: EyebrowProps) {
  return <p className={cx(styles.eyebrow, className)}>{children}</p>;
}

export interface SectionIntroProps {
  eyebrow?: string;
  title: ReactNode;
  id?: string;
}

/** Eyebrow + section heading (h2). */
export function SectionIntro({ eyebrow, title, id }: SectionIntroProps) {
  return (
    <div className={styles.intro}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 id={id} className={styles.title}>
        {title}
      </h2>
    </div>
  );
}

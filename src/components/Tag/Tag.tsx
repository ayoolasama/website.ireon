import type { ReactNode } from 'react';
import { cx } from '../../lib/cx';
import styles from './Tag.module.css';

export type TagTone = 'neutral' | 'cobalt' | 'roots' | 'signal' | 'success' | 'warning' | 'danger';

export interface TagProps {
  tone?: TagTone;
  children: ReactNode;
  className?: string;
}

/** A short, non-interactive label. The word must carry the meaning; colour only reinforces it. */
export function Tag({ tone = 'neutral', children, className }: TagProps) {
  return (
    <span className={cx(styles.tag, tone !== 'neutral' && styles[tone], className)}>
      {children}
    </span>
  );
}

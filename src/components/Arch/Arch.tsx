import type { BrandColour } from '../../data/content';
import { cx } from '../../lib/cx';
import styles from './Arch.module.css';

export interface ArchProps {
  colour: BrandColour;
  width?: number;
  height?: number;
  className?: string;
}

/** The brand's arch motif — a rectangle with a fully rounded top. Decorative only. */
export function Arch({ colour, width = 36, height = 44, className }: ArchProps) {
  return (
    <span
      aria-hidden="true"
      className={cx(styles.arch, styles[colour], className)}
      style={{ width, height }}
    />
  );
}

import styles from './HeroArt.module.css';

/** 3 × 3 grid of arches thinning towards the top: true = arch, false = empty cell. */
const PATTERN = [false, false, true, false, true, true, true, true, true];

/** The home hero composition: cobalt slab, sky arch and a navy panel of lime arches. Decorative. */
export function HeroArt() {
  return (
    <div className={styles.art} aria-hidden="true">
      <div className={styles.slab}>
        <div className={styles.slabArch} />
      </div>
      <div className={styles.arch} />
      <div className={styles.panel}>
        {PATTERN.map((filled, i) => (
          <div key={i} className={filled ? styles.dot : undefined} />
        ))}
      </div>
    </div>
  );
}

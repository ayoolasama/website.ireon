import { ButtonLink } from '../Button/Button';
import styles from './CtaBand.module.css';

/** The closing call to action on marketing pages. */
export function CtaBand() {
  return (
    <section className="container" aria-labelledby="cta-title">
      <div className={styles.band}>
        <div className={styles.text}>
          <h2 id="cta-title" className={styles.title}>
            Have an idea worth building?
          </h2>
          <p className={styles.body}>
            Bring us yours, or come and build one of ours. Either way, we&rsquo;d like to hear from
            you.
          </p>
        </div>
        <ButtonLink to="/contact" variant="spark">
          Start a conversation
        </ButtonLink>
      </div>
    </section>
  );
}

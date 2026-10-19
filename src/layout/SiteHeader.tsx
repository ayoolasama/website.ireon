import { Link, NavLink } from 'react-router-dom';
import { ButtonLink } from '../components/Button/Button';
import { primaryNav, site } from '../data/site';
import styles from './Layout.module.css';

export function SiteHeader() {
  return (
    <header className={`container ${styles.header}`}>
      <Link to="/" className={styles.wordmark} aria-label={`${site.name} — home`}>
        {site.name}
      </Link>
      <nav aria-label="Main" className={styles.nav}>
        {primaryNav.map((item) => (
          <NavLink key={item.to} to={item.to} className={styles.navLink}>
            {item.label}
          </NavLink>
        ))}
        <ButtonLink to="/contact" variant="primary" size="sm">
          Start a conversation
        </ButtonLink>
      </nav>
    </header>
  );
}

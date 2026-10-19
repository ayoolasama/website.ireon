import { Link } from 'react-router-dom';
import { footerNav, site } from '../data/site';
import styles from './Layout.module.css';

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerInner}`}>
        <div className={styles.footerBrand}>
          <span className={styles.wordmark}>{site.name}</span>
          <span className={styles.footerTagline}>{site.tagline}</span>
        </div>
        <nav aria-label="Footer" className={styles.footerNav}>
          {footerNav.map((item) => (
            <Link key={item.to} to={item.to}>
              {item.label}
            </Link>
          ))}
        </nav>
        <address className={styles.footerContact}>
          <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
          <a href={site.contact.phoneHref}>{site.contact.phoneDisplay}</a>
          <span>{site.contact.addressShort}</span>
        </address>
      </div>
      <p className={`container ${styles.legal}`}>
        © {year} {site.legalName}. All rights reserved.
      </p>
    </footer>
  );
}

import { Eyebrow } from '../components/SectionIntro/SectionIntro';
import { site } from '../data/site';
import { cx } from '../lib/cx';
import { usePageTitle } from '../lib/usePageTitle';
import { ContactForm } from './ContactForm';
import formStyles from './ContactForm.module.css';
import styles from './pages.module.css';

export default function ContactPage() {
  usePageTitle(
    'Contact',
    'Start a conversation with Ireon Ventures. We reply within 1 working day.',
  );
  const { contact } = site;

  return (
    <section className={cx('container', formStyles.page)} aria-labelledby="contact-title">
      <div className={formStyles.intro}>
        <Eyebrow>Contact</Eyebrow>
        <h1 id="contact-title" className={styles.display}>
          Start a conversation.
        </h1>
        <p className={styles.lead}>
          Tell us about your idea, or about yourself if you&rsquo;d like to build one of ours. We
          read every message and reply within {contact.replyTime}.
        </p>
        <dl className={formStyles.details}>
          <div>
            <dt>Email</dt>
            <dd>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </dd>
          </div>
          <div>
            <dt>Phone</dt>
            <dd>
              <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
            </dd>
          </div>
          <div>
            <dt>Office</dt>
            <dd>
              {contact.addressLines[0]}
              <br />
              {contact.addressLines[1]}
            </dd>
          </div>
        </dl>
      </div>
      <ContactForm />
    </section>
  );
}

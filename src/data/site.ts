/** Company facts shown across the site. Change them here, once. */
export const site = {
  name: 'Ireon Ventures',
  legalName: 'Ireon Ventures Limited',
  tagline: 'Where ideas are built and given room to fly.',
  url: 'https://ireon.org',
  contact: {
    email: 'hello@ireon.org',
    phoneDisplay: '+234 810 846 1951',
    phoneHref: 'tel:+2348108461951',
    addressShort: 'Victoria Island, Lagos',
    addressLines: ['Victoria Island', 'Lagos, Nigeria'],
    replyTime: '1 working day',
  },
} as const;

export interface NavItem {
  label: string;
  to: string;
}

export const primaryNav: NavItem[] = [
  { label: 'How we work', to: '/how-we-work' },
  { label: 'Ventures', to: '/ventures' },
];

export const footerNav: NavItem[] = [
  { label: 'How we work', to: '/how-we-work' },
  { label: 'Ventures', to: '/ventures' },
  { label: 'Contact', to: '/contact' },
];

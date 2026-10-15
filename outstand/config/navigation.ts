/**
 * Navigation.
 *
 * `mainNav` drives the desktop header tabs and the mobile menu.
 * `allPagesMenu` is the "All pages" dropdown in the desktop header.
 * `footerNav` drives the four link columns in the footer.
 *
 * The original template shipped a Blogs page; it was excluded from this
 * conversion, so no Blogs entries appear here or anywhere else.
 */

export interface NavLink {
  label: string;
  href: string;
  /** External links open in a new tab and get rel="noreferrer". */
  external?: boolean;
}

export interface NavColumn {
  title: string;
  links: NavLink[];
}

/** Header tabs, in order, left to right. */
export const mainNav: NavLink[] = [
  { label: 'Overview', href: '/' },
  { label: 'Core Advantages', href: '/#benefits' },
  { label: 'Evidence Engine', href: '/#solution' },
  { label: 'Features', href: '/#features' },
  { label: 'Pipeline', href: '/#pipeline' },
];

/** Contents of the "All pages" dropdown in the desktop header. */
export const allPagesMenu: NavLink[] = [
  { label: 'Overview', href: '/' },
  { label: 'Workspace Hub', href: 'http://localhost:5173/workspace', external: true },
  { label: 'Attention Demo Studio', href: 'http://localhost:5173/lecture/attention-mechanisms', external: true },
  { label: 'Concept Mastery Matrix', href: 'http://localhost:5173/concepts', external: true },
  { label: 'Active Recall Quiz', href: 'http://localhost:5173/quiz', external: true },
  { label: 'Source Ingestion', href: 'http://localhost:5173/upload', external: true },
];

/** Footer link columns, in order, left to right. */
export const footerNav: NavColumn[] = [
  {
    title: 'Workspace',
    links: [
      { label: 'Overview', href: '/' },
      { label: 'Workspace Hub', href: 'http://localhost:5173/workspace', external: true },
      { label: 'Attention Studio', href: 'http://localhost:5173/lecture/attention-mechanisms', external: true },
      { label: 'Source Ingestion', href: 'http://localhost:5173/upload', external: true },
    ],
  },
  {
    title: 'Architecture',
    links: [
      { label: 'Core Advantages', href: '/#benefits' },
      { label: 'Evidence Engine', href: '/#solution' },
      { label: 'Factual Rigor', href: '/#features' },
      { label: 'Provenance Pipeline', href: '/#pipeline' },
    ],
  },
  {
    title: 'Study Tools',
    links: [
      { label: 'Concept Mastery Matrix', href: 'http://localhost:5173/concepts', external: true },
      { label: 'Active Recall Quiz', href: 'http://localhost:5173/quiz', external: true },
      { label: 'Verbatim Audio Sync', href: '/#solution' },
      { label: 'Live Studio', href: 'http://localhost:5173/lecture/attention-mechanisms', external: true },
    ],
  },
];

/** Social profiles, used by the footer and the contact page. */
export const socialLinks: NavLink[] = [
  { label: 'X', href: 'https://x.com/', external: true },
  { label: 'Instagram', href: 'https://www.instagram.com/', external: true },
  { label: 'Facebook', href: 'https://www.facebook.com/', external: true },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/', external: true },
];

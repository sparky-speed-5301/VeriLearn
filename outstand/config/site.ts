/**
 * Site-wide settings.
 *
 * This is the first file to edit when you rebrand the template: name, logo,
 * contact details, social profiles and default SEO all live here.
 */

export interface SiteConfig {
  /** Brand name, used in <title> suffixes and the footer. */
  name: string;
  /** Short tagline shown in the footer under the logo. */
  tagline: string;
  /** Absolute production URL — drives canonical tags, OG urls and the sitemap. */
  url: string;
  /** Default metadata used by the root layout and any page that omits its own. */
  seo: {
    title: string;
    description: string;
    /** Relative path to the Open Graph image under /public. */
    ogImage: string;
    twitterCard: 'summary' | 'summary_large_image';
  };
  logo: {
    src: string;
    /** Intrinsic dimensions of the logo file, so next/image can reserve space. */
    width: number;
    height: number;
    alt: string;
  };
  favicon: string;
  contact: {
    email: string;
    phone: string;
    address: string;
    /** Booking link used by the "Book a call" style buttons. */
    bookingUrl: string;
    /** Google Maps embed URL shown on the contact page. */
    mapEmbedUrl: string;
  };
  /** Primary call-to-action reused by the header and several sections. */
  cta: {
    label: string;
    href: string;
  };
}

export const site: SiteConfig = {
  name: 'VeriLearn',
  tagline: 'Evidence-first learning and grounded intelligence for technical lectures.',
  url: 'http://localhost:3100',

  seo: {
    title: 'VeriLearn - Grounded AI Lecture Intelligence & Notebook Studio',
    description:
      'Transform university lectures and technical PDFs into an interactive evidence cockpit. Zero hallucinations. Verifiable citations in 1 click.',
    ogImage: '/assets/media/og-default.png',
    twitterCard: 'summary_large_image',
  },

  logo: {
    src: '/assets/media/KKswWevWvaoMFDub0uUjHAlCDcE.svg',
    width: 136,
    height: 51,
    alt: 'VeriLearn',
  },

  favicon: '/assets/media/AOOKi1u965qLECq73L2IK3LcQs.svg',

  contact: {
    email: 'team@verilearn.ai',
    phone: '+1 (555) 837-4532',
    address: 'Campus Innovation Center, Cambridge, MA',
    bookingUrl: 'http://localhost:5173/workspace',
    mapEmbedUrl:
      'https://maps.google.com/maps?q=42.3601,-71.0942&z=15&output=embed',
  },

  cta: {
    label: 'Launch Workspace →',
    href: 'http://localhost:5173/workspace',
  },
};

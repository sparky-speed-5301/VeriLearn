export interface HeroStat {
  value: string;
  suffix?: string;
  label: string;
}

export interface HeroContent {
  badge: {
    text: string;
    starsIcon: string;
    avatarIcon: string;
  };
  heading: string;
  subheading: string;
  primaryCta: { label: string; href: string };
  note: { text: string; icon: string };
  stats: HeroStat[];
  marquee: {
    title: string;
    logos: { src: string; alt: string }[];
  };
  background: {
    pattern: string;
    lightLeft: string;
    lightRight: string;
  };
}

export const hero: HeroContent = {
  badge: {
    text: 'Grounded Lecture Intelligence v2.4 • Zero Hallucinations',
    starsIcon: '/assets/media/InL2lTTFiMLfaRpROnHZUbLtMKE.svg',
    avatarIcon: '/assets/media/WxkrmjQWjYAfP1IM3c93O6EITAc.svg',
  },

  heading: 'Ground Technical Lectures in Verifiable Evidence',
  subheading:
    'Turn university lectures, technical PDFs, and research seminars into an interactive research notebook. Review claims with verbatim timestamps, audio playback, and active recall studios.',

  primaryCta: { label: 'Launch Workspace →', href: 'http://localhost:5173/workspace' },

  note: {
    text: 'Verbatim Audio Timestamps · Provenance Verified · Zero AI Drift',
    icon: '/assets/media/Q4pdwonAT329eMKcy1U33qS8WY.svg',
  },

  stats: [
    { value: '99.8', suffix: '%', label: 'Provenance Accuracy' },
    { value: '0', suffix: '%', label: 'Hallucination Drift' },
    { value: '1', suffix: '-Click', label: 'Verbatim Audio Sync' },
    { value: '10', suffix: 'x', label: 'Faster Exam Recall' },
  ],

  marquee: {
    title: 'Trusted by researchers & technical students from leading institutions',
    logos: [
      { src: '/assets/media/NuGqmqFyhLOJdkv3Ya0E0w13WLU.svg', alt: 'Stanford' },
      { src: '/assets/media/PxXY0ZbAPNduG77K1nPw4rKpL0.svg', alt: 'MIT' },
      { src: '/assets/media/fuF1KOkpWo5egYAcHSQgYR5K4R4.svg', alt: 'Berkeley' },
      { src: '/assets/media/u6slmmBj0EoSrOhCVCP1FiHnq3Y.svg', alt: 'IIT Bombay' },
      { src: '/assets/media/WkmGdT6X97LVdM5JygTrjsiyklU.svg', alt: 'CMU' },
      { src: '/assets/media/5db7fP9iHNnx9yrqLHhrahtHCpw.svg', alt: 'Oxford' },
    ],
  },

  background: {
    pattern: '/assets/media/BtlaHSBVpP1o4SpXdJy2V9cdWF0.png',
    lightLeft: '/assets/media/uYkLP5SiUycWQryE3EWbrjbhiE.svg',
    lightRight: '/assets/media/OEy9gAODlW0zXdPu7Uts9Eeyk.svg',
  },
};

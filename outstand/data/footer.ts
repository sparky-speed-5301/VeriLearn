export interface HeadlinePart {
  text: string;
  accent?: boolean;
}

export interface FooterCta {
  eyebrow: string;
  headline: HeadlinePart[];
  button: { label: string; href: string };
}

export const footerCta: FooterCta = {
  eyebrow: 'Ready for Grounded AI Lecture Intelligence?',
  headline: [
    { text: 'Master your technical courses with ' },
    { text: 'mathematical proof', accent: true },
    { text: ' and ' },
    { text: 'zero hallucinations', accent: true },
    { text: '.' },
  ],
  button: {
    label: 'Launch Workspace →',
    href: 'http://localhost:5173/workspace',
  },
};

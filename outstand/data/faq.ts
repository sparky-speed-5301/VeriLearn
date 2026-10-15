/**
 * FAQ content.
 *
 * The original renders answers only while an item is expanded, so they do not
 * exist in a static capture. These were recovered by driving the accordion in a
 * real browser; the text is verbatim from the original.
 *
 * Each page's list is keyed separately because the three FAQ sections differ.
 */

export interface FaqItem {
  question: string;
  answer: string;
}

export const homeFaq: FaqItem[] = [
  {
    question: 'How does VeriLearn eliminate AI hallucinations in technical subjects?',
    answer:
      'Unlike generic chat models that guess or extrapolate facts, VeriLearn enforces strict provenance. Every claim must anchor directly to a verified transcript timestamp and slide coordinate. If an idea was not explicitly stated in the source, it is marked as unsupported rather than invented.',
  },
  {
    question: 'What types of lecture materials can I upload?',
    answer:
      'VeriLearn supports audio recordings (MP3, WAV, M4A), lecture slide decks (PDF), technical textbook chapters, and direct video transcript inputs with millisecond timestamp indexing.',
  },
  {
    question: 'How does the active recall quiz studio work?',
    answer:
      'Our engine analyzes the conceptual graph extracted from your lectures to formulate targeted diagnostic questions. Every quiz answer links back to the exact lecture segment where the concept was taught so you can immediately review weak spots.',
  },
  {
    question: 'How does the verbatim audio synchronization feature work?',
    answer:
      'When you click any citation chip in your generated notebook or concept card, VeriLearn cues the underlying audio player to the exact second the professor explained that concept, allowing instant verification.',
  },
  {
    question: 'Can I cross-reference across multiple lectures and courses?',
    answer:
      'Yes! In your VeriLearn Workspace, you can organize notebooks by course, semester, or research topic. The evidence engine seamlessly cross-references ideas across multiple lectures without information silos.',
  },
];

export const servicesFaq: FaqItem[] = [
  {
    question: 'What is your process for starting a new project?',
    answer:
      'Our process typically begins with an initial consultation to understand your needs and goals. We then move on to the research and concept phase, followed by design development, feedback, revisions, and finally, the delivery of the completed design.',
  },
  {
    question: 'What file formats will I receive for the final designs?',
    answer:
      'We deliver final designs in a range of formats suitable for both digital and print use. Common formats include JPEG, PNG, PDF, and vector files such as AI or EPS.',
  },
  {
    question: 'What web development technologies do you specialize in?',
    answer:
      'We specialize in HTML, CSS, JavaScript, React, Angular, Node.js, and Python/Django. We also work with WordPress and Drupal.',
  },
  {
    question: 'Do you offer custom web development solutions?',
    answer:
      'Yes, we offer tailored web development solutions to meet your specific needs and requirements.',
  },
  {
    question: 'Can you explain your approach to responsive design.',
    answer:
      'We design websites to ensure they provide an optimal viewing experience across all devices. This includes flexible layouts, media queries, and scalable images to adapt to different screen sizes.',
  },
  {
    question: 'What digital marketing channels do you specialize in?',
    answer:
      'We specialize in SEO, PPC, social media marketing, email marketing, and content marketing.',
  },
  {
    question: 'Do you offer any customized digital marketing packages?',
    answer:
      'Yes, we offer customized digital marketing packages tailored to your business goals and budget.',
  },
  {
    question: 'How do you measure the success of your digital marketing campaigns?',
    answer:
      'We measure success using key performance indicators (KPIs) such as website traffic, conversion rates, engagement metrics, and ROI.',
  },
  {
    question: 'How will you help me build and engage my audience on social media platforms?',
    answer:
      'We will create strategic content, utilize targeted advertising, engage with followers, and analyze metrics to optimize your social media presence and foster audience interaction.',
  },
  {
    question: 'Can you provide examples of successful digital marketing campaigns?',
    answer:
      'Certainly! Examples include viral social media campaigns that increased brand awareness, targeted PPC campaigns that boosted conversions, and SEO strategies that significantly improved organic search rankings.',
  },
];

export const contactFaq: FaqItem[] = [
  {
    question: 'What is your process for starting a new project?',
    answer:
      'Our process typically begins with an initial consultation to understand your needs and goals. We then move on to the research and concept phase, followed by design development, feedback, revisions, and finally, the delivery of the completed design.',
  },
  {
    question: 'What file formats will I receive for the final designs?',
    answer:
      'We deliver final designs in a range of formats suitable for both digital and print use. Common formats include JPEG, PNG, PDF, and vector files such as AI or EPS.',
  },
  {
    question: 'What web development technologies do you specialize in?',
    answer:
      'We specialize in HTML, CSS, JavaScript, React, Angular, Node.js, and Python/Django. We also work with WordPress and Drupal.',
  },
  {
    question: 'Do you offer custom web development solutions?',
    answer:
      'Yes, we offer tailored web development solutions to meet your specific needs and requirements.',
  },
  {
    question: 'Can you explain your approach to responsive design.',
    answer:
      'We design websites to ensure they provide an optimal viewing experience across all devices. This includes flexible layouts, media queries, and scalable images to adapt to different screen sizes.',
  },
  {
    question: 'What digital marketing channels do you specialize in?',
    answer:
      'We specialize in SEO, PPC, social media marketing, email marketing, and content marketing.',
  },
  {
    question: 'Do you offer any customized digital marketing packages?',
    answer:
      'Yes, we offer customized digital marketing packages tailored to your business goals and budget.',
  },
  {
    question: 'How do you measure the success of your digital marketing campaigns?',
    answer:
      'We measure success using key performance indicators (KPIs) such as website traffic, conversion rates, engagement metrics, and ROI.',
  },
  {
    question: 'How will you help me build and engage my audience on social media platforms?',
    answer:
      'We will create strategic content, utilize targeted advertising, engage with followers, and analyze metrics to optimize your social media presence and foster audience interaction.',
  },
  {
    question: 'Can you provide examples of successful digital marketing campaigns?',
    answer:
      'Certainly! Examples include viral social media campaigns that increased brand awareness, targeted PPC campaigns that boosted conversions, and SEO strategies that significantly improved organic search rankings.',
  },
];


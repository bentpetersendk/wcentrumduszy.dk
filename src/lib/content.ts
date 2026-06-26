export type ContentStatus = "draft" | "published" | "scheduled" | "archived";
export type ContentType =
  | "page"
  | "workshop"
  | "course"
  | "meditation"
  | "article"
  | "gallery"
  | "faq";

export type RichTextBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "quote"; text: string }
  | { type: "callout"; text: string }
  | { type: "list"; style: "bullet" | "numbered"; items: string[] }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "youtube"; url: string; title: string };

export type SeoFields = {
  title: string;
  description: string;
  canonical: string;
  socialImage: string;
};

export type PageContent = {
  id: string;
  type: ContentType;
  slug: string;
  language: "pl";
  translationGroupId: string;
  status: ContentStatus;
  title: string;
  subtitle: string;
  excerpt: string;
  heroImage?: string;
  imageAlt?: string;
  body: RichTextBlock[];
  cta?: { label: string; href: string };
  seo: SeoFields;
  updatedAt: string;
};

export type OfferContent = PageContent & {
  format?: string;
  theme?: string;
  date?: string;
  time?: string;
  location?: string;
  languageLabel?: string;
  capacity?: string;
  price?: string;
  duration?: string;
  accessLevel?: string;
  category?: string;
  tags?: string[];
  faq?: { question: string; answer: string }[];
  gallery?: { src: string; alt: string; caption?: string }[];
};

export const siteUrl = "https://wcentrumduszy.dk";

export const pages: PageContent[] = [
  {
    id: "about",
    type: "page",
    slug: "about",
    language: "pl",
    translationGroupId: "page-about",
    status: "published",
    title: "About Joanna",
    subtitle: "A calm, grounded presence for reflective inner work.",
    excerpt: "Meet Joanna Radek-Petersen and the intention behind W Centrum Duszy.",
    heroImage: "/photos/portraits/joanna-radek-11.webp",
    imageAlt: "Joanna Radek-Petersen smiling softly in natural light.",
    body: [
      { type: "paragraph", text: "Joanna created W Centrum Duszy as a space for people who want to meet themselves with honesty, tenderness, and steadiness." },
      { type: "paragraph", text: "Her work is warm but not invasive, deep but not overwhelming, personal but still professional." },
      { type: "heading", text: "How Joanna works" },
      { type: "paragraph", text: "Sessions and group spaces are built around careful listening, guided reflection, and practical integration. The pace is intentionally spacious." },
      { type: "quote", text: "You do not need to become someone else. You can begin by listening to what is already asking for care." },
      { type: "heading", text: "A note on presence" },
      { type: "paragraph", text: "The work is not about forcing change. It is about creating enough safety and clarity for change to become possible." }
    ],
    cta: { label: "Contact Joanna", href: "/contact" },
    seo: {
      title: "About Joanna Radek-Petersen",
      description: "Learn about Joanna Radek-Petersen and the calm reflective practice behind W Centrum Duszy.",
      canonical: "/about",
      socialImage: "/photos/portraits/joanna-radek-11.webp"
    },
    updatedAt: "2026-06-26"
  },
  {
    id: "family-constellations",
    type: "page",
    slug: "family-constellations",
    language: "pl",
    translationGroupId: "page-family-constellations",
    status: "published",
    title: "Family Constellations",
    subtitle: "A reflective way to notice inherited patterns, loyalties, and inner movements.",
    excerpt: "A gentle introduction to family constellations and how this work may support insight.",
    heroImage: "/photos/portraits/joanna-radek-04.webp",
    imageAlt: "Joanna Radek-Petersen looking out over a quiet green view.",
    body: [
      { type: "paragraph", text: "Family constellations can help reveal patterns that often remain invisible in everyday life: inherited loyalties, emotional repetitions, and places where love has become entangled with burden." },
      { type: "paragraph", text: "The work is held slowly and respectfully. Nothing is forced. Joanna creates a space where what needs attention can be seen with more compassion." },
      { type: "heading", text: "What this work may support" },
      { type: "list", style: "bullet", items: ["Understanding repeated relationship patterns", "Finding a calmer relationship to family history", "Noticing where responsibility has become too heavy", "Creating space for a new inner movement"] },
      { type: "callout", text: "Family constellations are reflective and experiential. They are not a substitute for medical, psychiatric, or crisis support." }
    ],
    cta: { label: "Ask about this work", href: "/contact" },
    seo: {
      title: "Family Constellations",
      description: "A grounded introduction to family constellations with Joanna Radek-Petersen.",
      canonical: "/family-constellations",
      socialImage: "/photos/portraits/joanna-radek-04.webp"
    },
    updatedAt: "2026-06-26"
  },
  {
    id: "contact",
    type: "page",
    slug: "contact",
    language: "pl",
    translationGroupId: "page-contact",
    status: "published",
    title: "Contact",
    subtitle: "You are welcome to write with a quiet first hello.",
    excerpt: "Ask a question, share a workshop inquiry, or begin a gentle conversation.",
    heroImage: "/photos/portraits/joanna-radek-17.webp",
    imageAlt: "Joanna Radek-Petersen smiling warmly.",
    body: [
      { type: "paragraph", text: "Use the form to send Joanna a message. You do not need to have the perfect words before reaching out." },
      { type: "paragraph", text: "Messages can be about workshops, meditations, articles, family constellations, or simply whether this space feels right for you." }
    ],
    seo: {
      title: "Contact Joanna",
      description: "Contact Joanna Radek-Petersen at W Centrum Duszy.",
      canonical: "/contact",
      socialImage: "/photos/portraits/joanna-radek-17.webp"
    },
    updatedAt: "2026-06-26"
  },
  {
    id: "newsletter",
    type: "page",
    slug: "newsletter",
    language: "pl",
    translationGroupId: "page-newsletter",
    status: "published",
    title: "Newsletter",
    subtitle: "Quiet notes when you want to stay close without deciding today.",
    excerpt: "Receive articles, meditations, and workshop updates.",
    body: [
      { type: "paragraph", text: "The newsletter is a gentle way to stay connected to new reflective writing, audio practices, and upcoming workshops." },
      { type: "paragraph", text: "Emails are occasional and intentional. No noise, no pressure." }
    ],
    seo: {
      title: "Newsletter",
      description: "Join the W Centrum Duszy newsletter for quiet notes, meditations, articles, and workshop updates.",
      canonical: "/newsletter",
      socialImage: "/photos/portraits/joanna-radek-01.webp"
    },
    updatedAt: "2026-06-26"
  },
  {
    id: "privacy",
    type: "page",
    slug: "legal/privacy",
    language: "pl",
    translationGroupId: "page-privacy",
    status: "published",
    title: "Privacy Policy",
    subtitle: "How personal information is handled with care.",
    excerpt: "Privacy information for visitors, newsletter subscribers, and people contacting Joanna.",
    body: [
      { type: "paragraph", text: "W Centrum Duszy collects only the information needed to respond to messages, manage newsletter subscriptions, and provide requested services." },
      { type: "paragraph", text: "Personal information is not sold. Contact and newsletter information can be deleted on request." },
      { type: "heading", text: "Information collected" },
      { type: "list", style: "bullet", items: ["Name and email address when you contact Joanna", "Newsletter subscription details", "Messages sent through the contact form"] }
    ],
    seo: {
      title: "Privacy Policy",
      description: "Privacy policy for W Centrum Duszy.",
      canonical: "/legal/privacy",
      socialImage: "/photos/portraits/joanna-radek-01.webp"
    },
    updatedAt: "2026-06-26"
  },
  {
    id: "cookies",
    type: "page",
    slug: "legal/cookies",
    language: "pl",
    translationGroupId: "page-cookies",
    status: "published",
    title: "Cookie Policy",
    subtitle: "A simple note about cookies and site preferences.",
    excerpt: "Cookie information for W Centrum Duszy.",
    body: [
      { type: "paragraph", text: "The website may use essential cookies for login, security, and basic site functionality. Analytics or marketing cookies should only be added with clear consent." },
      { type: "paragraph", text: "This policy is prepared for the CMS foundation and should be reviewed before final legal publication." }
    ],
    seo: {
      title: "Cookie Policy",
      description: "Cookie policy for W Centrum Duszy.",
      canonical: "/legal/cookies",
      socialImage: "/photos/portraits/joanna-radek-01.webp"
    },
    updatedAt: "2026-06-26"
  },
  {
    id: "terms",
    type: "page",
    slug: "legal/terms",
    language: "pl",
    translationGroupId: "page-terms",
    status: "published",
    title: "Terms & Conditions",
    subtitle: "Plain-language terms for using this website.",
    excerpt: "Terms and conditions for W Centrum Duszy.",
    body: [
      { type: "paragraph", text: "The information on this website is offered for reflection and education. It does not replace professional medical, psychological, legal, or financial advice." },
      { type: "paragraph", text: "Workshop, course, and meditation terms should be reviewed before paid offers are launched." }
    ],
    seo: {
      title: "Terms & Conditions",
      description: "Terms and conditions for W Centrum Duszy.",
      canonical: "/legal/terms",
      socialImage: "/photos/portraits/joanna-radek-01.webp"
    },
    updatedAt: "2026-06-26"
  }
];

export const workshops: OfferContent[] = [
  {
    id: "returning-to-yourself",
    type: "workshop",
    slug: "returning-to-yourself",
    language: "pl",
    translationGroupId: "workshop-returning-to-yourself",
    status: "published",
    title: "Returning To Yourself",
    subtitle: "A small reflective workshop for noticing patterns and creating inner space.",
    excerpt: "Guided reflection, practical integration, and calm conversation.",
    heroImage: "/photos/portraits/joanna-radek-13.webp",
    imageAlt: "Joanna Radek-Petersen preparing materials at a table.",
    body: [
      { type: "paragraph", text: "This workshop creates a gentle group space to notice patterns, listen inward, and take one grounded step toward change." },
      { type: "heading", text: "What we will explore" },
      { type: "list", style: "bullet", items: ["What keeps repeating", "Where your attention is needed", "How to meet yourself without pressure", "A practical next step to take home"] },
      { type: "quote", text: "A small group, a slow pace, and enough space to hear yourself." }
    ],
    format: "Guided reflection and conversation",
    theme: "Self-trust",
    date: "Booking details to be confirmed",
    time: "Half-day format",
    location: "Copenhagen / online option",
    languageLabel: "Polish",
    capacity: "8 participants",
    price: "To be confirmed",
    faq: [
      { question: "Do I need previous experience?", answer: "No. The workshop is designed as a gentle beginning." },
      { question: "Will I need to share personal details?", answer: "Only what feels appropriate. The pace is respectful and consent-based." }
    ],
    gallery: [
      { src: "/photos/portraits/joanna-radek-13.webp", alt: "Workshop materials on a table.", caption: "A calm prepared space." },
      { src: "/photos/portraits/joanna-radek-04.webp", alt: "Quiet green view.", caption: "Space to pause." }
    ],
    cta: { label: "Ask about this workshop", href: "/contact" },
    seo: {
      title: "Returning To Yourself Workshop",
      description: "A small reflective workshop with Joanna Radek-Petersen.",
      canonical: "/workshops/returning-to-yourself",
      socialImage: "/photos/portraits/joanna-radek-13.webp"
    },
    updatedAt: "2026-06-26"
  }
];

export const courses: OfferContent[] = [
  {
    id: "gentle-inner-work",
    type: "course",
    slug: "gentle-inner-work",
    language: "pl",
    translationGroupId: "course-gentle-inner-work",
    status: "draft",
    title: "Gentle Inner Work",
    subtitle: "A future self-paced course for reflective practice at home.",
    excerpt: "A structured path of short lessons, prompts, and meditations.",
    heroImage: "/photos/portraits/joanna-radek-08.webp",
    imageAlt: "Joanna Radek-Petersen in a quiet reflective setting.",
    body: [
      { type: "paragraph", text: "This course foundation is prepared for future publication. It can hold lessons, audio, resources, and related meditations." },
      { type: "list", style: "numbered", items: ["Begin with the breath", "Notice recurring patterns", "Create a personal reflection rhythm"] }
    ],
    format: "Self-paced",
    duration: "3 modules",
    accessLevel: "Future premium-ready",
    price: "To be confirmed",
    seo: {
      title: "Gentle Inner Work Course",
      description: "A future self-paced reflective course from W Centrum Duszy.",
      canonical: "/courses/gentle-inner-work",
      socialImage: "/photos/portraits/joanna-radek-08.webp"
    },
    updatedAt: "2026-06-26"
  }
];

export const meditations: OfferContent[] = [
  {
    id: "five-minute-pause",
    type: "meditation",
    slug: "five-minute-pause",
    language: "pl",
    translationGroupId: "meditation-five-minute-pause",
    status: "published",
    title: "A five-minute pause",
    subtitle: "A short guided practice for returning to the breath.",
    excerpt: "A gentle audio practice for when everything feels like too much.",
    heroImage: "/photos/portraits/joanna-radek-16.webp",
    imageAlt: "Joanna Radek-Petersen seated calmly in a reflective pose.",
    body: [
      { type: "paragraph", text: "This short practice invites you to pause, breathe, and meet the present moment without solving everything at once." },
      { type: "callout", text: "Audio upload is prepared in the CMS foundation through Supabase Storage fields." }
    ],
    duration: "5 min",
    theme: "Breath",
    accessLevel: "Free",
    category: "Calm",
    seo: {
      title: "A Five-Minute Pause Meditation",
      description: "A short guided meditation from W Centrum Duszy.",
      canonical: "/meditations/five-minute-pause",
      socialImage: "/photos/portraits/joanna-radek-16.webp"
    },
    updatedAt: "2026-06-26"
  }
];

export const articles: OfferContent[] = [
  {
    id: "the-permission-to-pause",
    type: "article",
    slug: "the-permission-to-pause",
    language: "pl",
    translationGroupId: "article-permission-to-pause",
    status: "published",
    title: "The permission to pause",
    subtitle: "Why a quiet moment can be the beginning of real change.",
    excerpt: "A reflective note on presence, pressure, and listening inward.",
    heroImage: "/photos/portraits/joanna-radek-04.webp",
    imageAlt: "Joanna Radek-Petersen looking over a quiet view.",
    body: [
      { type: "paragraph", text: "Many people arrive at inner work with a feeling that they should already know what to do. But often the first step is not action. It is permission." },
      { type: "paragraph", text: "Pausing is not avoidance when it helps you hear what is true. It can be the beginning of a more honest movement." },
      { type: "quote", text: "Sometimes the most important step is simply allowing yourself to pause." }
    ],
    category: "Reflection",
    tags: ["pause", "presence", "patterns"],
    seo: {
      title: "The Permission to Pause",
      description: "A reflective article on presence and inner listening.",
      canonical: "/articles/the-permission-to-pause",
      socialImage: "/photos/portraits/joanna-radek-04.webp"
    },
    updatedAt: "2026-06-26"
  }
];

export const galleryCollections = [
  {
    id: "joanna-portraits",
    slug: "joanna-portraits",
    title: "Joanna Portraits",
    description: "Portraits and quiet visual moments for W Centrum Duszy.",
    images: [
      { src: "/photos/portraits/joanna-radek-01.webp", alt: "Joanna seated with a cup.", caption: "A quiet first hello." },
      { src: "/photos/portraits/joanna-radek-11.webp", alt: "Joanna smiling through flowers.", caption: "Warmth and presence." },
      { src: "/photos/portraits/joanna-radek-13.webp", alt: "Joanna preparing workshop materials.", caption: "Preparing a reflective space." },
      { src: "/photos/portraits/joanna-radek-17.webp", alt: "Joanna smiling warmly.", caption: "Contact portrait." }
    ]
  }
];

export const faqItems = [
  {
    question: "Do I need to know exactly what I am looking for?",
    answer: "No. It is enough to arrive with curiosity, a question, or a sense that something needs attention.",
    category: "Beginning"
  },
  {
    question: "Are workshops held in Polish?",
    answer: "The first offers are prepared in Polish, with the platform ready for Danish and English later.",
    category: "Workshops"
  },
  {
    question: "Can I listen to meditations for free?",
    answer: "The foundation supports both free and future premium meditations. The first short pause is prepared as a free practice.",
    category: "Meditations"
  },
  {
    question: "Is family constellations work therapy?",
    answer: "It is reflective and experiential work. It is not a replacement for therapy, medical care, or crisis support.",
    category: "Family Constellations"
  }
];

export function getPage(slug: string) {
  return pages.find((page) => page.slug === slug);
}

export function getPublished<T extends PageContent>(items: T[]) {
  return items.filter((item) => item.status === "published");
}

export function getContentBySlug<T extends PageContent>(items: T[], slug: string) {
  return items.find((item) => item.slug === slug);
}

export const allPublicContent = [
  ...pages,
  ...workshops,
  ...courses,
  ...meditations,
  ...articles
];

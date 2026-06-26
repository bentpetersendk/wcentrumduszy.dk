export type NavigationItem = {
  label: string;
  href: string;
};

export const primaryNavigation: NavigationItem[] = [
  { label: "About Joanna", href: "/about" },
  { label: "Family Constellations", href: "/family-constellations" },
  { label: "Workshops", href: "/workshops" },
  { label: "Meditations", href: "/meditations" },
  { label: "Articles", href: "/articles" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" }
];

export const footerNavigation: NavigationItem[] = [
  ...primaryNavigation,
  { label: "Courses", href: "/courses" },
  { label: "FAQ", href: "/faq" },
  { label: "Newsletter", href: "/newsletter" }
];

export const legalNavigation: NavigationItem[] = [
  { label: "Privacy", href: "/legal/privacy" },
  { label: "Cookies", href: "/legal/cookies" },
  { label: "Terms", href: "/legal/terms" }
];

export const languages = ["PL", "DA", "EN"] as const;

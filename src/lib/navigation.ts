export type NavigationItem = {
  label: string;
  href: string;
};

export const primaryNavigation: NavigationItem[] = [
  { label: "About", href: "/about" },
  { label: "Workshops", href: "/workshops" },
  { label: "Courses", href: "/courses" },
  { label: "Meditations", href: "/meditations" },
  { label: "Articles", href: "/articles" },
  { label: "Contact", href: "/contact" }
];

export const footerNavigation: NavigationItem[] = [
  ...primaryNavigation,
  { label: "FAQ", href: "/faq" },
  { label: "Newsletter", href: "/newsletter" }
];

export const legalNavigation: NavigationItem[] = [
  { label: "Privacy", href: "/legal/privacy" },
  { label: "Terms", href: "/legal/terms" }
];

export const languages = ["PL", "DA", "EN"] as const;


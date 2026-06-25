export type ColorToken = {
  name: string;
  token: string;
  cssVariable: string;
  hex: string;
  usage: string;
  foreground?: string;
};

export type TypeToken = {
  name: string;
  token: string;
  className: string;
  desktop: string;
  mobile: string;
  lineHeight: string;
  weight: string;
  sample: string;
};

export type SpacingToken = {
  value: number;
  token: string;
  usage: string;
};

export const colorTokens: ColorToken[] = [
  {
    name: "Warm Porcelain",
    token: "color.background",
    cssVariable: "--color-background",
    hex: "#F7F4EF",
    usage: "Main page background",
    foreground: "#252525"
  },
  {
    name: "Natural Paper",
    token: "color.surface",
    cssVariable: "--color-surface",
    hex: "#FEFCF8",
    usage: "Forms and light content surfaces",
    foreground: "#252525"
  },
  {
    name: "Muted Surface",
    token: "color.surfaceMuted",
    cssVariable: "--color-surface-muted",
    hex: "#EFE8DD",
    usage: "Quiet section contrast",
    foreground: "#252525"
  },
  {
    name: "Deep Charcoal",
    token: "color.text",
    cssVariable: "--color-text",
    hex: "#252525",
    usage: "Primary text and high-emphasis actions",
    foreground: "#FEFCF8"
  },
  {
    name: "Stone Grey",
    token: "color.textMuted",
    cssVariable: "--color-text-muted",
    hex: "#6F6A63",
    usage: "Secondary text and metadata",
    foreground: "#FEFCF8"
  },
  {
    name: "Warm Line",
    token: "color.border",
    cssVariable: "--color-border",
    hex: "#E4DDD3",
    usage: "Borders and dividers",
    foreground: "#252525"
  },
  {
    name: "Quiet Sage",
    token: "color.accentSage",
    cssVariable: "--color-accent-sage",
    hex: "#A8B6A1",
    usage: "Subtle brand accent",
    foreground: "#252525"
  },
  {
    name: "Muted Clay",
    token: "color.accentClay",
    cssVariable: "--color-accent-clay",
    hex: "#B58B73",
    usage: "Primary CTA warmth",
    foreground: "#252525"
  },
  {
    name: "Blue Grey Mist",
    token: "color.accentMist",
    cssVariable: "--color-accent-mist",
    hex: "#D8E0DF",
    usage: "Soft tonal bands",
    foreground: "#252525"
  },
  {
    name: "Success",
    token: "color.success",
    cssVariable: "--color-success",
    hex: "#55745D",
    usage: "Success messages and published states",
    foreground: "#FEFCF8"
  },
  {
    name: "Warning",
    token: "color.warning",
    cssVariable: "--color-warning",
    hex: "#A66F2D",
    usage: "Warnings and pending states",
    foreground: "#FEFCF8"
  },
  {
    name: "Error",
    token: "color.error",
    cssVariable: "--color-error",
    hex: "#9D3F35",
    usage: "Validation errors",
    foreground: "#FEFCF8"
  },
  {
    name: "Focus",
    token: "color.focus",
    cssVariable: "--color-focus",
    hex: "#4D6F72",
    usage: "Visible focus outline",
    foreground: "#FEFCF8"
  }
];

export const typeTokens: TypeToken[] = [
  {
    name: "Display",
    token: "type.display",
    className: "text-display",
    desktop: "72px",
    mobile: "46px",
    lineHeight: "1.02",
    weight: "400",
    sample: "Return to the quiet center within you."
  },
  {
    name: "H1",
    token: "type.h1",
    className: "text-h1",
    desktop: "56px",
    mobile: "38px",
    lineHeight: "1.08",
    weight: "400",
    sample: "A calm space for inner listening."
  },
  {
    name: "H2",
    token: "type.h2",
    className: "text-h2",
    desktop: "40px",
    mobile: "31px",
    lineHeight: "1.15",
    weight: "400",
    sample: "Ways to begin gently."
  },
  {
    name: "H3",
    token: "type.h3",
    className: "text-h3",
    desktop: "28px",
    mobile: "24px",
    lineHeight: "1.2",
    weight: "450",
    sample: "Workshop title"
  },
  {
    name: "Body Large",
    token: "type.bodyLarge",
    className: "text-body-large",
    desktop: "20px",
    mobile: "18px",
    lineHeight: "1.65",
    weight: "400",
    sample: "A generous paragraph style for important explanatory moments."
  },
  {
    name: "Body",
    token: "type.body",
    className: "text-body",
    desktop: "18px",
    mobile: "17px",
    lineHeight: "1.65",
    weight: "400",
    sample: "Body text should feel readable, spacious, and grounded."
  },
  {
    name: "Small",
    token: "type.small",
    className: "text-small",
    desktop: "15px",
    mobile: "15px",
    lineHeight: "1.5",
    weight: "400",
    sample: "Small supporting text and helper copy."
  },
  {
    name: "Caption",
    token: "type.caption",
    className: "text-caption",
    desktop: "13px",
    mobile: "13px",
    lineHeight: "1.45",
    weight: "500",
    sample: "Metadata, image captions, and quiet labels."
  }
];

export const spacingTokens: SpacingToken[] = [
  { value: 4, token: "space.1", usage: "Hairline relationships and compact offsets" },
  { value: 8, token: "space.2", usage: "Icon/text gap and compact controls" },
  { value: 12, token: "space.3", usage: "Small group spacing" },
  { value: 16, token: "space.4", usage: "Default inline rhythm" },
  { value: 24, token: "space.6", usage: "Card inner spacing" },
  { value: 32, token: "space.8", usage: "Component groups" },
  { value: 48, token: "space.12", usage: "Section subgroups" },
  { value: 64, token: "space.16", usage: "Mobile section padding" },
  { value: 80, token: "space.20", usage: "Small desktop section padding" },
  { value: 96, token: "space.24", usage: "Standard desktop section padding" },
  { value: 120, token: "space.30", usage: "Editorial section breath" },
  { value: 160, token: "space.40", usage: "Hero and major transition spacing" }
];

export const breakpoints = [
  { name: "Mobile", value: "0-767px", columns: 4, gutter: 16 },
  { name: "Tablet", value: "768-1023px", columns: 8, gutter: 20 },
  { name: "Desktop", value: "1024px+", columns: 12, gutter: 24 }
];


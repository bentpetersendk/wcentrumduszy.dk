export type PhotoAsset = {
  id: string;
  src: string;
  title: string;
  recommendedUse: string;
  status: string;
};

export const joannaPhotos: PhotoAsset[] = [
  ["01", "Homepage hero"],
  ["02", "About page secondary image"],
  ["03", "About intro or testimonial area"],
  ["04", "Seasonal article or outdoor workshop page"],
  ["05", "Article on rituals or small practices"],
  ["06", "Meditation library intro"],
  ["07", "Courses page"],
  ["08", "Article detail or emotional reflection page"],
  ["09", "Newsletter or articles page"],
  ["10", "Contact page"],
  ["11", "About page hero"],
  ["12", "Workshop/session context"],
  ["13", "Featured workshop"],
  ["14", "Testimonials or About detail"],
  ["15", "Nature/presence article"],
  ["16", "Meditation detail"],
  ["17", "Contact closing"],
  ["18", "Workshop/course support image"]
].map(([id, recommendedUse]) => ({
  id,
  src: `/photos/portraits/joanna-radek-${id}.png`,
  title: `Portrait ${id}`,
  recommendedUse,
  status: "Watermarked placeholder. Replace with clean original before production."
}));


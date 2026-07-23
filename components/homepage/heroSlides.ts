export type HeroSlide = {
  image: string;
  eyebrow: string;
  title: string;
  lines: string[];
  cta: { label: string; href: string };
  /** Text/button color for overlay copy. */
  tone: "light" | "dark";
  /**
   * CSS object-position — keep faces in frame.
   * Sources are landscape with heads near the top; prefer top + subject side.
   */
  objectPosition: string;
};

export const heroSlides: HeroSlide[] = [
  {
    image: "/hero/cover-1.webp",
    eyebrow: "THE DROP",
    title: "NEW ARRIVALS",
    lines: ["Designed with Purpose. Built for Confidence."],
    cta: { label: "EXPLORE NOW", href: "/collections/all" },
    tone: "light",
    // Couple centered; keep heads below the top edge
    objectPosition: "center 18%",
  },
  {
    image: "/hero/cover-2.webp",
    eyebrow: "PREMIUM ESSENTIALS",
    title: "BUILT FOR EVERYDAY",
    lines: ["Timeless Style.", "Crafted to Last."],
    cta: { label: "EXPLORE NOW", href: "/collections/all" },
    tone: "dark",
    // Model on the right, head near top of frame
    objectPosition: "78% 8%",
  },
  {
    image: "/hero/cover-3.webp",
    eyebrow: "AT WARDROBE",
    title: "WEAR YOUR IDENTITY",
    lines: ["Express Yourself.", "Own Every Moment."],
    cta: { label: "EXPLORE NOW", href: "/collections/all" },
    tone: "light",
    // Dark slide — subject far right; anchor top-right so face isn't cropped
    objectPosition: "88% 12%",
  },
  {
    image: "/hero/cover-4.webp",
    eyebrow: "PREMIUM STREETWEAR",
    title: "DEFINE YOUR LOOK",
    lines: ["Lasting Quality.", "Crafted for Comfort."],
    cta: { label: "EXPLORE NOW", href: "/collections/all" },
    tone: "dark",
    // Woman on the right with headroom in source
    objectPosition: "82% 15%",
  },
];

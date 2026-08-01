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
  mobileObjectPosition: string;
};

/** Original PNGs from /public/increase q — served as-is (no webp conversion). */
export const heroSlides: HeroSlide[] = [
  {
    image: "/increase q/ChatGPT Image Aug 1, 2026, 08_11_09 PM (2).webp",
    eyebrow: "THE DROP",
    title: "NEW ARRIVALS",
    lines: ["Designed with Purpose. Built for Confidence."],
    cta: { label: "EXPLORE NOW", href: "/collections/all" },
    tone: "light",
    objectPosition: "center 18%",
    mobileObjectPosition: "center 20%",
  },
  {
    image: "/increase q/tinywow_FRONT COVER 2_91108327.webp",
    eyebrow: "PREMIUM ESSENTIALS",
    title: "BUILT FOR EVERYDAY",
    lines: ["Timeless Style.", "Crafted to Last."],
    cta: { label: "EXPLORE NOW", href: "/collections/all" },
    tone: "dark",
    objectPosition: "78% 8%",
    mobileObjectPosition: "70% 10%",
  },
  {
    image: "/increase q/tinywow_FRONT COVER 3_91108213.webp",
    eyebrow: "AT WARDROBE",
    title: "WEAR YOUR IDENTITY",
    lines: ["Express Yourself.", "Own Every Moment."],
    cta: { label: "EXPLORE NOW", href: "/collections/all" },
    tone: "light",
    objectPosition: "88% 12%",
    mobileObjectPosition: "76% 12%",
  },
  {
    image: "/increase q/tinywow_FRONT COVER 4- aNOTHER_91108266.webp",
    eyebrow: "PREMIUM STREETWEAR",
    title: "DEFINE YOUR LOOK",
    lines: ["Lasting Quality.", "Crafted for Comfort."],
    cta: { label: "EXPLORE NOW", href: "/collections/all" },
    tone: "dark",
    objectPosition: "82% 15%",
    mobileObjectPosition: "74% 14%",
  },
];

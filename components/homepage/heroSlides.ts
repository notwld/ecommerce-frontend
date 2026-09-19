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

/** Clean public paths (no spaces) — same full-quality WebPs as before. */
export const heroSlides: HeroSlide[] = [
  {
    image: "/heroes/01.webp",
    eyebrow: "THE DROP",
    title: "NEW ARRIVALS",
    lines: ["Designed with Purpose. Built for Confidence."],
    cta: { label: "EXPLORE NOW", href: "/collections/all" },
    tone: "light",
    objectPosition: "center 18%",
    mobileObjectPosition: "center 20%",
  },
  {
    image: "/heroes/02.webp",
    eyebrow: "PREMIUM ESSENTIALS",
    title: "BUILT FOR EVERYDAY",
    lines: ["Timeless Style.", "Crafted to Last."],
    cta: { label: "EXPLORE NOW", href: "/collections/all" },
    tone: "dark",
    objectPosition: "78% 8%",
    mobileObjectPosition: "70% 10%",
  },
  {
    image: "/heroes/03.webp",
    eyebrow: "AT WARDROBE",
    title: "WEAR YOUR IDENTITY",
    lines: ["Express Yourself.", "Own Every Moment."],
    cta: { label: "EXPLORE NOW", href: "/collections/all" },
    tone: "light",
    objectPosition: "88% 12%",
    mobileObjectPosition: "76% 12%",
  },
  {
    image: "/heroes/04.webp",
    eyebrow: "PREMIUM STREETWEAR",
    title: "DEFINE YOUR LOOK",
    lines: ["Lasting Quality.", "Crafted for Comfort."],
    cta: { label: "EXPLORE NOW", href: "/collections/all" },
    tone: "dark",
    objectPosition: "82% 15%",
    mobileObjectPosition: "74% 14%",
  },
];

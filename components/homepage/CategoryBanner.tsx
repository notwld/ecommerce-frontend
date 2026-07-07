import Image from "next/image";
import Link from "next/link";

type CategoryBannerProps = {
  title: string;
  href: string;
  desktopImage: string;
  mobileImage: string;
};

export function CategoryBanner({
  title,
  href,
  desktopImage,
  mobileImage,
}: CategoryBannerProps) {
  return (
    <section className="bg-brand-background">
      <Link
        href={href}
        className="relative block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-4"
      >
        <div className="relative hidden aspect-[1920/750] w-full md:block">
          <Image
            src={desktopImage}
            alt={`AT Wardrobe Men's ${title} Collection`}
            fill
            sizes="100vw"
            className="object-cover object-top"
          />
        </div>
        <div className="relative aspect-[680/1024] w-full md:hidden">
          <Image
            src={mobileImage}
            alt={`AT Wardrobe Men's ${title} Collection`}
            fill
            sizes="100vw"
            className="object-cover object-top"
          />
        </div>
        <span className="pointer-events-none absolute inset-x-0 bottom-[12%] z-10 flex justify-center md:bottom-[14%]">
          <span className="text-[clamp(1.75rem,7vw,3.5rem)] font-normal uppercase tracking-[0.32em] text-white">
            {title}
          </span>
        </span>
      </Link>
    </section>
  );
}

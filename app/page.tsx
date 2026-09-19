import { Suspense } from "react";
import { HeroChrome } from "@/components/homepage/HeroChrome";
import { HomeBelowFold } from "@/components/homepage/HomeBelowFold";
import { heroSlides } from "@/components/homepage/heroSlides";

export const revalidate = 60;

export default function Page() {
  const first = heroSlides[0];

  return (
    <>
      {/* Only the LCP image — preloading all 4 starved the first slide. */}
      <link
        rel="preload"
        as="image"
        href={first.image}
        fetchPriority="high"
      />
      <main className="min-h-screen bg-brand-background text-brand-text">
        {/* Hero streams immediately — does not wait for Shopify. */}
        <HeroChrome />
        <Suspense fallback={null}>
          <HomeBelowFold />
        </Suspense>
      </main>
    </>
  );
}

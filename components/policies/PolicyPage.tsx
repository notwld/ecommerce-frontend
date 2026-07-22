import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type PolicyPageProps = {
  title: string;
  lastUpdated?: string;
  intro?: ReactNode;
  children: ReactNode;
};

export function PolicyPage({ title, lastUpdated, intro, children }: PolicyPageProps) {
  return (
    <main className="min-h-screen bg-[#f3f3f3] text-brand-text">
      <PageHeader />
      <section className="border-b border-[#e4e4e4] px-5 pb-20 pt-12 sm:px-10 lg:px-20">
        <article className="mx-auto max-w-[760px]">
          <h1 className="text-[38px] font-normal leading-none text-[#1f1f1f]">{title}</h1>
          {lastUpdated ? (
            <p className="mt-4 text-[13px] text-[#676869]">Last Updated: {lastUpdated}</p>
          ) : null}
          {intro ? (
            <div className="mt-6 grid gap-4 text-[14px] leading-7 text-[#4d4f52]">{intro}</div>
          ) : null}
          <div className="mt-10 grid gap-8 text-[14px] leading-7 text-[#4d4f52]">{children}</div>
        </article>
      </section>
    </main>
  );
}

export function PolicySection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="grid gap-3">
      <h2 className="text-[18px] font-normal text-[#1f1f1f]">{title}</h2>
      <div className="grid gap-3">{children}</div>
    </section>
  );
}

export function PolicyList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function PageHeader() {
  return (
    <header className="border-b border-[#d9d9d9] bg-[#f3f3f3]">
      <div className="mx-auto grid h-[96px] max-w-[1500px] grid-cols-[1fr_auto_1fr] items-center px-6 sm:px-10 lg:px-14">
        <div className="flex items-center gap-5 text-[#1f1f1f]">
          <Link href="/search" className="text-[9px] hover:underline">
            Search
          </Link>
        </div>

        <Link href="/" aria-label="AT Wardrobe home">
          <Image
            src="/logo-dark.webp"
            alt="AT Wardrobe"
            width={640}
            height={494}
            className="h-[72px] w-auto"
          />
        </Link>

        <nav className="flex items-center justify-end gap-5 text-[9px]">
          <Link href="/pages/contact" className="hover:underline">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}

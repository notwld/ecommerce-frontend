import Link from "next/link";

const infoLinks = [
  { label: "Become Our Distributor", href: "/pages/become-our-distributor" },
  { label: "Terms & Conditions", href: "/policies/terms-of-service" },
  { label: "Shipping Policy", href: "/policies/shipping-policy" },
  { label: "Privacy Policy", href: "/policies/privacy-policy" },
  { label: "Return Policy", href: "/policies/refund-policy" },
  { label: "Blogs", href: "/blogs/news" },
];

const customerCareLinks = [
  { label: "Loyalty Program", href: "/pages/rewards" },
  { label: "Complaint Form", href: "/pages/complaint-form" },
  { label: "Contact Us", href: "/pages/contact" },
  { label: "Careers", href: "/pages/careers" },
  { label: "FAQs", href: "/pages/faqs" },
];

const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/mendeez" },
  { label: "Instagram", href: "https://www.instagram.com/mendeez.pk" },
  { label: "YouTube", href: "https://www.youtube.com" },
  { label: "TikTok", href: "https://www.tiktok.com" },
];

export function SiteFooter() {
  return (
    <footer className="bg-[#f1f1f1] text-[#222]">
      <div className="mx-auto max-w-[1400px] px-8 pb-14 pt-16 sm:px-14 lg:px-16">
        <div className="grid gap-12 md:grid-cols-3 md:gap-10">
          <section>
            <h2 className="text-[13px] font-bold uppercase tracking-wide">
              Information
            </h2>
            <ul className="mt-6 grid gap-3">
              {infoLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-[11px] text-[#2d2d2d] transition-colors hover:text-black hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-[13px] font-bold uppercase tracking-wide">
              Customer Care
            </h2>
            <ul className="mt-6 grid gap-3">
              {customerCareLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-[11px] text-[#2d2d2d] transition-colors hover:text-black hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-5 grid gap-2 text-[11px] text-[#2d2d2d]">
              <p>📞 +92 340 0780003</p>
              <p>✉️ info@mendeez.com</p>
            </div>
          </section>

          <section>
            <h2 className="text-[13px] font-bold uppercase tracking-wide">
              Join Newsletter For Flat 10% Off
            </h2>
            <form className="mt-6 flex max-w-[330px] flex-wrap items-center gap-3">
              <label htmlFor="footer-email" className="sr-only">
                Your email
              </label>
              <input
                id="footer-email"
                type="email"
                placeholder="Your email"
                className="h-[34px] flex-1 border border-[#d3d3d3] bg-white px-3 text-[11px] text-[#2f2f2f] placeholder:text-[#8b8b8b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
              />
              <button
                type="button"
                className="h-[32px] min-w-[84px] bg-[#222] px-4 text-[10px] text-white transition-colors hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#f1f1f1]"
              >
                Subscribe
              </button>
            </form>

            <div className="mt-6 flex items-center gap-3 text-[#222]">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-transparent text-[#222] transition-colors hover:border-[#c7c7c7] hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
                >
                  <SocialDot />
                </a>
              ))}
            </div>
          </section>
        </div>
      </div>
      <div className="border-t border-[#e4e4e4] px-8 py-7 sm:px-14 lg:px-16">
        <p className="text-[10px] text-[#5e5e5e]">© 2026 Mendeez.</p>
      </div>
    </footer>
  );
}

function SocialDot() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <circle cx="5" cy="5" r="4" fill="currentColor" />
    </svg>
  );
}

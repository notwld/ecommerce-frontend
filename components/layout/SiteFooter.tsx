import Link from "next/link";
import Image from "next/image";
import {
  SITE_EMAIL,
  SITE_INSTAGRAM_HANDLE,
  SITE_INSTAGRAM_URL,
  SITE_PHONE_DISPLAY,
  SITE_WHATSAPP_URL,
} from "@/lib/site-contact";
import { socialProfiles, WhatsAppGlyph } from "@/components/layout/SocialIcons";

const infoLinks = [
  { label: "Terms & Conditions", href: "/policies/terms-of-service" },
  { label: "Privacy Policy", href: "/policies/privacy-policy" },
  { label: "Return & Exchange Policy", href: "/policies/refund-policy" },
];

const customerCareLinks = [
  { label: "Complaint Form", href: "/pages/complaint-form" },
  { label: "Contact Us", href: "/pages/contact" },
];

export function SiteFooter() {
  return (
    <footer className="bg-[#f1f1f1] text-[#222]">
      <div className="mx-auto max-w-[1400px] px-8 pb-14 pt-16 sm:px-14 lg:px-16">
        <div className="grid gap-12 md:grid-cols-2 md:gap-10">
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

            <div className="mt-6 grid gap-3 text-[11px] text-[#2d2d2d]">
              <a
                href={SITE_WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-black hover:underline"
              >
                <span className="inline-flex h-4 w-4 items-center justify-center text-[#25D366]">
                  <WhatsAppGlyph size={14} />
                </span>
                <span>{SITE_PHONE_DISPLAY}</span>
                <span className="text-[#676869]">(WhatsApp)</span>
              </a>
              <a
                href={SITE_INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-black hover:underline"
              >
                <span className="inline-flex h-4 w-4 items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
                    <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
                    <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
                  </svg>
                </span>
                <span>{SITE_INSTAGRAM_HANDLE}</span>
              </a>
              <a
                href={`mailto:${SITE_EMAIL}`}
                className="inline-flex items-center gap-2 transition-colors hover:text-black hover:underline"
              >
                <span aria-hidden="true">✉️</span>
                <span>{SITE_EMAIL}</span>
              </a>
            </div>

            <div className="mt-6 flex items-center gap-3 text-[#222]">
              {socialProfiles.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#d0d0d0] text-[#222] transition-colors hover:border-[#222] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </section>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 border-t border-[#e4e4e4] px-8 py-7 sm:flex-row sm:justify-between sm:px-14 lg:px-16">
        <Image
          src="/logo-dark.webp"
          alt="AT Wardrobe"
          width={640}
          height={494}
          className="h-[44px] w-auto"
        />
        <p className="text-[10px] text-[#5e5e5e]">© 2026 AT Wardrobe.</p>
      </div>
    </footer>
  );
}

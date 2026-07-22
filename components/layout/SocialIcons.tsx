import {
  SITE_FACEBOOK_URL,
  SITE_INSTAGRAM_URL,
  SITE_WHATSAPP_URL,
} from "@/lib/site-contact";

export function WhatsAppFloat({ className = "" }: { className?: string }) {
  return (
    <a
      href={SITE_WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className={[
        "fixed bottom-6 right-7 z-30 flex h-[55px] w-[55px] items-center justify-center rounded-full bg-brand-secondary text-white shadow-[0_6px_16px_rgba(0,0,0,0.24)] transition-transform hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2",
        className,
      ].join(" ")}
    >
      <WhatsAppGlyph />
    </a>
  );
}

export function WhatsAppGlyph({ size = 31 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M6.3 25.7 7.7 21A11 11 0 1 1 12 25.4l-5.7.3Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M12.3 10.4c.3-.6.5-.6.9-.6h.7c.2 0 .5.1.7.5.2.5.8 2 .9 2.2.1.2.1.4 0 .6-.2.4-.4.6-.7.9-.2.2-.4.4-.2.8.2.4.9 1.5 1.9 2.4 1.3 1.2 2.4 1.6 2.8 1.8.3.1.6.1.8-.2l1.1-1.3c.3-.4.6-.3.9-.2l2.1 1c.4.2.6.3.7.5.1.2.1 1.6-.4 2.2-.5.7-1.9 1.4-3.2 1.2-1.3-.2-3.1-.8-5.2-2.1-2.6-1.6-4.3-3.9-4.9-5.1-.6-1.1-1.4-3.1-.6-4.6Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function FacebookGlyph({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H9v3h2v7h3v-7h2.6l.4-3H14V9c0-.6.4-1 1-1Z" />
    </svg>
  );
}

export function InstagramGlyph({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
    </svg>
  );
}

export const socialProfiles = [
  { label: "Facebook", href: SITE_FACEBOOK_URL, Icon: FacebookGlyph },
  { label: "Instagram", href: SITE_INSTAGRAM_URL, Icon: InstagramGlyph },
] as const;

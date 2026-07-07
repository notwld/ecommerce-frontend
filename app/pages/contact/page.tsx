import type { Metadata } from "next";
import { ContactPage } from "@/components/contact/ContactPage";

export const metadata: Metadata = {
  title: "Contact Us | AT Wardrobe",
  description: "Get in touch with the AT Wardrobe team.",
};

export default function Page() {
  return <ContactPage />;
}

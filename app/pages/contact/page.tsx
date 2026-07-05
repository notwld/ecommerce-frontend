import type { Metadata } from "next";
import { ContactPage } from "@/components/contact/ContactPage";

export const metadata: Metadata = {
  title: "Contact Us | Mendeez",
  description: "Get in touch with the Mendeez team.",
};

export default function Page() {
  return <ContactPage />;
}

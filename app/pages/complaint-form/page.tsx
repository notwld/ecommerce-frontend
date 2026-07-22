import type { Metadata } from "next";
import { ComplaintFormPage } from "@/components/complaint/ComplaintFormPage";

export const metadata: Metadata = {
  title: "Complaint Form | AT Wardrobe",
  description: "Submit a complaint or feedback to the AT Wardrobe team.",
};

export default function Page() {
  return <ComplaintFormPage />;
}

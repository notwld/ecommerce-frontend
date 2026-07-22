import type { Metadata } from "next";
import Link from "next/link";
import { PolicyList, PolicyPage, PolicySection } from "@/components/policies/PolicyPage";

export const metadata: Metadata = {
  title: "Return & Exchange Policy | AT Wardrobe",
  description: "Return and exchange policy for AT Wardrobe orders.",
};

export default function Page() {
  return (
    <PolicyPage
      title="Return & Exchange Policy"
      lastUpdated="July 20, 2026"
      intro={
        <p>
          At AT Wardrobe, customer satisfaction is important to us. If you are
          not completely satisfied with your purchase, you may request a return
          or exchange in accordance with the policy below.
        </p>
      }
    >
      <PolicySection title="1. Return & Exchange Period">
        <p>
          Products may be returned or exchanged within 2 days of receiving your
          order.
        </p>
        <p>Requests submitted after this period may not be accepted.</p>
      </PolicySection>

      <PolicySection title="2. Eligibility">
        <p>To qualify for a return or exchange, the item must:</p>
        <PolicyList
          items={[
            "Be unused, unwashed, and in its original condition.",
            "Have all original tags and packaging intact.",
            "Be free from stains, damage, odors, or signs of wear.",
            "Be accompanied by proof of purchase or order confirmation.",
          ]}
        />
        <p>
          AT Wardrobe reserves the right to refuse any return or exchange that
          does not meet these conditions.
        </p>
      </PolicySection>

      <PolicySection title="3. Non-Returnable Items">
        <p>Returns or exchanges may not be accepted for:</p>
        <PolicyList
          items={[
            "Products showing signs of use or damage caused after delivery.",
            "Items returned without original tags or packaging.",
            "Products marked as final sale or non-returnable, where applicable.",
          ]}
        />
      </PolicySection>

      <PolicySection title="4. Damaged or Incorrect Items">
        <p>
          If you receive a damaged, defective, or incorrect product, please
          contact us within 2 days of delivery. We will review the issue and work
          towards an appropriate resolution.
        </p>
      </PolicySection>

      <PolicySection title="5. Refunds">
        <p>
          Once a returned item has been received and inspected, eligible refunds
          (if applicable) will be processed using the original payment method or
          another suitable method, at our discretion.
        </p>
        <p>
          Shipping or handling charges are generally non-refundable unless the
          return is due to an error on our part.
        </p>
      </PolicySection>

      <PolicySection title="6. Exchange Process">
        <p>
          Eligible products may be exchanged for another available size, color,
          or product, subject to stock availability.
        </p>
      </PolicySection>

      <PolicySection title="7. Shipping for Returns">
        <p>
          Customers may be responsible for return shipping costs unless the
          return is due to a damaged, defective, or incorrect item.
        </p>
      </PolicySection>

      <PolicySection title="8. Policy Updates">
        <p>
          AT Wardrobe reserves the right to modify or update this Return &
          Exchange Policy at any time without prior notice. Any changes will
          become effective once published on this page.
        </p>
      </PolicySection>

      <PolicySection title="9. Contact Us">
        <p>
          For any questions regarding returns or exchanges, please{" "}
          <Link href="/pages/contact" className="underline hover:text-black">
            contact us
          </Link>{" "}
          using the contact information available on our website.
        </p>
      </PolicySection>
    </PolicyPage>
  );
}

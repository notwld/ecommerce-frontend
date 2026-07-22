import type { Metadata } from "next";
import Link from "next/link";
import { PolicyPage, PolicySection } from "@/components/policies/PolicyPage";

export const metadata: Metadata = {
  title: "Terms & Conditions | AT Wardrobe",
  description: "Terms & Conditions for shopping at AT Wardrobe.",
};

export default function Page() {
  return (
    <PolicyPage
      title="Terms & Conditions"
      lastUpdated="July 20, 2026"
      intro={
        <p>
          Welcome to AT Wardrobe. By accessing or using our website, you agree to
          comply with and be bound by the following Terms & Conditions. Please
          read them carefully before using our website.
        </p>
      }
    >
      <PolicySection title="1. General">
        <p>
          These Terms & Conditions govern your use of the AT Wardrobe website and
          all purchases made through our online store. By using this website, you
          acknowledge that you have read, understood, and agreed to these terms.
        </p>
        <p>
          We reserve the right to update or modify these Terms & Conditions at
          any time without prior notice. Continued use of the website constitutes
          acceptance of any changes.
        </p>
      </PolicySection>

      <PolicySection title="2. Products">
        <p>
          We strive to display our products as accurately as possible. However,
          actual colors may vary depending on your device&apos;s screen settings.
        </p>
        <p>
          All products are subject to availability. We reserve the right to
          discontinue or modify any product without prior notice.
        </p>
      </PolicySection>

      <PolicySection title="3. Pricing">
        <p>
          All prices displayed on the website are in Pakistani Rupees (PKR)
          unless stated otherwise.
        </p>
        <p>
          Prices are subject to change without prior notice. Promotional offers
          and discounts are valid only during the specified period.
        </p>
      </PolicySection>

      <PolicySection title="4. Orders">
        <p>
          Once an order is placed, you will receive an order confirmation via
          email or SMS (where applicable).
        </p>
        <p>
          AT Wardrobe reserves the right to refuse or cancel any order due to
          product availability, pricing errors, suspected fraudulent activity, or
          any other reason deemed necessary.
        </p>
      </PolicySection>

      <PolicySection title="5. Payment">
        <p>We accept the payment methods displayed during checkout.</p>
        <p>
          Orders will only be processed once payment has been successfully
          confirmed or verified, where applicable.
        </p>
      </PolicySection>

      <PolicySection title="6. Shipping">
        <p>
          Shipping times are estimates and may vary depending on your location,
          courier services, weather conditions, or public holidays.
        </p>
        <p>
          AT Wardrobe is not responsible for delays caused by third-party courier
          services.
        </p>
      </PolicySection>

      <PolicySection title="7. Exchange & Returns">
        <p>
          Please refer to our{" "}
          <Link href="/policies/refund-policy" className="underline hover:text-black">
            Exchange & Return Policy
          </Link>{" "}
          for complete details regarding product exchanges, returns, and
          eligibility.
        </p>
        <p>
          Items must be returned in their original condition, unused, and with
          all tags attached where applicable.
        </p>
      </PolicySection>

      <PolicySection title="8. Intellectual Property">
        <p>
          All content on this website, including logos, product images, graphics,
          text, designs, and trademarks, is the property of AT Wardrobe and may
          not be copied, reproduced, distributed, or used without prior written
          permission.
        </p>
      </PolicySection>

      <PolicySection title="9. User Conduct">
        <p>
          You agree not to misuse the website or engage in activities that may
          disrupt its operation, compromise its security, or violate applicable
          laws.
        </p>
        <p>
          Users must not submit false information or attempt unauthorized access
          to any part of the website.
        </p>
      </PolicySection>

      <PolicySection title="10. Limitation of Liability">
        <p>
          AT Wardrobe shall not be liable for any indirect, incidental, special,
          or consequential damages arising from the use of this website or the
          purchase of our products.
        </p>
        <p>
          Our liability shall be limited to the amount paid for the purchased
          product, as permitted by applicable law.
        </p>
      </PolicySection>

      <PolicySection title="11. Privacy">
        <p>
          Your personal information is handled in accordance with our{" "}
          <Link href="/policies/privacy-policy" className="underline hover:text-black">
            Privacy Policy
          </Link>
          .
        </p>
        <p>
          By using our website, you consent to the collection and use of your
          information as described in the Privacy Policy.
        </p>
      </PolicySection>

      <PolicySection title="12. Legal">
        <p>
          These Terms & Conditions are subject to applicable laws and
          regulations. By using this website, you agree to comply with all
          applicable legal requirements.
        </p>
      </PolicySection>

      <PolicySection title="13. Contact Us">
        <p>
          If you have any questions regarding these Terms & Conditions, please{" "}
          <Link href="/pages/contact" className="underline hover:text-black">
            contact us
          </Link>{" "}
          through the contact information provided on our website.
        </p>
      </PolicySection>
    </PolicyPage>
  );
}

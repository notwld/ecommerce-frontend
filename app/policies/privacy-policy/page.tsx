import type { Metadata } from "next";
import Link from "next/link";
import { PolicyList, PolicyPage, PolicySection } from "@/components/policies/PolicyPage";

export const metadata: Metadata = {
  title: "Privacy Policy | AT Wardrobe",
  description: "How AT Wardrobe collects, uses, and protects your information.",
};

export default function Page() {
  return (
    <PolicyPage
      title="Privacy Policy"
      lastUpdated="July 20, 2026"
      intro={
        <>
          <p>
            At AT Wardrobe, we respect your privacy and are committed to
            protecting the information you share with us. This Privacy Policy
            explains, in general terms, how information may be collected, used,
            and protected when you visit our website or interact with our
            services.
          </p>
          <p>
            By using our website, you agree to the practices described in this
            Privacy Policy.
          </p>
        </>
      }
    >
      <PolicySection title="1. Information We Collect">
        <p>
          We may collect information that you voluntarily provide when placing an
          order, creating an account, contacting us, or interacting with our
          website.
        </p>
        <p>
          We may also collect certain information automatically to help improve
          the functionality and performance of our website.
        </p>
      </PolicySection>

      <PolicySection title="2. How We Use Your Information">
        <p>Information collected may be used to:</p>
        <PolicyList
          items={[
            "Process and manage orders.",
            "Provide customer support.",
            "Improve our website, products, and services.",
            "Respond to inquiries and requests.",
            "Communicate important updates related to your orders or our services.",
            "Maintain the security and functionality of our website.",
          ]}
        />
      </PolicySection>

      <PolicySection title="3. Information Sharing">
        <p>We do not sell or rent your personal information.</p>
        <p>
          Information may be shared with trusted service providers where
          necessary to operate our website, process orders, or provide requested
          services. Information may also be disclosed where required by
          applicable laws or regulations.
        </p>
      </PolicySection>

      <PolicySection title="4. Data Security">
        <p>
          We take reasonable measures to help protect the information collected
          through our website. While we strive to maintain appropriate
          safeguards, no method of data transmission or storage can be guaranteed
          to be completely secure.
        </p>
      </PolicySection>

      <PolicySection title="5. Cookies">
        <p>
          Our website may use cookies or similar technologies to improve your
          browsing experience, remember preferences, and enhance website
          functionality.
        </p>
        <p>
          You may choose to manage cookie preferences through your browser
          settings.
        </p>
      </PolicySection>

      <PolicySection title="6. Third-Party Services">
        <p>
          Our website may include links or integrations with third-party
          services. We are not responsible for the privacy practices or content
          of third-party websites or platforms. We encourage users to review
          their respective privacy policies.
        </p>
      </PolicySection>

      <PolicySection title="7. Changes to This Policy">
        <p>
          We may update this Privacy Policy from time to time. Any changes will
          become effective once published on this page.
        </p>
      </PolicySection>

      <PolicySection title="8. Contact Us">
        <p>
          If you have any questions regarding this Privacy Policy, please{" "}
          <Link href="/pages/contact" className="underline hover:text-black">
            contact us
          </Link>{" "}
          using the contact information available on our website.
        </p>
      </PolicySection>
    </PolicyPage>
  );
}

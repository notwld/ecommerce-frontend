"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const categories = [
  "Product Quality",
  "Order Issue",
  "Delivery",
  "Payment",
  "Customer Service",
  "Website Issue",
  "Other",
] as const;

const resolutions = [
  "Replacement",
  "Exchange",
  "Refund",
  "Information / Clarification",
  "Other",
] as const;

const complaintSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name."),
  email: z.email("Please enter a valid email address."),
  phone: z.string().trim().optional(),
  orderNumber: z.string().trim().optional(),
  subject: z.string().trim().min(3, "Please enter a subject."),
  category: z.enum(categories, { message: "Please choose a category." }),
  description: z
    .string()
    .trim()
    .min(10, "Please describe your complaint in at least 10 characters."),
  preferredResolution: z.enum(resolutions, {
    message: "Please choose a preferred resolution.",
  }),
  agreed: z.boolean().refine((value) => value, {
    message: "Please confirm that you agree to the review of your complaint.",
  }),
});

type ComplaintFormValues = z.infer<typeof complaintSchema>;

const inputClass =
  "h-[43px] w-full border border-[#d8d8d8] bg-white px-3 text-[13px] text-[#222] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent";
const selectClass =
  "h-[43px] w-full border border-[#d8d8d8] bg-white px-3 text-[13px] text-[#222] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent";

export function ComplaintFormPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ComplaintFormValues>({
    resolver: zodResolver(complaintSchema),
    mode: "onBlur",
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      orderNumber: "",
      subject: "",
      description: "",
      agreed: false,
    },
  });

  async function onSubmit(values: ComplaintFormValues) {
    void values;
    setIsSubmitted(false);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsSubmitted(true);
    form.reset();
  }

  return (
    <main className="min-h-screen bg-[#f3f3f3] text-brand-text">
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

      <section className="border-b border-[#e4e4e4] px-5 pb-20 pt-12 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-[760px]">
          <h1 className="text-[38px] font-normal leading-none text-[#1f1f1f]">
            Complaint Form
          </h1>
          <p className="mt-6 text-[14px] leading-7 text-[#4d4f52]">
            We value your feedback and are committed to providing the best
            possible experience. If you have experienced any issue with our
            products or services, please complete the form below. We will review
            your complaint and respond as soon as possible.
          </p>

          {isSubmitted ? (
            <p className="mt-6 rounded border border-[#c8ddcb] bg-[#ecf7ee] px-4 py-3 text-[13px] text-[#28492d]">
              Thank you for contacting AT Wardrobe. We appreciate your feedback
              and will review your complaint as soon as possible. Our team will
              contact you if additional information is required.
            </p>
          ) : null}

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-8 grid gap-8"
            noValidate
          >
            <fieldset className="grid gap-5">
              <legend className="text-[16px] font-normal text-[#1f1f1f]">
                Customer Information
              </legend>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  id="complaint-name"
                  label="Full Name"
                  error={form.formState.errors.fullName?.message}
                >
                  <input
                    id="complaint-name"
                    type="text"
                    {...form.register("fullName")}
                    aria-invalid={Boolean(form.formState.errors.fullName)}
                    aria-describedby={
                      form.formState.errors.fullName
                        ? "complaint-name-error"
                        : undefined
                    }
                    className={inputClass}
                  />
                </Field>

                <Field
                  id="complaint-email"
                  label="Email Address"
                  error={form.formState.errors.email?.message}
                >
                  <input
                    id="complaint-email"
                    type="email"
                    {...form.register("email")}
                    aria-invalid={Boolean(form.formState.errors.email)}
                    aria-describedby={
                      form.formState.errors.email
                        ? "complaint-email-error"
                        : undefined
                    }
                    className={inputClass}
                  />
                </Field>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="complaint-phone" label="Phone Number (Optional)">
                  <input
                    id="complaint-phone"
                    type="tel"
                    {...form.register("phone")}
                    className={inputClass}
                  />
                </Field>

                <Field id="complaint-order" label="Order Number (If Applicable)">
                  <input
                    id="complaint-order"
                    type="text"
                    {...form.register("orderNumber")}
                    className={inputClass}
                  />
                </Field>
              </div>
            </fieldset>

            <fieldset className="grid gap-5">
              <legend className="text-[16px] font-normal text-[#1f1f1f]">
                Complaint Details
              </legend>

              <Field
                id="complaint-subject"
                label="Subject"
                error={form.formState.errors.subject?.message}
              >
                <input
                  id="complaint-subject"
                  type="text"
                  {...form.register("subject")}
                  aria-invalid={Boolean(form.formState.errors.subject)}
                  aria-describedby={
                    form.formState.errors.subject
                      ? "complaint-subject-error"
                      : undefined
                  }
                  className={inputClass}
                />
              </Field>

              <Field
                id="complaint-category"
                label="Category"
                error={form.formState.errors.category?.message}
              >
                <select
                  id="complaint-category"
                  {...form.register("category")}
                  aria-invalid={Boolean(form.formState.errors.category)}
                  aria-describedby={
                    form.formState.errors.category
                      ? "complaint-category-error"
                      : undefined
                  }
                  className={selectClass}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </Field>

              <Field
                id="complaint-description"
                label="Description of the Complaint"
                error={form.formState.errors.description?.message}
              >
                <textarea
                  id="complaint-description"
                  {...form.register("description")}
                  aria-invalid={Boolean(form.formState.errors.description)}
                  aria-describedby={
                    form.formState.errors.description
                      ? "complaint-description-error"
                      : undefined
                  }
                  className="min-h-[140px] w-full resize-y border border-[#d8d8d8] bg-white px-3 py-2 text-[13px] text-[#222] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
                />
              </Field>
            </fieldset>

            <fieldset className="grid gap-5">
              <legend className="text-[16px] font-normal text-[#1f1f1f]">
                Supporting Information
              </legend>

              <Field id="complaint-attachment" label="Attach Images or Documents (Optional)">
                <input
                  id="complaint-attachment"
                  type="file"
                  accept="image/*,.pdf"
                  className="block w-full text-[13px] text-[#4d4f52] file:mr-4 file:border-0 file:bg-[#202020] file:px-4 file:py-2 file:text-[12px] file:text-white"
                />
              </Field>

              <Field
                id="complaint-resolution"
                label="Preferred Resolution"
                error={form.formState.errors.preferredResolution?.message}
              >
                <select
                  id="complaint-resolution"
                  {...form.register("preferredResolution")}
                  aria-invalid={Boolean(form.formState.errors.preferredResolution)}
                  aria-describedby={
                    form.formState.errors.preferredResolution
                      ? "complaint-resolution-error"
                      : undefined
                  }
                  className={selectClass}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a preferred resolution
                  </option>
                  {resolutions.map((resolution) => (
                    <option key={resolution} value={resolution}>
                      {resolution}
                    </option>
                  ))}
                </select>
              </Field>
            </fieldset>

            <fieldset className="grid gap-3">
              <legend className="text-[16px] font-normal text-[#1f1f1f]">
                Declaration
              </legend>
              <p className="text-[13px] text-[#4d4f52]">
                I confirm that the information provided above is true and
                accurate to the best of my knowledge.
              </p>
              <label className="flex items-start gap-3 text-[13px] text-[#222]">
                <input
                  type="checkbox"
                  {...form.register("agreed")}
                  aria-invalid={Boolean(form.formState.errors.agreed)}
                  aria-describedby={
                    form.formState.errors.agreed ? "complaint-agreed-error" : undefined
                  }
                  className="mt-1 h-4 w-4"
                />
                <span>I agree to the review of my complaint.</span>
              </label>
              {form.formState.errors.agreed ? (
                <span
                  id="complaint-agreed-error"
                  className="text-[11px] text-[#9f1d1d]"
                >
                  {form.formState.errors.agreed.message}
                </span>
              ) : null}
            </fieldset>

            <div>
              <button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="h-[40px] min-w-[120px] bg-[#202020] px-5 text-[12px] text-white transition-colors hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-[#666]"
              >
                {form.formState.isSubmitting ? "Submitting..." : "Submit Complaint"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="mb-2 block text-[11px] text-[#222]">{label}</span>
      {children}
      {error ? (
        <span id={`${id}-error`} className="mt-1 block text-[11px] text-[#9f1d1d]">
          {error}
        </span>
      ) : null}
    </label>
  );
}

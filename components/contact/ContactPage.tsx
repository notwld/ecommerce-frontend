"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.email("Please enter a valid email address."),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number.")
    .max(20, "Please enter a valid phone number."),
  message: z.string().trim().min(10, "Please enter at least 10 characters."),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  async function onSubmit(values: ContactFormValues) {
    void values;
    setIsSubmitted(false);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsSubmitted(true);
    form.reset();
  }

  return (
    <main className="min-h-screen bg-[#f3f3f3] text-brand-text">
      <TopBar />
      <ContactHeader />
      <section className="border-b border-[#e4e4e4] px-5 pb-20 pt-12 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-[760px]">
          <h1 className="text-[38px] font-normal leading-none text-[#1f1f1f]">
            Contact Us
          </h1>

          {isSubmitted ? (
            <p className="mt-6 rounded border border-[#c8ddcb] bg-[#ecf7ee] px-4 py-3 text-[13px] text-[#28492d]">
              Thanks, your message has been sent. Our team will get back to you
              shortly.
            </p>
          ) : null}

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-7 grid gap-5"
            noValidate
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                id="contact-name"
                label="Name"
                error={form.formState.errors.name?.message}
              >
                <input
                  id="contact-name"
                  type="text"
                  {...form.register("name")}
                  aria-invalid={Boolean(form.formState.errors.name)}
                  aria-describedby={
                    form.formState.errors.name ? "contact-name-error" : undefined
                  }
                  className="h-[43px] w-full border border-[#d8d8d8] bg-white px-3 text-[13px] text-[#222] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
                />
              </Field>

              <Field
                id="contact-email"
                label="Email"
                error={form.formState.errors.email?.message}
              >
                <input
                  id="contact-email"
                  type="email"
                  {...form.register("email")}
                  aria-invalid={Boolean(form.formState.errors.email)}
                  aria-describedby={
                    form.formState.errors.email ? "contact-email-error" : undefined
                  }
                  className="h-[43px] w-full border border-[#d8d8d8] bg-white px-3 text-[13px] text-[#222] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
                />
              </Field>
            </div>

            <Field
              id="contact-phone"
              label="Phone"
              error={form.formState.errors.phone?.message}
            >
              <input
                id="contact-phone"
                type="tel"
                {...form.register("phone")}
                aria-invalid={Boolean(form.formState.errors.phone)}
                aria-describedby={
                  form.formState.errors.phone ? "contact-phone-error" : undefined
                }
                className="h-[43px] w-full border border-[#d8d8d8] bg-white px-3 text-[13px] text-[#222] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
              />
            </Field>

            <Field
              id="contact-message"
              label="Message"
              error={form.formState.errors.message?.message}
            >
              <textarea
                id="contact-message"
                {...form.register("message")}
                aria-invalid={Boolean(form.formState.errors.message)}
                aria-describedby={
                  form.formState.errors.message
                    ? "contact-message-error"
                    : undefined
                }
                className="min-h-[120px] w-full resize-y border border-[#d8d8d8] bg-white px-3 py-2 text-[13px] text-[#222] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
              />
            </Field>

            <div className="pt-1">
              <button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="h-[40px] min-w-[80px] bg-[#202020] px-5 text-[12px] text-white transition-colors hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-[#666]"
              >
                {form.formState.isSubmitting ? "Sending..." : "Send"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

function TopBar() {
  return (
    <div className="h-[29px] bg-brand-primary text-center text-[10px] font-bold uppercase leading-[29px] text-white">
      CLEARANCE SALE | SHOP NOW
    </div>
  );
}

function ContactHeader() {
  return (
    <header className="border-b border-[#d9d9d9] bg-[#f3f3f3]">
      <div className="mx-auto grid h-[84px] max-w-[1500px] grid-cols-[1fr_auto_1fr] items-center px-6 sm:px-10 lg:px-14">
        <div className="flex items-center gap-5 text-[#1f1f1f]">
          <button
            type="button"
            aria-label="Open menu"
            className="inline-flex h-9 w-9 items-center justify-center"
          >
            <span className="relative block h-3 w-[18px] before:absolute before:left-0 before:top-0 before:h-[1.5px] before:w-full before:bg-current after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-full after:bg-current" />
          </button>
          <Link href="/search" className="text-[9px] hover:underline">
            Search
          </Link>
        </div>

        <Link
          href="/"
          aria-label="Mendeez home"
          className="text-[31px] indent-[0.46em] font-bold leading-none tracking-[0.46em]"
        >
          MENDEEZ
        </Link>

        <nav className="flex items-center justify-end gap-5 text-[9px]">
          <Link href="/account" className="hover:underline">
            Account
          </Link>
          <Link href="/cart" className="hover:underline">
            Cart
          </Link>
          <span
            aria-label="Cart item count"
            className="grid h-4 w-4 place-items-center rounded-full bg-black text-[9px] text-white"
          >
            0
          </span>
        </nav>
      </div>
    </header>
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

import type { Metadata } from "next";
import { Clock, Mail, MessageCircle, ShieldCheck } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact | Mindora",
  description:
    "Get in touch with the Mindora team. Reach out about support, billing, privacy requests, partnerships, or press — we reply within 2 business days.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact | Mindora",
    description:
      "Questions, feedback, or partnership ideas? Send us a message and the Mindora team will get back to you within 2 business days.",
    type: "website",
    locale: "en_US",
    siteName: "Mindora",
  },
};

export default function ContactPage() {
  return (
    <div className="flex-1">
      <section className="relative overflow-hidden pt-24 md:pt-28 pb-16 md:pb-20">
        <div aria-hidden className="absolute inset-0 bg-radial-fade pointer-events-none" />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -right-10 h-96 w-96 rounded-full bg-softGold/20 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-10 -left-24 h-96 w-96 rounded-full bg-lavender/50 blur-3xl"
        />

        <div className="container relative">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-softLavender px-4 py-1.5 text-xs md:text-sm font-medium text-primaryPurple tracking-wide mb-6">
              <MessageCircle className="h-3.5 w-3.5 text-brightPurple" />
              Contact
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-brandText leading-[1.05]">
              We&apos;d love to{" "}
              <span className="bg-gradient-to-r from-primaryPurple via-brightPurple to-lavender bg-clip-text text-transparent">
                hear from you.
              </span>
            </h1>
            <p className="mt-6 text-base md:text-lg text-brandSecondaryText leading-relaxed">
              Questions, feedback, or just want to say hello? Our team reads
              every message and will get back to you within 2 business days.
            </p>
          </div>

          <div className="mt-14 md:mt-20 grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-2">
              <div className="rounded-3xl border border-lavender/50 bg-white p-6 md:p-8 shadow-card">
                <h2 className="text-xl font-semibold text-brandText tracking-tight">
                  Contact details
                </h2>
                <p className="mt-2 text-sm text-brandSecondaryText">
                  Reach the right team directly.
                </p>

                <ul className="mt-6 space-y-5">
                  <li className="flex items-start gap-4">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-softLavender to-lavender/60 text-primaryPurple">
                      <Mail className="h-5 w-5" aria-hidden />
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-brandText">
                        General support
                      </div>
                      <a
                        href="mailto:support@mindora.app"
                        className="text-sm text-primaryPurple hover:text-brightPurple transition-colors"
                      >
                        support@mindora.app
                      </a>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-softLavender to-lavender/60 text-primaryPurple">
                      <ShieldCheck className="h-5 w-5" aria-hidden />
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-brandText">
                        Privacy requests
                      </div>
                      <a
                        href="mailto:privacy@mindora.app"
                        className="text-sm text-primaryPurple hover:text-brightPurple transition-colors"
                      >
                        privacy@mindora.app
                      </a>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-softLavender to-lavender/60 text-primaryPurple">
                      <Clock className="h-5 w-5" aria-hidden />
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-brandText">
                        Response time
                      </div>
                      <p className="text-sm text-brandSecondaryText">
                        We reply within 2 business days.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-3">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

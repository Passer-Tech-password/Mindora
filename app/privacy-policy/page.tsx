import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Heart, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Mindora",
  description:
    "Learn how Mindora collects, uses, stores, and protects your personal information, and the rights and choices you have over your data.",
  alternates: {
    canonical: "/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | Mindora",
    description:
      "How Mindora collects, uses, and protects your data — and the choices you control.",
    type: "website",
    locale: "en_US",
    siteName: "Mindora",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="flex-1">
      <section className="relative overflow-hidden pt-24 md:pt-28 pb-16 md:pb-20">
        <div aria-hidden className="absolute inset-0 bg-radial-fade pointer-events-none" />
        <div aria-hidden className="pointer-events-none absolute -top-32 -right-10 h-96 w-96 rounded-full bg-softGold/20 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute top-10 -left-24 h-96 w-96 rounded-full bg-lavender/50 blur-3xl" />

        <div className="container relative">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-softLavender px-4 py-1.5 text-xs md:text-sm font-medium text-primaryPurple tracking-wide mb-6">
              <Shield className="h-3.5 w-3.5 text-brightPurple" />
              Your Privacy
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-brandText leading-[1.1]">
              Privacy{" "}
              <span className="bg-gradient-to-r from-primaryPurple via-brightPurple to-lavender bg-clip-text text-transparent">
                Policy
              </span>
            </h1>
            <p className="mt-6 text-base md:text-lg text-brandSecondaryText leading-relaxed">
              Your trust matters to us. This policy explains what we collect,
              why we collect it, and how you stay in control of your
              information.
            </p>
            <p className="mt-4 text-sm text-brandSecondaryText">
              Last updated: 1 November 2026
            </p>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="container relative">
          <article className="mx-auto max-w-3xl space-y-10">
            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-semibold text-brandText">
                Introduction
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-brandSecondaryText">
                Mindora (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;)
                provides a mental and emotional wellness application. This
                Privacy Policy describes how we collect, use, store, share, and
                protect your personal information when you use the Mindora app
                and website. By using Mindora, you agree to the practices
                described here. If you do not agree, please do not use the
                service.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-semibold text-brandText">
                Information We Collect
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-brandSecondaryText">
                We aim to collect only what we need to run Mindora well. This
                includes:
              </p>
              <ul className="list-disc space-y-2 pl-6 text-sm md:text-base leading-relaxed text-brandSecondaryText">
                <li>
                  <span className="font-medium text-brandText">Account details</span> —
                  such as your name, email address, and profile information,
                  managed through Firebase Authentication when you sign up or
                  sign in.
                </li>
                <li>
                  <span className="font-medium text-brandText">Mood check-ins</span> —
                  the moods, notes, and reflections you record so we can show
                  you your patterns.
                </li>
                <li>
                  <span className="font-medium text-brandText">Saved content</span> —
                  affirmations, audio tracks, and other items you save or
                  favourite.
                </li>
                <li>
                  <span className="font-medium text-brandText">Community posts</span> —
                  content you choose to share in the community, including
                  whether you post anonymously.
                </li>
                <li>
                  <span className="font-medium text-brandText">Usage data</span> —
                  technical and interaction data such as device type, app
                  version, and general activity, used to keep the service
                  stable and improve it.
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-semibold text-brandText">
                How We Use Your Information
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-brandSecondaryText">
                We use your information to:
              </p>
              <ul className="list-disc space-y-2 pl-6 text-sm md:text-base leading-relaxed text-brandSecondaryText">
                <li>Provide, personalise, and improve the Mindora experience.</li>
                <li>Show you mood insights, streaks, and saved content.</li>
                <li>Operate the community and keep it a safe, kind space.</li>
                <li>Authenticate your account and protect against misuse.</li>
                <li>Respond to your support requests and questions.</li>
                <li>Comply with legal obligations and enforce our terms.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-semibold text-brandText">
                Legal Bases
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-brandSecondaryText">
                Where required by law, we process your information under one or
                more legal bases: your consent (for example, when you enable
                optional features), the performance of our contract with you
                (providing the service you signed up for), our legitimate
                interests (such as keeping the service secure), and compliance
                with legal obligations. You may withdraw consent at any time for
                features that rely on it.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-semibold text-brandText">
                Data Storage &amp; Security
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-brandSecondaryText">
                Your data is stored using Firebase and Cloud Firestore. We
                protect it with encryption in transit, secure authentication,
                and role-based access controls that limit who on our team can
                access data. While no system can be perfectly secure, we work
                to safeguard your information with industry-standard measures
                and review our practices regularly.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-semibold text-brandText">
                Data Sharing
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-brandSecondaryText">
                <span className="font-medium text-brandText">
                  We never sell your data.
                </span>{" "}
                We do not share your personal information with advertisers or
                data brokers. We may share limited information with trusted
                processors and sub-processors who help us run Mindora — for
                example, cloud hosting, authentication, and payment providers —
                and only to the extent needed to deliver the service. These
                providers are bound by contracts to protect your data, and we
                may also disclose information where required by law.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-semibold text-brandText">
                Your Rights &amp; Choices
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-brandSecondaryText">
                Depending on where you live, you may have the right to:
              </p>
              <ul className="list-disc space-y-2 pl-6 text-sm md:text-base leading-relaxed text-brandSecondaryText">
                <li>Access the personal data we hold about you.</li>
                <li>Export your data in a portable format.</li>
                <li>Delete your account and associated data.</li>
                <li>Withdraw consent where processing is based on consent.</li>
                <li>Object to or restrict certain processing.</li>
              </ul>
              <p className="text-sm md:text-base leading-relaxed text-brandSecondaryText">
                Many of these actions are available directly from your Account
                settings. You can also reach us using the contact details
                below.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-semibold text-brandText">
                Cookies &amp; Analytics
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-brandSecondaryText">
                We use a minimal set of cookies and similar technologies to keep
                you signed in and to understand how Mindora is used so we can
                improve it. Analytics data is aggregated and used to improve
                performance and features, not to build advertising profiles.
                You can control cookies through your browser settings, though
                some parts of the service may not function without them.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-semibold text-brandText">
                Children&apos;s Privacy
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-brandSecondaryText">
                Mindora is intended for people aged 16 and older. We do not
                knowingly collect personal information from anyone under 16
                without appropriate guardian consent. If you are under the
                required age, please use Mindora only with the involvement of a
                parent or guardian. If you believe a child has provided us with
                personal information, please contact us so we can remove it.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-semibold text-brandText">
                International Transfers
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-brandSecondaryText">
                We may process and store your information in countries other
                than your own, including where our service providers operate.
                When we transfer data across borders, we take steps to ensure it
                remains protected in line with this policy and applicable law,
                using appropriate safeguards.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-semibold text-brandText">
                Retention
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-brandSecondaryText">
                We keep your personal information for as long as your account is
                active or as needed to provide the service. When you delete your
                account, we delete or anonymise your data, except where we are
                required to retain certain information for legal, security, or
                accounting purposes. Backup copies are removed in accordance
                with our standard retention cycles.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-semibold text-brandText">
                Changes to This Policy
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-brandSecondaryText">
                We may update this Privacy Policy from time to time. When we
                make material changes, we will update the &quot;Last
                updated&quot; date and, where appropriate, notify you within the
                app. We encourage you to review this page periodically to stay
                informed about how we protect your information.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-semibold text-brandText">
                Contact
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-brandSecondaryText">
                If you have questions about this policy or your data, please
                reach out through our{" "}
                <Link
                  href="/contact"
                  className="font-medium text-brightPurple underline-offset-4 hover:underline"
                >
                  contact page
                </Link>{" "}
                or email us at{" "}
                <a
                  href="mailto:privacy@mindora.app"
                  className="font-medium text-brightPurple underline-offset-4 hover:underline"
                >
                  privacy@mindora.app
                </a>
                . We&apos;ll do our best to respond promptly.
              </p>
            </section>

            <div className="rounded-3xl border border-softGold/40 bg-softLavender/60 p-6 md:p-8 shadow-card">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-brightPurple shadow-soft">
                  <Heart className="h-5 w-5 fill-brightPurple/20" />
                </span>
                <div>
                  <h2 className="text-lg font-semibold text-brandText">
                    Mindora is a wellness tool
                  </h2>
                  <p className="mt-2 text-sm md:text-base leading-relaxed text-brandSecondaryText">
                    Mindora supports everyday emotional wellbeing. It is not a
                    substitute for professional medical or mental-health advice,
                    diagnosis, or treatment. If you are in crisis, please
                    contact a local emergency service or a qualified
                    professional.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center pt-2">
              <Button asChild rightIcon={<ArrowRight className="h-4 w-4" />}>
                <Link href="/contact">Contact us</Link>
              </Button>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}

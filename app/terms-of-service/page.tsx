import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | Mindora",
  description:
    "The terms that govern your use of Mindora — your account, acceptable use, subscriptions, content, disclaimers, and more.",
  alternates: {
    canonical: "/terms-of-service",
  },
  openGraph: {
    title: "Terms of Service | Mindora",
    description:
      "The agreement between you and Mindora — accounts, subscriptions, content, and disclaimers.",
    type: "website",
    locale: "en_US",
    siteName: "Mindora",
  },
};

export default function TermsOfServicePage() {
  return (
    <div className="flex-1">
      <section className="relative overflow-hidden pt-24 md:pt-28 pb-16 md:pb-20">
        <div aria-hidden className="absolute inset-0 bg-radial-fade pointer-events-none" />
        <div aria-hidden className="pointer-events-none absolute -top-32 -right-10 h-96 w-96 rounded-full bg-softGold/20 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute top-10 -left-24 h-96 w-96 rounded-full bg-lavender/50 blur-3xl" />

        <div className="container relative">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-softLavender px-4 py-1.5 text-xs md:text-sm font-medium text-primaryPurple tracking-wide mb-6">
              <Scale className="h-3.5 w-3.5 text-brightPurple" />
              The Fine Print
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-brandText leading-[1.1]">
              Terms of{" "}
              <span className="bg-gradient-to-r from-primaryPurple via-brightPurple to-lavender bg-clip-text text-transparent">
                Service
              </span>
            </h1>
            <p className="mt-6 text-base md:text-lg text-brandSecondaryText leading-relaxed">
              These terms explain the agreement between you and Mindora. Please
              read them carefully before using the app.
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
                1. Acceptance of Terms
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-brandSecondaryText">
                By creating an account or using Mindora, you agree to be bound by
                these Terms of Service and our{" "}
                <Link
                  href="/privacy-policy"
                  className="font-medium text-brightPurple underline-offset-4 hover:underline"
                >
                  Privacy Policy
                </Link>
                . If you do not agree with these terms, please do not use the
                service.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-semibold text-brandText">
                2. Eligibility
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-brandSecondaryText">
                Mindora is intended for people aged 16 and older. By using the
                service, you confirm that you meet this requirement and that the
                information you provide is accurate. If you are under the
                required age, you may only use Mindora with the involvement and
                consent of a parent or guardian.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-semibold text-brandText">
                3. Your Account
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-brandSecondaryText">
                Authentication is powered by Firebase Authentication.
              </p>
              <ul className="list-disc space-y-2 pl-6 text-sm md:text-base leading-relaxed text-brandSecondaryText">
                <li>
                  You are responsible for maintaining the confidentiality of
                  your login credentials.
                </li>
                <li>
                  You are responsible for all activity that happens under your
                  account.
                </li>
                <li>
                  Please notify us promptly if you believe your account has been
                  accessed without your permission.
                </li>
                <li>
                  You may not share, sell, or transfer your account to anyone
                  else.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-semibold text-brandText">
                4. Acceptable Use
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-brandSecondaryText">
                You agree to use Mindora lawfully and respectfully. You will not:
              </p>
              <ul className="list-disc space-y-2 pl-6 text-sm md:text-base leading-relaxed text-brandSecondaryText">
                <li>Attempt to access accounts, systems, or data that are not yours.</li>
                <li>Reverse engineer, disrupt, or overload the service.</li>
                <li>Use Mindora to distribute malware or unlawful content.</li>
                <li>Impersonate others or misrepresent your identity.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-semibold text-brandText">
                5. Community Conduct
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-brandSecondaryText">
                Mindora&apos;s community is built on kindness and respect. When
                you post or comment, you agree to follow our{" "}
                <Link
                  href="/community-guidelines"
                  className="font-medium text-brightPurple underline-offset-4 hover:underline"
                >
                  Community Guidelines
                </Link>
                . We may remove content or take action against accounts that
                harm the community.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-semibold text-brandText">
                6. Subscriptions &amp; Billing
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-brandSecondaryText">
                <span className="font-medium text-brandText">a. Plans.</span>{" "}
                Mindora offers an optional Premium subscription on a monthly or
                yearly basis. The features included in Premium are described in
                the app.
              </p>
              <p className="text-sm md:text-base leading-relaxed text-brandSecondaryText">
                <span className="font-medium text-brandText">b. Renewal.</span>{" "}
                Subscriptions renew automatically at the end of each billing
                period unless cancelled before the renewal date.
              </p>
              <p className="text-sm md:text-base leading-relaxed text-brandSecondaryText">
                <span className="font-medium text-brandText">c. Cancellation.</span>{" "}
                You can cancel at any time from your Account settings. You will
                keep access to Premium features until the end of your current
                billing period.
              </p>
              <p className="text-sm md:text-base leading-relaxed text-brandSecondaryText">
                <span className="font-medium text-brandText">d. Refunds.</span>{" "}
                Refund eligibility is governed by the policy of the payment
                provider you used and by applicable law. Billing and payment
                processing are handled by our third-party payment provider, not
                directly by Mindora.
              </p>
              <p className="text-sm md:text-base leading-relaxed text-brandSecondaryText">
                <span className="font-medium text-brandText">
                  e. Prices.
                </span>{" "}
                Prices may change over time. We will notify you before any
                change that affects your subscription.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-semibold text-brandText">
                7. Intellectual Property
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-brandSecondaryText">
                The Mindora name, logo, design, content, and software are owned
                by us or our licensors and are protected by intellectual
                property laws. These terms do not grant you any right to use
                Mindora&apos;s branding or content except as needed to use the
                service.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-semibold text-brandText">
                8. User Content License
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-brandSecondaryText">
                You keep ownership of the content you create, such as posts,
                comments, and notes. By sharing content in the community, you
                grant Mindora a limited, non-exclusive, worldwide, royalty-free
                license to host, display, and distribute that content solely to
                operate and improve the service. You are responsible for
                ensuring you have the right to share what you post.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-semibold text-brandText">
                9. Wellness Disclaimer
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-brandSecondaryText">
                Mindora is a wellness tool and does not provide medical advice,
                diagnosis, or treatment. It is not a substitute for professional
                care. If you are experiencing a crisis or emergency, contact
                your local emergency services or a crisis helpline immediately.
                Always seek the advice of a qualified professional regarding any
                medical or mental-health condition.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-semibold text-brandText">
                10. Disclaimers
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-brandSecondaryText">
                Mindora is provided on an &quot;as is&quot; and &quot;as
                available&quot; basis. We do not warrant that the service will be
                uninterrupted, error-free, or that it will meet your specific
                expectations. Your use of the service is at your own discretion.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-semibold text-brandText">
                11. Limitation of Liability
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-brandSecondaryText">
                To the fullest extent permitted by law, Mindora and its team are
                not liable for any indirect, incidental, special, or
                consequential damages arising from your use of, or inability to
                use, the service.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-semibold text-brandText">
                12. Termination
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-brandSecondaryText">
                You may stop using Mindora and delete your account at any time.
                We may suspend or terminate access if you violate these terms or
                our Community Guidelines, or where required to protect the
                service and its users.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-semibold text-brandText">
                13. Governing Law
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-brandSecondaryText">
                These terms are governed by the laws applicable in the
                jurisdiction in which Mindora operates, without regard to
                conflict-of-law rules. Any disputes will be subject to the
                exclusive jurisdiction of the competent courts in that
                jurisdiction.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-semibold text-brandText">
                14. Changes to Terms
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-brandSecondaryText">
                We may update these terms from time to time. When we do, we will
                revise the &quot;Last updated&quot; date and, where appropriate,
                notify you within the app. Continuing to use Mindora after
                changes take effect means you accept the updated terms.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-semibold text-brandText">
                15. Contact
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-brandSecondaryText">
                Questions about these terms? Reach us through our{" "}
                <Link
                  href="/contact"
                  className="font-medium text-brightPurple underline-offset-4 hover:underline"
                >
                  contact page
                </Link>{" "}
                or email{" "}
                <a
                  href="mailto:support@mindora.app"
                  className="font-medium text-brightPurple underline-offset-4 hover:underline"
                >
                  support@mindora.app
                </a>
                .
              </p>
            </section>

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

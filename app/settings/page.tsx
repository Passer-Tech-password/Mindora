import type { Metadata } from "next";
import {
  User,
  Bell,
  ShieldCheck,
  Palette,
  Mail,
  Globe,
  Smartphone,
  Eye,
  Users,
  Trash2,
  Download,
  Moon,
  Sun,
  Type,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Settings | Mindora",
  description:
    "Manage your Mindora settings. Adjust account details, notifications, privacy, and appearance preferences.",
  alternates: {
    canonical: "/settings",
  },
  openGraph: {
    title: "Settings | Mindora",
    description:
      "Customize your Mindora experience: notifications, privacy, theme, and account settings.",
    type: "website",
    locale: "en_US",
    siteName: "Mindora",
  },
};

function SectionIcon({ icon: Icon }: { icon: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-softLavender to-lavender/60 text-primaryPurple">
      <Icon className="h-6 w-6" />
    </div>
  );
}

function Toggle({ defaultChecked = false, label }: { defaultChecked?: boolean; label: string }) {
  return (
    <label className="flex items-center justify-between cursor-pointer gap-4 w-full">
      <span className="text-sm md:text-[15px] text-brandText/85">{label}</span>
      <span className="relative inline-flex h-7 w-12 items-center shrink-0">
        <input
          type="checkbox"
          defaultChecked={defaultChecked}
          className="peer sr-only"
        />
        <span className="peer-checked:bg-brightPurple peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-brightPurple/30 h-7 w-12 rounded-full bg-lavender/60 transition-colors cursor-pointer" />
        <span className="peer-checked:translate-x-6 left-0.5 top-0.5 h-6 w-6 translate-x-0 rounded-full bg-white shadow-soft transition-transform" />
      </span>
    </label>
  );
}

export default function SettingsPage() {
  return (
    <div className="container py-10 md:py-14">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-brandText mb-3">
          Settings
        </h1>
        <p className="text-base text-brandSecondaryText mb-10">
          Customize Mindora to feel exactly like yours.
        </p>

        <div className="space-y-6 md:space-y-8">
          <section className="rounded-3xl bg-white border border-softLavender/70 p-6 md:p-8 shadow-card">
            <div className="flex items-start gap-4 md:gap-5 mb-7">
              <SectionIcon icon={User} />
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-brandText tracking-tight">
                  Account
                </h2>
                <p className="mt-1.5 text-sm text-brandSecondaryText">
                  Manage your account details and subscription.
                </p>
              </div>
            </div>

            <div className="space-y-5 md:space-y-6 pl-0 md:pl-[68px]">
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label
                    htmlFor="displayName"
                    className="block text-sm font-medium text-brandText"
                  >
                    Display name
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-brandSecondaryText">
                      <User className="h-5 w-5" aria-hidden />
                    </span>
                    <input
                      id="displayName"
                      name="displayName"
                      type="text"
                      defaultValue="Alex Taylor"
                      className="block w-full h-12 rounded-2xl border border-lavender/50 bg-softLavender/40 pl-12 pr-4 text-brandText placeholder:text-brandSecondaryText/60 focus:border-brightPurple focus:outline-none focus:ring-2 focus:ring-brightPurple/20 transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="accountEmail"
                    className="block text-sm font-medium text-brandText"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-brandSecondaryText">
                      <Mail className="h-5 w-5" aria-hidden />
                    </span>
                    <input
                      id="accountEmail"
                      name="accountEmail"
                      type="email"
                      defaultValue="alex.taylor@example.com"
                      className="block w-full h-12 rounded-2xl border border-lavender/50 bg-softLavender/40 pl-12 pr-4 text-brandText placeholder:text-brandSecondaryText/60 focus:border-brightPurple focus:outline-none focus:ring-2 focus:ring-brightPurple/20 transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="timezone"
                  className="block text-sm font-medium text-brandText"
                >
                  Timezone
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-brandSecondaryText">
                    <Globe className="h-5 w-5" aria-hidden />
                  </span>
                  <select
                    id="timezone"
                    name="timezone"
                    defaultValue="America/Los_Angeles"
                    className="block w-full h-12 rounded-2xl border border-lavender/50 bg-softLavender/40 pl-12 pr-10 text-brandText focus:border-brightPurple focus:outline-none focus:ring-2 focus:ring-brightPurple/20 transition-all appearance-none cursor-pointer"
                  >
                    <option value="America/Los_Angeles">Pacific Time (PT)</option>
                    <option value="America/New_York">Eastern Time (ET)</option>
                    <option value="Europe/London">London (GMT)</option>
                    <option value="Asia/Tokyo">Tokyo (JST)</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 grid sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  className="inline-flex items-center justify-center h-12 px-6 rounded-2xl border border-lavender/50 bg-white text-brandText hover:bg-softLavender transition-all text-sm font-medium gap-2"
                >
                  <Download className="h-4 w-4" />
                  Export my data
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center h-12 px-6 rounded-2xl border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 transition-all text-sm font-medium gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete account
                </button>
              </div>
            </div>
          </section>

          <section className="rounded-3xl bg-white border border-softLavender/70 p-6 md:p-8 shadow-card">
            <div className="flex items-start gap-4 md:gap-5 mb-7">
              <SectionIcon icon={Bell} />
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-brandText tracking-tight">
                  Notifications
                </h2>
                <p className="mt-1.5 text-sm text-brandSecondaryText">
                  Choose how and when Mindora gently reminds you.
                </p>
              </div>
            </div>

            <div className="space-y-4 pl-0 md:pl-[68px]">
              <div className="rounded-2xl border border-lavender/40 bg-softLavender/40 p-4 md:p-5">
                <Toggle defaultChecked label="Daily check-in reminders" />
                <p className="mt-3 pl-0 text-xs text-brandSecondaryText">
                  A gentle nudge at your preferred time to log your mood.
                </p>
              </div>

              <div className="rounded-2xl border border-lavender/40 bg-softLavender/40 p-4 md:p-5">
                <Toggle defaultChecked label="Evening wind-down reminder" />
                <p className="mt-3 pl-0 text-xs text-brandSecondaryText">
                  A calm audio suggestion to help you end the day.
                </p>
              </div>

              <div className="rounded-2xl border border-lavender/40 bg-softLavender/40 p-4 md:p-5">
                <Toggle label="Community replies & likes" />
              </div>

              <div className="rounded-2xl border border-lavender/40 bg-softLavender/40 p-4 md:p-5">
                <Toggle defaultChecked label="Product tips and updates" />
              </div>

              <div className="space-y-2 pt-2">
                <label className="block text-sm font-medium text-brandText">
                  Daily reminder time
                </label>
                <div className="relative max-w-xs">
                  <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-brandSecondaryText">
                    <Smartphone className="h-5 w-5" aria-hidden />
                  </span>
                  <input
                    type="time"
                    defaultValue="08:30"
                    className="block w-full h-12 rounded-2xl border border-lavender/50 bg-softLavender/40 pl-12 pr-4 text-brandText focus:border-brightPurple focus:outline-none focus:ring-2 focus:ring-brightPurple/20 transition-all"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-3xl bg-white border border-softLavender/70 p-6 md:p-8 shadow-card">
            <div className="flex items-start gap-4 md:gap-5 mb-7">
              <SectionIcon icon={ShieldCheck} />
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-brandText tracking-tight">
                  Privacy
                </h2>
                <p className="mt-1.5 text-sm text-brandSecondaryText">
                  Your mind is safe here. Control what&apos;s visible.
                </p>
              </div>
            </div>

            <div className="space-y-4 pl-0 md:pl-[68px]">
              <div className="rounded-2xl border border-lavender/40 bg-softLavender/40 p-4 md:p-5">
                <Toggle defaultChecked label="Posts private by default" />
              </div>
              <div className="rounded-2xl border border-lavender/40 bg-softLavender/40 p-4 md:p-5">
                <Toggle label="Show profile in community directory" />
                <p className="mt-3 pl-0 text-xs text-brandSecondaryText">
                  Let other kind members find and encourage you.
                </p>
              </div>
              <div className="rounded-2xl border border-lavender/40 bg-softLavender/40 p-4 md:p-5">
                <Toggle defaultChecked label="Share streak badge on posts" />
              </div>
              <div className="space-y-2 pt-2">
                <label className="block text-sm font-medium text-brandText">
                  Default post visibility
                </label>
                <div className="relative max-w-sm">
                  <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-brandSecondaryText">
                    <Eye className="h-5 w-5" aria-hidden />
                  </span>
                  <select
                    defaultValue="anonymous"
                    className="block w-full h-12 rounded-2xl border border-lavender/50 bg-softLavender/40 pl-12 pr-10 text-brandText focus:border-brightPurple focus:outline-none focus:ring-2 focus:ring-brightPurple/20 transition-all appearance-none cursor-pointer"
                  >
                    <option value="anonymous">Anonymous (recommended)</option>
                    <option value="friends">Friends only</option>
                    <option value="public">Public</option>
                  </select>
                </div>
              </div>
              <div className="rounded-2xl border border-lavender/40 bg-softLavender/40 p-4 md:p-5">
                <Toggle label="Allow friend requests" />
              </div>
            </div>
          </section>

          <section className="rounded-3xl bg-white border border-softLavender/70 p-6 md:p-8 shadow-card">
            <div className="flex items-start gap-4 md:gap-5 mb-7">
              <SectionIcon icon={Palette} />
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-brandText tracking-tight">
                  Appearance
                </h2>
                <p className="mt-1.5 text-sm text-brandSecondaryText">
                  Make Mindora feel soft, calm, and yours.
                </p>
              </div>
            </div>

            <div className="space-y-5 md:space-y-6 pl-0 md:pl-[68px]">
              <div className="space-y-3">
                <label className="block text-sm font-medium text-brandText">
                  Theme
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    {
                      id: "light",
                      label: "Light",
                      icon: Sun,
                      active: true,
                    },
                    {
                      id: "dark",
                      label: "Dark",
                      icon: Moon,
                      active: false,
                    },
                    {
                      id: "system",
                      label: "System",
                      icon: Smartphone,
                      active: false,
                    },
                  ].map((opt) => {
                    const Icon = opt.icon;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        className={`flex flex-col items-center justify-center gap-2 h-24 rounded-2xl border transition-all ${
                          opt.active
                            ? "border-brightPurple bg-brightPurple/10 shadow-glow"
                            : "border-lavender/50 bg-softLavender/40 hover:bg-lavender/30"
                        }`}
                      >
                        <Icon
                          className={`h-5 w-5 ${
                            opt.active ? "text-brightPurple" : "text-brandSecondaryText"
                          }`}
                        />
                        <span
                          className={`text-xs font-medium ${
                            opt.active ? "text-brightPurple" : "text-brandSecondaryText"
                          }`}
                        >
                          {opt.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium text-brandText">
                  Accent color
                </label>
                <div className="flex flex-wrap gap-3">
                  {[
                    "#6D3FE8",
                    "#D9B86C",
                    "#B9A5E8",
                    "#5B3FA8",
                    "#24143D",
                  ].map((color) => (
                    <button
                      key={color}
                      type="button"
                      className={`h-11 w-11 rounded-2xl border-4 transition-all ${
                        color === "#6D3FE8"
                          ? "border-lavender shadow-glow scale-105"
                          : "border-white/60 hover:scale-105"
                      }`}
                      style={{ backgroundColor: color }}
                      aria-label={`Accent color ${color}`}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-1">
                <label className="block text-sm font-medium text-brandText">
                  Font size
                </label>
                <div className="relative max-w-md">
                  <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-brandSecondaryText">
                    <Type className="h-5 w-5" aria-hidden />
                  </span>
                  <select
                    defaultValue="medium"
                    className="block w-full h-12 rounded-2xl border border-lavender/50 bg-softLavender/40 pl-12 pr-10 text-brandText focus:border-brightPurple focus:outline-none focus:ring-2 focus:ring-brightPurple/20 transition-all appearance-none cursor-pointer"
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium (recommended)</option>
                    <option value="large">Large</option>
                    <option value="xlarge">Extra large</option>
                  </select>
                </div>
              </div>

              <div className="rounded-2xl border border-lavender/40 bg-softLavender/40 p-4 md:p-5">
                <Toggle defaultChecked label="Reduced motion" />
                <p className="mt-3 pl-0 text-xs text-brandSecondaryText">
                  Lessens animations for a calmer visual experience.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

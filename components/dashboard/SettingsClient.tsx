"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { useAuth, type UserSettings } from "@/components/auth/AuthContext";
import {
  User,
  Bell,
  ShieldCheck,
  Mail,
  Globe,
  Smartphone,
  Eye,
  Trash2,
  Download,
  Loader2,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

const FALLBACK_TIMEZONES = [
  "Africa/Lagos",
  "Africa/Cairo",
  "Africa/Johannesburg",
  "America/Los_Angeles",
  "America/Denver",
  "America/Chicago",
  "America/New_York",
  "America/Sao_Paulo",
  "Asia/Dubai",
  "Asia/Kolkata",
  "Asia/Singapore",
  "Asia/Tokyo",
  "Australia/Sydney",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "Europe/Madrid",
  "UTC",
];

function getTimezoneOptions(): string[] {
  try {
    const supported = (
      Intl as unknown as { supportedValuesOf?: (key: string) => string[] }
    ).supportedValuesOf;
    if (typeof supported === "function") {
      const zones = supported("timeZone");
      if (Array.isArray(zones) && zones.length > 0) return zones;
    }
  } catch {
    /* fall through to the static list */
  }
  return FALLBACK_TIMEZONES;
}

function defaultSettings(): UserSettings {
  let timezone = "UTC";
  try {
    timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  } catch {
    /* keep UTC */
  }
  return {
    timezone,
    notifications: {
      dailyCheckIn: true,
      eveningWindDown: true,
      communityReplies: false,
      productUpdates: true,
      reminderTime: "08:30",
    },
    privacy: {
      postsPrivate: true,
      showInDirectory: false,
      shareStreakBadge: true,
      defaultVisibility: "anonymous",
      allowFriendRequests: false,
    },
  };
}

function SectionIcon({
  icon: Icon,
}: {
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-softLavender to-lavender/60 text-primaryPurple">
      <Icon className="h-6 w-6" />
    </div>
  );
}

function Toggle({
  id,
  checked,
  onChange,
  label,
  disabled = false,
}: {
  id: string;
  checked: boolean;
  onChange: (next: boolean) => void;
  label: string;
  disabled?: boolean;
}) {
  return (
    <label
      htmlFor={id}
      className="flex items-center justify-between cursor-pointer gap-4 w-full"
    >
      <span className="text-sm md:text-[15px] text-brandText/85">{label}</span>
      <span className="relative inline-flex h-7 w-12 items-center shrink-0">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
          className="peer sr-only"
        />
        <span className="peer-checked:bg-brightPurple peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-brightPurple/30 h-7 w-12 rounded-full bg-lavender/60 transition-colors cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-60" />
        <span className="peer-checked:translate-x-6 left-0.5 top-0.5 h-6 w-6 translate-x-0 rounded-full bg-white shadow-soft transition-transform" />
      </span>
    </label>
  );
}

const fieldClass =
  "block w-full h-12 rounded-2xl border border-lavender/50 bg-softLavender/40 pl-12 pr-4 text-brandText placeholder:text-brandSecondaryText/60 focus:border-brightPurple focus:outline-none focus:ring-2 focus:ring-brightPurple/20 transition-all disabled:opacity-70";

export function SettingsClient() {
  const router = useRouter();
  const {
    user,
    getSettings,
    updateSettings,
    updateDisplayName,
    getMoodHistory,
    getSavedItems,
    deleteAccount,
  } = useAuth();

  const [settings, setSettings] = React.useState<UserSettings | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [loadError, setLoadError] = React.useState<string | null>(null);
  const [saving, setSaving] = React.useState(false);
  const [saveError, setSaveError] = React.useState<string | null>(null);
  const [notice, setNotice] = React.useState<string | null>(null);

  const [displayName, setDisplayName] = React.useState("");
  const [exporting, setExporting] = React.useState(false);
  const [confirmingDelete, setConfirmingDelete] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);

  const timezoneOptions = React.useMemo(getTimezoneOptions, []);

  React.useEffect(() => {
    if (user) setDisplayName(user.fullName || user.email);
  }, [user]);

  const load = React.useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const loaded = await getSettings();
      setSettings(loaded);
    } catch (err) {
      setLoadError(
        err instanceof Error
          ? err.message
          : "We couldn't load your settings right now."
      );
      setSettings(null);
    } finally {
      setLoading(false);
    }
  }, [getSettings]);

  React.useEffect(() => {
    void load();
  }, [load]);

  const onSave = async () => {
    if (!settings) return;
    setSaveError(null);
    setNotice(null);
    setSaving(true);
    try {
      const trimmedName = displayName.trim();
      if (trimmedName && trimmedName !== (user?.fullName ?? "")) {
        await updateDisplayName(trimmedName);
      }
      const saved = await updateSettings(settings);
      setSettings(saved);
      setNotice("Your settings have been saved.");
    } catch (err) {
      setSaveError(
        err instanceof Error
          ? err.message
          : "We couldn't save your settings right now."
      );
    } finally {
      setSaving(false);
    }
  };

  const onExport = async () => {
    if (!user) return;
    setSaveError(null);
    setNotice(null);
    setExporting(true);
    try {
      const [moods, saves] = await Promise.all([
        getMoodHistory({ limit: 500 }).catch(() => []),
        getSavedItems({ limit: 500 }).catch(() => []),
      ]);
      const payload = {
        exportedAt: new Date().toISOString(),
        account: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          plan: user.plan,
          createdAt: user.createdAt,
        },
        settings,
        moodHistory: moods,
        savedItems: saves,
      };
      const blob = new Blob([JSON.stringify(payload, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `mindora-export-${new Date()
        .toISOString()
        .slice(0, 10)}.json`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      setNotice("Your data export has been downloaded.");
    } catch (err) {
      setSaveError(
        err instanceof Error
          ? err.message
          : "We couldn't prepare your data export right now."
      );
    } finally {
      setExporting(false);
    }
  };

  const onDelete = async () => {
    setSaveError(null);
    setNotice(null);
    setDeleting(true);
    try {
      await deleteAccount();
      router.push("/");
    } catch (err) {
      setSaveError(
        err instanceof Error
          ? err.message
          : "We couldn't delete your account right now."
      );
      setDeleting(false);
      setConfirmingDelete(false);
    }
  };

  const patchNotifications = (patch: Partial<UserSettings["notifications"]>) =>
    setSettings((prev) =>
      prev ? { ...prev, notifications: { ...prev.notifications, ...patch } } : prev
    );

  const patchPrivacy = (patch: Partial<UserSettings["privacy"]>) =>
    setSettings((prev) =>
      prev ? { ...prev, privacy: { ...prev.privacy, ...patch } } : prev
    );

  return (
    <DashboardShell
      title="Settings"
      subtitle="Customize Mindora to feel exactly like yours"
    >
      <div className="max-w-4xl">
        {(saveError || notice) && (
          <div
            role={saveError ? "alert" : "status"}
            aria-live="polite"
            className={`mb-6 flex items-start gap-3 rounded-2xl border px-5 py-4 text-sm ${
              saveError
                ? "border-red-200 bg-red-50 text-red-700"
                : "border-emerald-200 bg-emerald-50 text-emerald-700"
            }`}
          >
            {saveError ? (
              <AlertCircle className="h-5 w-5 shrink-0" aria-hidden />
            ) : (
              <CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden />
            )}
            <span>{saveError ?? notice}</span>
          </div>
        )}

        {loading ? (
          <div className="rounded-3xl bg-white border border-softLavender/70 p-10 shadow-card flex flex-col items-center gap-4 text-center">
            <Loader2 className="h-8 w-8 text-brightPurple animate-spin" />
            <p className="text-sm text-brandSecondaryText">
              Loading your settings…
            </p>
          </div>
        ) : loadError ? (
          <div className="rounded-3xl bg-white border border-softLavender/70 p-10 shadow-card flex flex-col items-center gap-4 text-center">
            <div className="h-14 w-14 rounded-2xl bg-red-50 flex items-center justify-center">
              <AlertCircle className="h-7 w-7 text-red-500" aria-hidden />
            </div>
            <h2 className="text-xl font-semibold text-brandText">
              Settings are unavailable
            </h2>
            <p className="text-sm text-brandSecondaryText max-w-md">
              {loadError}
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => void load()}
              leftIcon={<RefreshCw className="h-4 w-4" />}
            >
              Try again
            </Button>
          </div>
        ) : settings ? (
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
                        autoComplete="name"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className={fieldClass}
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
                        value={user?.email ?? ""}
                        readOnly
                        disabled
                        className={fieldClass}
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
                      value={settings.timezone}
                      onChange={(e) =>
                        setSettings({ ...settings, timezone: e.target.value })
                      }
                      className={`${fieldClass} pr-10 appearance-none cursor-pointer`}
                    >
                      {!timezoneOptions.includes(settings.timezone) && (
                        <option value={settings.timezone}>
                          {settings.timezone}
                        </option>
                      )}
                      {timezoneOptions.map((zone) => (
                        <option key={zone} value={zone}>
                          {zone.replace(/_/g, " ")}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="pt-3 grid sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => void onExport()}
                    disabled={exporting}
                    className="inline-flex items-center justify-center h-12 px-6 rounded-2xl border border-lavender/50 bg-white text-brandText hover:bg-softLavender transition-all text-sm font-medium gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {exporting ? (
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                    ) : (
                      <Download className="h-4 w-4" aria-hidden />
                    )}
                    Export my data
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setNotice(null);
                      setSaveError(null);
                      setConfirmingDelete(true);
                    }}
                    className="inline-flex items-center justify-center h-12 px-6 rounded-2xl border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 transition-all text-sm font-medium gap-2"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden />
                    Delete account
                  </button>
                </div>

                {confirmingDelete && (
                  <div
                    role="alertdialog"
                    aria-labelledby="delete-account-title"
                    className="rounded-2xl border border-red-200 bg-red-50 p-5"
                  >
                    <h3
                      id="delete-account-title"
                      className="text-sm font-semibold text-red-700"
                    >
                      Delete your Mindora account?
                    </h3>
                    <p className="mt-2 text-xs text-red-600/90 leading-relaxed">
                      This permanently removes your profile, mood history, saved
                      content and community activity. This action cannot be
                      undone.
                    </p>
                    <div className="mt-4 flex flex-col sm:flex-row gap-3">
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => void onDelete()}
                        loading={deleting}
                        className="bg-red-600 text-white hover:bg-red-700 border border-transparent"
                      >
                        Yes, delete my account
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => setConfirmingDelete(false)}
                        disabled={deleting}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
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
                  <Toggle
                    id="notif-daily"
                    checked={settings.notifications.dailyCheckIn}
                    onChange={(v) => patchNotifications({ dailyCheckIn: v })}
                    label="Daily check-in reminders"
                  />
                  <p className="mt-3 pl-0 text-xs text-brandSecondaryText">
                    A gentle nudge at your preferred time to log your mood.
                  </p>
                </div>

                <div className="rounded-2xl border border-lavender/40 bg-softLavender/40 p-4 md:p-5">
                  <Toggle
                    id="notif-evening"
                    checked={settings.notifications.eveningWindDown}
                    onChange={(v) => patchNotifications({ eveningWindDown: v })}
                    label="Evening wind-down reminder"
                  />
                  <p className="mt-3 pl-0 text-xs text-brandSecondaryText">
                    A calm audio suggestion to help you end the day.
                  </p>
                </div>

                <div className="rounded-2xl border border-lavender/40 bg-softLavender/40 p-4 md:p-5">
                  <Toggle
                    id="notif-community"
                    checked={settings.notifications.communityReplies}
                    onChange={(v) => patchNotifications({ communityReplies: v })}
                    label="Community replies & likes"
                  />
                </div>

                <div className="rounded-2xl border border-lavender/40 bg-softLavender/40 p-4 md:p-5">
                  <Toggle
                    id="notif-product"
                    checked={settings.notifications.productUpdates}
                    onChange={(v) => patchNotifications({ productUpdates: v })}
                    label="Product tips and updates"
                  />
                </div>

                <div className="space-y-2 pt-2">
                  <label
                    htmlFor="reminderTime"
                    className="block text-sm font-medium text-brandText"
                  >
                    Daily reminder time
                  </label>
                  <div className="relative max-w-xs">
                    <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-brandSecondaryText">
                      <Smartphone className="h-5 w-5" aria-hidden />
                    </span>
                    <input
                      id="reminderTime"
                      type="time"
                      value={settings.notifications.reminderTime}
                      onChange={(e) =>
                        patchNotifications({ reminderTime: e.target.value })
                      }
                      className={fieldClass}
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
                  <Toggle
                    id="privacy-posts"
                    checked={settings.privacy.postsPrivate}
                    onChange={(v) => patchPrivacy({ postsPrivate: v })}
                    label="Posts private by default"
                  />
                </div>
                <div className="rounded-2xl border border-lavender/40 bg-softLavender/40 p-4 md:p-5">
                  <Toggle
                    id="privacy-directory"
                    checked={settings.privacy.showInDirectory}
                    onChange={(v) => patchPrivacy({ showInDirectory: v })}
                    label="Show profile in community directory"
                  />
                  <p className="mt-3 pl-0 text-xs text-brandSecondaryText">
                    Let other kind members find and encourage you.
                  </p>
                </div>
                <div className="rounded-2xl border border-lavender/40 bg-softLavender/40 p-4 md:p-5">
                  <Toggle
                    id="privacy-streak"
                    checked={settings.privacy.shareStreakBadge}
                    onChange={(v) => patchPrivacy({ shareStreakBadge: v })}
                    label="Share streak badge on posts"
                  />
                </div>
                <div className="space-y-2 pt-2">
                  <label
                    htmlFor="defaultVisibility"
                    className="block text-sm font-medium text-brandText"
                  >
                    Default post visibility
                  </label>
                  <div className="relative max-w-sm">
                    <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-brandSecondaryText">
                      <Eye className="h-5 w-5" aria-hidden />
                    </span>
                    <select
                      id="defaultVisibility"
                      value={settings.privacy.defaultVisibility}
                      onChange={(e) =>
                        patchPrivacy({
                          defaultVisibility: e.target
                            .value as UserSettings["privacy"]["defaultVisibility"],
                        })
                      }
                      className={`${fieldClass} pr-10 appearance-none cursor-pointer`}
                    >
                      <option value="anonymous">Anonymous (recommended)</option>
                      <option value="friends">Friends only</option>
                      <option value="public">Public</option>
                    </select>
                  </div>
                </div>
                <div className="rounded-2xl border border-lavender/40 bg-softLavender/40 p-4 md:p-5">
                  <Toggle
                    id="privacy-friends"
                    checked={settings.privacy.allowFriendRequests}
                    onChange={(v) => patchPrivacy({ allowFriendRequests: v })}
                    label="Allow friend requests"
                  />
                </div>
              </div>
            </section>

            <div className="sticky bottom-4 flex justify-end">
              <Button
                type="button"
                onClick={() => void onSave()}
                loading={saving}
                className="shadow-glow"
              >
                Save changes
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </DashboardShell>
  );
}

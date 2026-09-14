"use client";

import * as React from "react";
import {
  LayoutDashboard,
  Users,
  MessageSquareText,
  MessagesSquare,
  FileBarChart,
  Sparkles,
  Music,
  Trophy,
  CreditCard,
  Newspaper,
  Settings,
  LogOut,
  Flower2,
  Search,
  Bell,
  ChevronDown,
  Calendar,
  ArrowRight,
  TrendingUp,
  Plus,
  Heart,
  Upload,
  Filter,
  MoreHorizontal,
  UserPlus,
  MessageCircle,
  Crown,
  AlertTriangle,
  MessageSquare,
  CheckCircle2,
  User,
  Crown as CrownIcon,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAuth, AdminStats, ADMIN_EMAIL_LOGIN_HINT } from "@/components/auth/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

type ActiveSection =
  | "Dashboard"
  | "Users"
  | "Posts"
  | "Comments"
  | "Reports"
  | "Affirmations"
  | "Audio"
  | "Challenges"
  | "Subscriptions"
  | "Content"
  | "Settings";

const ADMIN_SIDEBAR: { section: ActiveSection; Icon: typeof Users; sectionLabel: string; group?: "ADMIN PANEL" | "SETTINGS" }[] = [
  { section: "Dashboard", Icon: LayoutDashboard, sectionLabel: "Dashboard", group: "ADMIN PANEL" },
  { section: "Users", Icon: Users, sectionLabel: "Users" },
  { section: "Posts", Icon: MessageSquareText, sectionLabel: "Community Posts" },
  { section: "Comments", Icon: MessagesSquare, sectionLabel: "Comments" },
  { section: "Reports", Icon: FileBarChart, sectionLabel: "Reports" },
  { section: "Affirmations", Icon: Sparkles, sectionLabel: "Affirmations" },
  { section: "Audio", Icon: Music, sectionLabel: "Audio Library" },
  { section: "Challenges", Icon: Trophy, sectionLabel: "Challenges" },
  { section: "Subscriptions", Icon: CreditCard, sectionLabel: "Subscriptions" },
  { section: "Content", Icon: Newspaper, sectionLabel: "Website Content" },
  { section: "Settings", Icon: Settings, sectionLabel: "Admin Settings", group: "SETTINGS" },
];

const RANGE_TABS = ["7D", "30D", "90D", "1Y"] as const;
type RangeTab = (typeof RANGE_TABS)[number];

function fmtNum(n: number) {
  return n.toLocaleString();
}

/* ----------------- CHART: user growth line ----------------- */
function UserGrowthChart({ data }: { data: number[] }) {
  const W = 640;
  const H = 220;
  const pad = { l: 36, r: 12, t: 28, b: 28 };
  const max = Math.max(...data) * 1.1;
  const min = 0;
  const xStep = (W - pad.l - pad.r) / (data.length - 1);
  const points = data.map((v, i) => {
    const x = pad.l + i * xStep;
    const y = pad.t + (H - pad.t - pad.b) * (1 - (v - min) / (max - min));
    return { x, y, v };
  });
  const path = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
    .join(" ");
  const area =
    path +
    ` L ${points[points.length - 1].x.toFixed(2)} ${H - pad.b} L ${points[0].x.toFixed(2)} ${H - pad.b} Z`;
  const last = points[points.length - 1];
  const yTicks = [0, 2000, 4000, 6000, 8000];
  const xLabels = ["Aug 1", "Aug 5", "Aug 10", "Aug 15", "Aug 20", "Aug 25", "Aug 30"];
  const xTickEvery = Math.floor(data.length / 6);
  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-[220px] min-w-[520px]">
        <defs>
          <linearGradient id="ug-area" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#6D3FE8" stopOpacity="0.26" />
            <stop offset="100%" stopColor="#6D3FE8" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="ug-line" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#5B3FA8" />
            <stop offset="100%" stopColor="#6D3FE8" />
          </linearGradient>
        </defs>
        {yTicks.map((t) => {
          const y = pad.t + (H - pad.t - pad.b) * (1 - (t - min) / (max - min));
          return (
            <g key={t}>
              <line x1={pad.l} x2={W - pad.r} y1={y} y2={y} stroke="#EFEBFF" strokeDasharray="4 4" />
              <text x={pad.l - 8} y={y + 4} textAnchor="end" fontSize="11" fill="#8F84A8">
                {t === 0 ? "0" : `${t / 1000}k`}
              </text>
            </g>
          );
        })}
        {xLabels.map((lab, i) => {
          const x = pad.l + i * xTickEvery * xStep;
          const y = H - 10;
          return (
            <text key={lab} x={x} y={y} fontSize="11" fill="#8F84A8" textAnchor="middle">
              {lab}
            </text>
          );
        })}
        <path d={area} fill="url(#ug-area)" />
        <path d={path} stroke="url(#ug-line)" strokeWidth={2.5} fill="none" strokeLinejoin="round" strokeLinecap="round" />
        <g>
          <rect
            x={last.x - 32}
            y={last.y - 46}
            width={64}
            height={32}
            rx={10}
            fill="#24143D"
          />
          <polygon points={`${last.x - 4},${last.y - 14} ${last.x + 4},${last.y - 14} ${last.x},${last.y - 8}`} fill="#24143D" />
          <text x={last.x} y={last.y - 28} textAnchor="middle" fontSize="11" fontWeight={700} fill="#fff">
            {fmtNum(last.v)} Users
          </text>
        </g>
        <circle cx={last.x} cy={last.y} r={5} fill="#fff" stroke="#6D3FE8" strokeWidth={2.5} />
      </svg>
    </div>
  );
}

/* ----------------- CHART: content distribution donut ----------------- */
function ContentDistribution({ data }: { data: AdminStats["contentDistribution"] }) {
  const total = data.reduce((s, d) => s + d.percent, 0);
  const R = 70;
  const R_INNER = 46;
  const CX = 90;
  const CY = 90;
  let acc = 0;
  const arcs = data.map((seg) => {
    const startAngle = (acc / total) * Math.PI * 2 - Math.PI / 2;
    acc += seg.percent;
    const endAngle = (acc / total) * Math.PI * 2 - Math.PI / 2;
    const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;
    const x1 = CX + R * Math.cos(startAngle);
    const y1 = CY + R * Math.sin(startAngle);
    const x2 = CX + R * Math.cos(endAngle);
    const y2 = CY + R * Math.sin(endAngle);
    const xi2 = CX + R_INNER * Math.cos(endAngle);
    const yi2 = CY + R_INNER * Math.sin(endAngle);
    const xi1 = CX + R_INNER * Math.cos(startAngle);
    const yi1 = CY + R_INNER * Math.sin(startAngle);
    const d = `M ${x1} ${y1} A ${R} ${R} 0 ${largeArc} 1 ${x2} ${y2} L ${xi2} ${yi2} A ${R_INNER} ${R_INNER} 0 ${largeArc} 0 ${xi1} ${yi1} Z`;
    return { ...seg, d };
  });
  return (
    <div className="flex flex-col sm:flex-row items-center gap-6">
      <div className="relative shrink-0">
        <svg width="180" height="180" viewBox="0 0 180 180">
          {arcs.map((a) => (
            <path key={a.label} d={a.d} fill={a.color} />
          ))}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
          <div className="text-2xl font-bold text-brandText">{fmtNum(3456)}</div>
          <div className="text-xs text-brandText/60">Total Posts</div>
        </div>
      </div>
      <ul className="flex-1 w-full space-y-2.5">
        {data.map((seg) => (
          <li key={seg.label} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2.5">
              <span className="h-3.5 w-3.5 rounded-full shrink-0" style={{ background: seg.color }} />
              <span className="text-brandText/80">{seg.label}</span>
            </div>
            <span className="font-semibold text-brandText">{seg.percent}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ----------------- Stat Cards ----------------- */
function StatCard({
  Icon,
  tone,
  title,
  value,
  delta,
  vsLabel,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  tone: string;
  title: string;
  value: string;
  delta: number;
  vsLabel: string;
}) {
  return (
    <div className="rounded-2xl border border-softLavender bg-offWhite p-5 shadow-soft">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className="h-11 w-11 rounded-2xl flex items-center justify-center"
            style={{ background: tone + "22", color: tone }}
          >
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <div className="text-sm font-semibold text-brandText">{title}</div>
          </div>
        </div>
      </div>
      <div className="mt-4 text-3xl font-bold text-brandText">{value}</div>
      <div className="mt-2 flex items-center gap-2 text-xs">
        <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold bg-emerald-50 rounded-full px-2 py-0.5">
          <TrendingUp className="h-3.5 w-3.5" />
          {delta}%
        </span>
        <span className="text-brandText/60">{vsLabel}</span>
      </div>
    </div>
  );
}

/* ----------------- Activity icon ----------------- */
function ActivityIconTone({ icon, tone }: { icon: AdminStats["recentActivity"][number]["icon"]; tone: AdminStats["recentActivity"][number]["tone"] }) {
  const map = {
    purple: { bg: "#EDE9FE", c: "#6D3FE8", I: UserPlus },
    blue: { bg: "#DBEAFE", c: "#3B82F6", I: MessageSquare },
    gold: { bg: "#FFF6E0", c: "#D9B86C", I: CrownIcon },
    red: { bg: "#FEE2E2", c: "#EF4444", I: AlertTriangle },
    indigo: { bg: "#E0E7FF", c: "#4F46E5", I: MessageCircle },
  } as const;
  const cfg = map[tone];
  const I = cfg.I;
  return (
    <div className="h-9 w-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: cfg.bg }}>
      <I className="h-4 w-4" style={{ color: cfg.c }} />
    </div>
  );
}

/* ----------------- Modal ----------------- */
function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brandText/40 backdrop-blur-sm">
      <div className="bg-offWhite rounded-3xl shadow-card w-full max-w-md border border-softLavender">
        <div className="flex items-center justify-between p-5 border-b border-softLavender">
          <h3 className="text-lg font-bold text-brandText">{title}</h3>
          <button type="button" onClick={onClose} aria-label="Close modal" className="h-9 w-9 rounded-xl hover:bg-softLavender flex items-center justify-center">
            <MoreHorizontal className="h-5 w-5 rotate-90 text-brandText/60" aria-hidden="true" />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

/* ==============================================================
 *                        AdminClient
 * ============================================================== */

export function AdminClient() {
  const { user, logout, getAdminStats, addAffirmation, uploadAudio, createChallenge, reviewReport, deleteAffirmation } = useAuth();
  const router = useRouter();
  const [active, setActive] = React.useState<ActiveSection>("Dashboard");
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [range, setRange] = React.useState<RangeTab>("30D");
  const [searchQuery, setSearchQuery] = React.useState("");

  const [stats, setStats] = React.useState<AdminStats | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const [affModal, setAffModal] = React.useState(false);
  const [audioModal, setAudioModal] = React.useState(false);
  const [challengeModal, setChallengeModal] = React.useState(false);
  const [confirmToast, setConfirmToast] = React.useState<string | null>(null);
  const [reviewedReports, setReviewedReports] = React.useState<Record<string, "Reviewed" | "Resolved">>({});

  const fetchStats = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const s = await getAdminStats();
      setStats(s);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load admin dashboard.");
    } finally {
      setLoading(false);
    }
  }, [getAdminStats]);

  React.useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  React.useEffect(() => {
    if (!confirmToast) return;
    const t = setTimeout(() => setConfirmToast(null), 2600);
    return () => clearTimeout(t);
  }, [confirmToast]);

  /* ---- filter tables/search ---- */
  const filteredRecentUsers = React.useMemo(() => {
    if (!stats) return [];
    if (!searchQuery.trim()) return stats.recentUsers;
    const q = searchQuery.toLowerCase().trim();
    return stats.recentUsers.filter(
      (u) => u.fullName.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );
  }, [stats, searchQuery]);

  /* ---- actions ---- */
  const onLogout = async () => {
    try {
      await logout();
    } finally {
      router.replace("/login");
    }
  };

  /* ------------------------------------------------------------------ */
  /*                           Dashboard section                         */
  /* ------------------------------------------------------------------ */

  const renderDashboard = () => {
    if (loading || !stats) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-32 rounded-2xl bg-softLavender/50 animate-pulse" />
          ))}
        </div>
      );
    }

    return (
      <>
        {/* 4 stat cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard Icon={Users} tone="#6D3FE8" title="Total Users" value={fmtNum(stats.totalUsers)} delta={stats.userGrowth} vsLabel="vs last 7 days" />
          <StatCard Icon={MessageSquareText} tone="#8B5CF6" title="Community Posts" value={fmtNum(stats.totalPosts)} delta={stats.postGrowth} vsLabel="vs last 7 days" />
          <StatCard Icon={MessageSquare} tone="#3B82F6" title="Comments" value={fmtNum(stats.totalComments)} delta={stats.commentGrowth} vsLabel="vs last 7 days" />
          <StatCard Icon={Crown} tone="#D9B86C" title="Premium Subscribers" value={fmtNum(stats.premiumSubscribers)} delta={stats.premiumGrowth} vsLabel="vs last 7 days" />
        </div>

        {/* User Growth + Content Distribution */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-4 mt-4">
          <div className="xl:col-span-3 rounded-2xl bg-offWhite border border-softLavender shadow-soft p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div>
                <div className="text-base font-bold text-brandText">User Growth</div>
                <div className="text-xs text-brandText/60">New signups per period</div>
              </div>
              <div className="flex items-center bg-softLavender/60 rounded-xl p-1 gap-1" role="tablist" aria-label="User growth date range">
                {RANGE_TABS.map((t) => {
                  const disabled = t !== "30D";
                return (
                  <button
                    key={t}
                    role="tab"
                    aria-selected={range === t}
                    onClick={() => !disabled && setRange(t)}
                    disabled={disabled}
                    title={disabled ? "Demo dataset: 30-day window only" : `${t} signup growth`}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                      range === t
                        ? "bg-offWhite text-brandText shadow-sm"
                        : disabled
                          ? "text-brandText/30 cursor-not-allowed"
                          : "text-brandText/60 hover:text-brandText hover:bg-offWhite/50"
                    }`}
                  >
                    {t}
                  </button>
                );
                })}
              </div>
            </div>
            <UserGrowthChart data={stats.usersGrowthLast30D} />
          </div>

          <div className="xl:col-span-2 rounded-2xl bg-offWhite border border-softLavender shadow-soft p-5">
            <div className="mb-4">
              <div className="text-base font-bold text-brandText">Content Distribution</div>
              <div className="text-xs text-brandText/60">Community posts by category</div>
            </div>
            <ContentDistribution data={stats.contentDistribution} />
          </div>
        </div>

        {/* Recent Users + Top Topics */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-4 mt-4">
          <div className="xl:col-span-3 rounded-2xl bg-offWhite border border-softLavender shadow-soft p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-base font-bold text-brandText">Recent Users</div>
                <div className="text-xs text-brandText/60">Latest members to join Mindora</div>
              </div>
              <button
                onClick={() => setActive("Users")}
                className="text-xs font-semibold text-brightPurple hover:text-primaryPurple inline-flex items-center gap-1"
              >
                View All <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="overflow-x-auto -mx-2">
              <table className="w-full min-w-[520px] text-left border-separate border-spacing-0">
                <thead>
                  <tr className="text-xs text-brandText/60">
                    <th className="bg-softLavender/40 first:rounded-l-xl px-4 py-2 font-medium">User</th>
                    <th className="bg-softLavender/40 px-4 py-2 font-medium">Email</th>
                    <th className="bg-softLavender/40 px-4 py-2 font-medium">Joined</th>
                    <th className="bg-softLavender/40 px-4 py-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {(filteredRecentUsers.length ? filteredRecentUsers : stats.recentUsers).map((u, i) => (
                    <tr key={u.id} className={i === 0 ? "" : "border-t border-softLavender/60"}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img src={u.avatar} alt={u.fullName} loading="lazy" decoding="async" className="h-9 w-9 rounded-full object-cover ring-2 ring-softLavender" />
                          <div>
                            <div className="text-sm font-semibold text-brandText">{u.fullName}</div>
                            <div className="text-xs text-brandText/50">{u.plan === "premium" ? "Premium" : "Free"} plan</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-brandText/70">{u.email}</td>
                      <td className="px-4 py-3 text-sm text-brandText/70">
                        {i === 0 ? "2 hours ago" : i === 1 ? "4 hours ago" : i === 2 ? "6 hours ago" : i === 3 ? "8 hours ago" : "10 hours ago"}
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-1">
                          <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> Active
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="xl:col-span-2 rounded-2xl bg-offWhite border border-softLavender shadow-soft p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-base font-bold text-brandText">Top Community Topics</div>
                <div className="text-xs text-brandText/60">Most active discussion categories</div>
              </div>
              <button
                onClick={() => setActive("Posts")}
                className="text-xs font-semibold text-brightPurple hover:text-primaryPurple inline-flex items-center gap-1"
              >
                View All <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
            <ul className="space-y-3">
              {stats.topTopics.map((t) => {
                const toneColor = (t as unknown as { tone: string }).tone || "#6D3FE8";
                return (
                  <li key={t.label} className="flex items-center gap-3 p-3 rounded-2xl border border-softLavender/60 bg-offWhite">
                    <div
                      className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: t.color }}
                    >
                      <Heart className="h-4 w-4" style={{ color: toneColor }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <div className="text-sm font-semibold text-brandText truncate">{t.label}</div>
                        <div className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 rounded-full px-2 py-0.5">
                          <TrendingUp className="h-3 w-3" />
                          {t.growth}%
                        </div>
                      </div>
                      <div className="text-xs text-brandText/60 mt-0.5">{fmtNum(t.posts)} posts</div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Pending Reports + System Health */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-4 mt-4">
          <div className="xl:col-span-3 rounded-2xl bg-offWhite border border-softLavender shadow-soft p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-base font-bold text-brandText">Pending Reports</div>
                <div className="text-xs text-brandText/60">Reported posts and comments awaiting review</div>
              </div>
              <button
                onClick={() => setActive("Reports")}
                className="text-xs font-semibold text-brightPurple hover:text-primaryPurple inline-flex items-center gap-1"
              >
                View All <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="overflow-x-auto -mx-2">
              <table className="w-full min-w-[540px] text-left border-separate border-spacing-0">
                <thead>
                  <tr className="text-xs text-brandText/60">
                    <th className="bg-softLavender/40 first:rounded-l-xl px-4 py-2 font-medium">Type</th>
                    <th className="bg-softLavender/40 px-4 py-2 font-medium">Content</th>
                    <th className="bg-softLavender/40 px-4 py-2 font-medium">Reported By</th>
                    <th className="bg-softLavender/40 px-4 py-2 font-medium">Date</th>
                    <th className="bg-softLavender/40 px-4 py-2 font-medium">Status</th>
                    <th className="bg-softLavender/40 last:rounded-r-xl px-4 py-2 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.reports.map((r, i) => {
                    const currentStatus = (reviewedReports[r.id] ??
                      r.status) as "Pending" | "Reviewed" | "Resolved";
                    return (
                      <tr key={r.id} className={i === 0 ? "" : "border-t border-softLavender/60"}>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full text-xs font-semibold px-2.5 py-1 ${
                              r.type === "Post" ? "bg-lavender/30 text-primaryPurple" : "bg-orange-50 text-orange-600"
                            }`}
                          >
                            {r.type === "Post" ? <MessageSquare className="h-3.5 w-3.5" /> : <MessageCircle className="h-3.5 w-3.5" />}
                            {r.type}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-brandText/80 max-w-[200px] truncate">{r.content}</td>
                        <td className="px-4 py-3 text-sm text-brandText/70">{r.reportedBy}</td>
                        <td className="px-4 py-3 text-sm text-brandText/70 whitespace-nowrap">{r.date}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center rounded-full text-xs font-semibold px-2.5 py-1 ${
                              currentStatus === "Pending"
                                ? "bg-amber-50 text-amber-700"
                                : currentStatus === "Reviewed"
                                ? "bg-sky-50 text-sky-700"
                                : "bg-emerald-50 text-emerald-700"
                            }`}
                          >
                            {currentStatus}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1.5">
                            <Button
                              size="sm"
                              className="h-8 px-3 text-xs rounded-xl"
                              disabled={currentStatus !== "Pending"}
                              onClick={async () => {
                                await reviewReport(r.id, "Reviewed");
                                setReviewedReports((p) => ({ ...p, [r.id]: "Reviewed" }));
                                setConfirmToast(`Report ${r.id} reviewed.`);
                              }}
                            >
                              Review
                            </Button>
                            <button type="button" aria-label="Report actions" className="h-8 w-8 rounded-xl hover:bg-softLavender flex items-center justify-center text-brandText/60">
                              <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="xl:col-span-2 rounded-2xl bg-offWhite border border-softLavender shadow-soft p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-base font-bold text-brandText">System Health</div>
                <div className="text-xs text-brandText/60">Operational status of core services</div>
              </div>
              <button className="text-xs font-semibold text-brightPurple hover:text-primaryPurple inline-flex items-center gap-1">
                View Details <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
            <ul className="space-y-3">
              {stats.systemHealth.map((s) => (
                <li key={s.name} className="flex items-center justify-between p-3 rounded-2xl border border-softLavender/60 bg-offWhite">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4" style={{ color: s.tone }} />
                    <div className="text-sm font-semibold text-brandText">{s.name}</div>
                  </div>
                  <span className="inline-flex items-center text-xs font-semibold rounded-full bg-emerald-50 text-emerald-700 px-2.5 py-1">
                    {s.status}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-4 rounded-2xl bg-gradient-to-r from-softLavender to-lavender/40 p-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primaryPurple" />
              <span className="text-xs font-semibold text-primaryPurple">All systems operational</span>
            </div>
          </div>
        </div>
      </>
    );
  };

  /* -------------------- Modals for Quick Actions -------------------- */
  const [affText, setAffText] = React.useState("");
  const [affCat, setAffCat] = React.useState("Self Love");

  const [audioTitle, setAudioTitle] = React.useState("");
  const [audioCat, setAudioCat] = React.useState("Sleep");
  const [audioFile, setAudioFile] = React.useState<File | null>(null);

  const [chTitle, setChTitle] = React.useState("");
  const [chDays, setChDays] = React.useState(7);

  /* ==================================================================
   *                              Return JSX
   * ================================================================== */
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-offWhite via-softLavender/20 to-offWhite">
      {/* mobile backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-30 bg-brandText/40 backdrop-blur-sm xl:hidden"
        />
      )}

      <div className="flex w-full">
        {/* Sidebar */}
        <aside
          className={`fixed xl:sticky top-0 z-40 h-screen w-64 shrink-0 bg-offWhite/90 backdrop-blur-xl border-r border-softLavender flex flex-col transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "-translate-x-full xl:translate-x-0"
          }`}
        >
          <div className="px-5 pt-6 pb-5 flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-brightPurple to-primaryPurple flex items-center justify-center shadow-glow">
              <Flower2 className="h-5 w-5 text-offWhite" />
            </div>
            <div>
              <div className="text-lg font-black tracking-tight text-brandText">Mindora</div>
              <div className="text-[11px] text-brandText/60 -mt-0.5">Elevate Your Mind Daily</div>
            </div>
          </div>

          <nav className="flex-1 px-3 overflow-y-auto pb-6 space-y-1">
            {ADMIN_SIDEBAR.map((item, idx) => {
              const prev = ADMIN_SIDEBAR[idx - 1];
              const showHeader = item.group && (!prev || prev.group !== item.group);
              const isActive = active === item.section;
              return (
                <React.Fragment key={item.sectionLabel}>
                  {showHeader && (
                    <div className="text-[10px] uppercase font-bold tracking-[0.18em] text-brandText/40 px-3 pt-4 pb-2">
                      {item.group}
                    </div>
                  )}
                  <button
                    onClick={() => {
                      setActive(item.section);
                      setMobileOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                      isActive
                        ? "bg-primaryPurple/10 text-primaryPurple shadow-inner border border-primaryPurple/20"
                        : "text-brandText/70 hover:bg-softLavender/60 hover:text-brandText"
                    }`}
                  >
                    <item.Icon className="h-[18px] w-[18px] shrink-0" />
                    <span>{item.sectionLabel}</span>
                  </button>
                </React.Fragment>
              );
            })}
            <button
              onClick={onLogout}
              className="mt-2 w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-brandText/70 hover:bg-softLavender/60 hover:text-brandText"
            >
              <LogOut className="h-[18px] w-[18px] shrink-0" />
              <span>Log Out</span>
            </button>
          </nav>

          <div className="px-4 pb-6">
            <div className="rounded-2xl bg-gradient-to-br from-softLavender via-lavender/40 to-primaryPurple/10 p-4 border border-primaryPurple/10 relative overflow-hidden">
              <div className="absolute -bottom-6 -right-6 opacity-30">
                <Flower2 className="h-20 w-20 text-primaryPurple" />
              </div>
              <div className="relative">
                <div className="text-xs text-brandText/70 mb-2">
                  A healthier mind
                  <br /> builds a brighter future.
                </div>
                <div className="mx-auto w-fit mt-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-brightPurple" />
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 min-w-0">
          {/* Top Bar */}
          <header className="sticky top-0 z-20 bg-offWhite/80 backdrop-blur-xl border-b border-softLavender">
            <div className="flex items-center gap-3 px-4 md:px-6 py-4">
              <button
                onClick={() => setMobileOpen(true)}
                className="h-10 w-10 rounded-2xl hover:bg-softLavender flex xl:hidden items-center justify-center text-brandText"
                aria-label="Open menu"
              >
                <div className="flex flex-col gap-[5px]">
                  <span className="h-0.5 w-5 bg-brandText rounded" />
                  <span className="h-0.5 w-5 bg-brandText rounded" />
                  <span className="h-0.5 w-4 bg-brandText rounded" />
                </div>
              </button>

              <div className="flex-1 max-w-md hidden md:block">
                <label className="flex items-center rounded-2xl border border-softLavender bg-offWhite pl-3.5 pr-2 py-2 focus-within:ring-2 focus-within:ring-primaryPurple/30 focus-within:border-primaryPurple/40 transition-colors">
                  <Search className="h-4 w-4 text-brandText/50" />
                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search users, posts, or content..."
                    className="flex-1 bg-transparent outline-none text-sm text-brandText placeholder:text-brandText/40 px-3"
                  />
                  <button className="h-8 w-8 rounded-xl bg-primaryPurple hover:bg-brightPurple text-offWhite flex items-center justify-center">
                    <Search className="h-4 w-4" />
                  </button>
                </label>
              </div>
              <div className="md:hidden flex-1">
                <label className="flex items-center rounded-2xl border border-softLavender bg-offWhite px-3 py-2 focus-within:ring-2 focus-within:ring-primaryPurple/30">
                  <Search className="h-4 w-4 text-brandText/50 mr-2" />
                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="flex-1 bg-transparent outline-none text-sm text-brandText placeholder:text-brandText/40"
                  />
                </label>
              </div>

              <div className="flex items-center gap-2">
                <button className="relative h-10 w-10 rounded-2xl hover:bg-softLavender flex items-center justify-center text-brandText/80" aria-label="Notifications">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-offWhite" />
                </button>
                <div className="flex items-center gap-2 rounded-2xl hover:bg-softLavender px-2 py-1">
                  <div className="relative h-8 w-8 overflow-hidden rounded-full ring-2 ring-softLavender bg-lavender">
                    <img
                      src={user?.avatar || defaultAvatarUrl("Admin")}
                      alt={user?.fullName || "Admin"}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        const tgt = e.currentTarget;
                        tgt.style.display = "none";
                        const parent = tgt.parentElement;
                        if (parent && !parent.querySelector(".avatar-fallback")) {
                          const initials = document.createElement("span");
                          initials.className = "avatar-fallback absolute inset-0 flex items-center justify-center text-xs font-bold text-primaryPurple";
                          initials.textContent = ((user?.fullName ?? "A").match(/\b\p{L}/gu) ?? ["A"]).slice(0, 2).join("").toUpperCase();
                          parent.appendChild(initials);
                        }
                      }}
                    />
                  </div>
                  <div className="hidden sm:block text-left">
                    <div className="text-sm font-bold text-brandText leading-tight">{user?.fullName || "Admin"}</div>
                    <div className="text-[11px] text-brandText/60 leading-tight">Super Admin</div>
                  </div>
                  <ChevronDown className="h-4 w-4 text-brandText/50 hidden sm:block" />
                </div>
              </div>
            </div>
          </header>

          {/* Page content */}
          <section className="px-4 md:px-6 py-6 grid grid-cols-1 xl:grid-cols-12 gap-4">
            <div className="xl:col-span-9 space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-[0.18em] text-brightPurple font-bold mb-1">
                    {active === "Dashboard" ? "Admin Panel · Overview" : `Admin · ${active}`}
                  </div>
                  <h1 className="text-2xl md:text-3xl font-black text-brandText">Dashboard</h1>
                  <p className="text-sm text-brandText/60 mt-1">
                    Welcome back, {user?.firstName || "Admin"}. Here&apos;s what&apos;s happening with Mindora.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 rounded-2xl border border-softLavender bg-offWhite px-4 py-2 text-sm font-semibold text-brandText/80 hover:border-primaryPurple/30">
                    <Calendar className="h-4 w-4 text-brightPurple" />
                    Aug 30, 2026
                    <ChevronDown className="h-4 w-4 text-brandText/50" />
                  </div>
                </div>
              </div>

              {error && (
                <div className="rounded-2xl border border-red-200 bg-red-50 text-red-700 px-4 py-3 text-sm flex items-start gap-3">
                  <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="font-semibold mb-0.5">Something went wrong</div>
                    <div>{error}</div>
                  </div>
                  <Button size="sm" className="h-8 rounded-xl" onClick={fetchStats}>
                    Retry
                  </Button>
                </div>
              )}

              {active === "Dashboard" && renderDashboard()}

              {active === "Users" && stats && (
                <div className="rounded-2xl bg-offWhite border border-softLavender shadow-soft p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-lg font-bold text-brandText">User Management</div>
                      <div className="text-xs text-brandText/60">Search, filter, and manage all Mindora users</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="inline-flex items-center gap-2 rounded-xl border border-softLavender px-3 py-2 text-sm font-semibold text-brandText/70 hover:bg-softLavender/50">
                        <Filter className="h-4 w-4" /> Filters
                      </button>
                      <Button className="rounded-xl h-9">
                        <Plus className="h-4 w-4 mr-1.5" /> Invite User
                      </Button>
                    </div>
                  </div>
                  <div className="overflow-x-auto -mx-2">
                    <table className="w-full min-w-[680px] text-left border-separate border-spacing-0">
                      <thead>
                        <tr className="text-xs text-brandText/60">
                          <th className="bg-softLavender/40 first:rounded-l-xl px-4 py-2 font-medium">User</th>
                          <th className="bg-softLavender/40 px-4 py-2 font-medium">Email</th>
                          <th className="bg-softLavender/40 px-4 py-2 font-medium">Plan</th>
                          <th className="bg-softLavender/40 px-4 py-2 font-medium">Joined</th>
                          <th className="bg-softLavender/40 px-4 py-2 font-medium">Status</th>
                          <th className="bg-softLavender/40 last:rounded-r-xl px-4 py-2 font-medium text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(filteredRecentUsers.length ? filteredRecentUsers : stats.recentUsers).map((u, i) => (
                          <tr key={u.id} className={i === 0 ? "" : "border-t border-softLavender/60"}>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-3">
                                <img src={u.avatar} loading="lazy" decoding="async" className="h-9 w-9 rounded-full object-cover ring-2 ring-softLavender" alt={u.fullName} />
                                <div>
                                  <div className="text-sm font-semibold text-brandText">{u.fullName}</div>
                                  <div className="text-xs text-brandText/50">Role: {u.role}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm text-brandText/70">{u.email}</td>
                            <td className="px-4 py-3">
                              <span
                                className={`inline-flex items-center rounded-full text-xs font-semibold px-2.5 py-1 ${
                                  u.plan === "premium"
                                    ? "bg-amber-50 text-amber-700"
                                    : "bg-softLavender text-primaryPurple"
                                }`}
                              >
                                {u.plan === "premium" ? <CrownIcon className="h-3 w-3 mr-1" /> : null}
                                {u.plan}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-brandText/70">{new Date(u.createdAt).toLocaleDateString()}</td>
                            <td className="px-4 py-3">
                              <span className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-1">
                                Active
                              </span>
                            </td>
                            <td className="px-4 py-3 text-right">
                              <div className="inline-flex gap-1.5">
                                <Button size="sm" variant="outline" className="h-8 rounded-xl">Edit</Button>
                                <button type="button" aria-label="User actions" className="h-8 w-8 rounded-xl hover:bg-softLavender flex items-center justify-center text-brandText/60">
                                  <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {active === "Affirmations" && stats && (
                <div className="rounded-2xl bg-offWhite border border-softLavender shadow-soft p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-lg font-bold text-brandText">Affirmations Library</div>
                      <div className="text-xs text-brandText/60">Create, edit, and remove daily affirmations</div>
                    </div>
                    <Button className="rounded-xl h-9" onClick={() => setAffModal(true)}>
                      <Plus className="h-4 w-4 mr-1.5" /> New Affirmation
                    </Button>
                  </div>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {stats.affirmations.map((a) => (
                      <li key={a.id} className="p-4 rounded-2xl border border-softLavender bg-gradient-to-br from-offWhite to-softLavender/30">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-primaryPurple bg-primaryPurple/10 rounded-full px-2 py-0.5 mb-2">
                              {a.category}
                            </span>
                            <p className="text-brandText font-semibold">“{a.text}”</p>
                            <div className="text-[11px] text-brandText/50 mt-2">
                              Added by {a.author} · {new Date(a.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                          <button
                            type="button"
                            aria-label="Delete affirmation"
                            onClick={async () => {
                              await deleteAffirmation(a.id);
                              await fetchStats();
                              setConfirmToast("Affirmation deleted.");
                            }}
                            className="h-8 w-8 rounded-xl hover:bg-red-50 text-brandText/40 hover:text-red-500 flex items-center justify-center"
                          >
                            <MoreHorizontal className="h-4 w-4 rotate-90" aria-hidden="true" />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {active === "Audio" && stats && (
                <div className="rounded-2xl bg-offWhite border border-softLavender shadow-soft p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-lg font-bold text-brandText">Audio Library</div>
                      <div className="text-xs text-brandText/60">Manage sleep, meditation, and ambient audio tracks</div>
                    </div>
                    <Button className="rounded-xl h-9" onClick={() => setAudioModal(true)}>
                      <Upload className="h-4 w-4 mr-1.5" /> Upload Audio
                    </Button>
                  </div>
                  <ul className="space-y-2">
                    {stats.audios.map((a) => (
                      <li key={a.id} className="p-4 rounded-2xl border border-softLavender flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-brightPurple to-primaryPurple flex items-center justify-center text-offWhite shrink-0">
                            <Music className="h-5 w-5" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-semibold text-brandText truncate">{a.title}</div>
                            <div className="text-xs text-brandText/60">
                              {a.category} · {Math.round(a.sizeKb / 1024 * 10) / 10} MB · {Math.round(a.durationSec / 60)}m {a.durationSec % 60}s
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center rounded-full text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-700">
                            {a.published ? "Published" : "Draft"}
                          </span>
                          <Button variant="outline" size="sm" className="h-8 rounded-xl">Edit</Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {active === "Challenges" && stats && (
                <div className="rounded-2xl bg-offWhite border border-softLavender shadow-soft p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-lg font-bold text-brandText">Challenges</div>
                      <div className="text-xs text-brandText/60">Create engaging challenges for the community</div>
                    </div>
                    <Button className="rounded-xl h-9" onClick={() => setChallengeModal(true)}>
                      <Plus className="h-4 w-4 mr-1.5" /> New Challenge
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {stats.challenges.map((c) => (
                      <div key={c.id} className="p-4 rounded-2xl border border-softLavender bg-gradient-to-br from-offWhite to-softLavender/30">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3 min-w-0">
                            <div className="h-12 w-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
                              <Trophy className="h-5 w-5" />
                            </div>
                            <div className="min-w-0">
                              <div className="text-sm font-bold text-brandText">{c.title}</div>
                              <div className="text-xs text-brandText/60 mt-1">
                                {c.days}-day challenge · {fmtNum(c.participants)} participants
                              </div>
                            </div>
                          </div>
                          <span className="inline-flex items-center rounded-full text-xs font-semibold px-2.5 py-1 bg-brightPurple/10 text-brightPurple">
                            {c.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {active !== "Dashboard" &&
                active !== "Users" &&
                active !== "Affirmations" &&
                active !== "Audio" &&
                active !== "Challenges" && (
                  <div className="rounded-2xl bg-offWhite border border-softLavender shadow-soft p-10 text-center">
                    <div className="mx-auto h-14 w-14 rounded-2xl bg-softLavender flex items-center justify-center mb-4">
                      <Sparkles className="h-6 w-6 text-primaryPurple" />
                    </div>
                    <h3 className="text-lg font-bold text-brandText mb-1">{active} module</h3>
                    <p className="text-sm text-brandText/60 max-w-md mx-auto">
                      Management UI for <span className="font-semibold">{active}</span> module is fully accessible to admins.
                      Use the sidebar to navigate between fully built sections, or click Quick Actions to jump directly.
                    </p>
                  </div>
                )}
            </div>

            {/* Right column */}
            <aside className="xl:col-span-3 space-y-4">
              {/* Quick Actions */}
              <div className="rounded-2xl bg-offWhite border border-softLavender shadow-soft p-5">
                <div className="text-base font-bold text-brandText mb-3">Quick Actions</div>
                <ul className="space-y-2">
                  {[
                    { label: "Add New Affirmation", I: Sparkles, c: "#6D3FE8", onClick: () => setAffModal(true) },
                    { label: "Upload Audio", I: Upload, c: "#8B5CF6", onClick: () => setAudioModal(true) },
                    { label: "Create Challenge", I: Trophy, c: "#D9B86C", onClick: () => setChallengeModal(true) },
                    { label: "Manage Users", I: Users, c: "#3B82F6", onClick: () => setActive("Users") },
                  ].map((a) => (
                    <li key={a.label}>
                      <button
                        onClick={a.onClick}
                        className="w-full flex items-center justify-between gap-2 rounded-2xl px-3 py-3 hover:bg-softLavender/60 border border-transparent hover:border-softLavender transition-all"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className="h-9 w-9 rounded-xl flex items-center justify-center shrink-0"
                            style={{ background: a.c + "18", color: a.c }}
                          >
                            <a.I className="h-4 w-4" />
                          </div>
                          <div className="text-sm font-semibold text-brandText text-left truncate">{a.label}</div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-brandText/40 shrink-0" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Premium Content card */}
              <div
                className="rounded-2xl shadow-card text-offWhite p-5 relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, #24143D 0%, #3D2478 45%, #5B3FA8 100%)",
                }}
              >
                <div className="absolute -top-6 -right-6 opacity-30">
                  <Flower2 className="h-32 w-32 text-offWhite" />
                </div>
                <div className="relative">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-9 w-9 rounded-xl bg-softGold/20 flex items-center justify-center">
                      <CrownIcon className="h-4 w-4 text-softGold" />
                    </div>
                    <div>
                      <div className="text-sm font-bold">Premium Content</div>
                      <div className="text-[11px] text-offWhite/70">
                        Unlock exclusive features, manage subscriptions and more.
                      </div>
                    </div>
                  </div>
                  <Link href="/premium" target="_blank" rel="noreferrer noopener">
                    <Button className="mt-3 bg-offWhite hover:bg-softLavender text-brandText rounded-xl h-9">
                      Go to Premium <ArrowRight className="h-4 w-4 ml-1.5" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="rounded-2xl bg-offWhite border border-softLavender shadow-soft p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-base font-bold text-brandText">Recent Activity</div>
                  <button className="text-xs font-semibold text-brightPurple hover:text-primaryPurple inline-flex items-center gap-1">
                    View All <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
                <ul className="space-y-3">
                  {stats?.recentActivity.map((a) => (
                    <li key={a.id} className="flex items-start gap-3">
                      <ActivityIconTone icon={a.icon} tone={a.tone} />
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-semibold text-brandText truncate">{a.title}</div>
                        <div className="text-xs text-brandText/60 truncate">{a.detail}</div>
                        <div className="text-[11px] text-brandText/40 mt-0.5">{a.time}</div>
                      </div>
                    </li>
                  )) ??
                    Array.from({ length: 4 }).map((_, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="h-9 w-9 rounded-xl bg-softLavender animate-pulse" />
                        <div className="flex-1 space-y-1.5">
                          <div className="h-3 w-2/3 bg-softLavender rounded animate-pulse" />
                          <div className="h-2.5 w-1/2 bg-softLavender/70 rounded animate-pulse" />
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            </aside>
          </section>
        </main>
      </div>

      {/* ---------------- Modals ---------------- */}
      <Modal open={affModal} onClose={() => setAffModal(false)} title="Add New Affirmation">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (!affText.trim()) return;
            await addAffirmation({ text: affText, category: affCat });
            setAffText("");
            setAffModal(false);
            await fetchStats();
            setConfirmToast("Affirmation added successfully.");
          }}
          className="space-y-4"
        >
          <div>
            <label className="text-xs font-semibold text-brandText/70 mb-1.5 block">Category</label>
            <select
              value={affCat}
              onChange={(e) => setAffCat(e.target.value)}
              className="w-full rounded-xl border border-softLavender bg-offWhite px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primaryPurple/30"
            >
              {["Self Love", "Motivation", "Anxiety Support", "Gratitude", "Daily Wins", "Mental Health"].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-brandText/70 mb-1.5 block">Affirmation Text</label>
            <textarea
              rows={4}
              value={affText}
              onChange={(e) => setAffText(e.target.value)}
              placeholder="You are worthy of peace and joy."
              className="w-full rounded-xl border border-softLavender bg-offWhite px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primaryPurple/30"
            />
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <Button type="button" variant="outline" className="rounded-xl h-9" onClick={() => setAffModal(false)}>
              Cancel
            </Button>
            <Button type="submit" className="rounded-xl h-9">
              <Plus className="h-4 w-4 mr-1.5" /> Publish
            </Button>
          </div>
        </form>
      </Modal>

      <Modal open={audioModal} onClose={() => setAudioModal(false)} title="Upload Audio">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const sizeKb = audioFile ? Math.round(audioFile.size / 1024) : 4200;
            await uploadAudio({
              title: audioTitle || audioFile?.name || "Untitled",
              category: audioCat,
              sizeKb,
              fileName: audioFile?.name,
            });
            setAudioTitle("");
            setAudioFile(null);
            setAudioModal(false);
            await fetchStats();
            setConfirmToast("Audio uploaded successfully.");
          }}
          className="space-y-4"
        >
          <div>
            <label className="text-xs font-semibold text-brandText/70 mb-1.5 block">Category</label>
            <select
              value={audioCat}
              onChange={(e) => setAudioCat(e.target.value)}
              className="w-full rounded-xl border border-softLavender bg-offWhite px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primaryPurple/30"
            >
              {["Sleep", "Nature", "Guided", "Breathing", "Ambient", "Piano"].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-brandText/70 mb-1.5 block">Title</label>
            <input
              value={audioTitle}
              onChange={(e) => setAudioTitle(e.target.value)}
              placeholder="Rain Sounds · Deep Relaxation"
              className="w-full rounded-xl border border-softLavender bg-offWhite px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primaryPurple/30"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-brandText/70 mb-1.5 block">Audio File</label>
            <label className="cursor-pointer block rounded-2xl border-2 border-dashed border-softLavender bg-softLavender/20 hover:bg-softLavender/40 transition-colors px-4 py-6 text-center">
              <Upload className="h-6 w-6 mx-auto mb-2 text-brightPurple" />
              <div className="text-sm font-semibold text-brandText">
                {audioFile ? audioFile.name : "Click to select MP3 / WAV / FLAC"}
              </div>
              <div className="text-[11px] text-brandText/50 mt-1">
                Up to 50 MB · Recommended 160kbps stereo
              </div>
              <input
                type="file"
                accept="audio/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) setAudioFile(f);
                }}
              />
            </label>
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <Button type="button" variant="outline" className="rounded-xl h-9" onClick={() => setAudioModal(false)}>
              Cancel
            </Button>
            <Button type="submit" className="rounded-xl h-9">
              <Upload className="h-4 w-4 mr-1.5" /> Upload
            </Button>
          </div>
        </form>
      </Modal>

      <Modal open={challengeModal} onClose={() => setChallengeModal(false)} title="Create Challenge">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (!chTitle.trim() || chDays < 1) return;
            await createChallenge({ title: chTitle, days: chDays });
            setChTitle("");
            setChDays(7);
            setChallengeModal(false);
            await fetchStats();
            setConfirmToast("Challenge created successfully.");
          }}
          className="space-y-4"
        >
          <div>
            <label className="text-xs font-semibold text-brandText/70 mb-1.5 block">Challenge Name</label>
            <input
              value={chTitle}
              onChange={(e) => setChTitle(e.target.value)}
              placeholder="21 Days of Mindfulness"
              className="w-full rounded-xl border border-softLavender bg-offWhite px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primaryPurple/30"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-brandText/70 mb-1.5 block">Duration (days)</label>
            <input
              type="number"
              min={1}
              max={365}
              value={chDays}
              onChange={(e) => setChDays(parseInt(e.target.value || "1", 10))}
              className="w-full rounded-xl border border-softLavender bg-offWhite px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primaryPurple/30"
            />
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <Button type="button" variant="outline" className="rounded-xl h-9" onClick={() => setChallengeModal(false)}>
              Cancel
            </Button>
            <Button type="submit" className="rounded-xl h-9">
              <Trophy className="h-4 w-4 mr-1.5" /> Launch
            </Button>
          </div>
        </form>
      </Modal>

      {/* Confirm toast */}
      {confirmToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] px-4 py-3 rounded-2xl bg-brandText text-offWhite shadow-card border border-brandText/10 flex items-center gap-2 text-sm font-semibold">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          {confirmToast}
        </div>
      )}
    </div>
  );
}

function defaultAvatarUrl(name: string) {
  const prompt = encodeURIComponent(
    `professional headshot portrait of ${name}, warm friendly smile, mindfulness coach aesthetic, soft studio lighting, clean background`
  );
  return `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${prompt}&image_size=square`;
}

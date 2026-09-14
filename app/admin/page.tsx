import type { Metadata } from "next";
import { Suspense } from "react";
import { AdminRoute } from "@/components/auth/AdminRoute";
import { AdminClient } from "@/components/dashboard/AdminClient";

export const metadata: Metadata = {
  title: "Admin Panel | Mindora",
  description:
    "Mindora Admin Panel. Manage users, moderate community posts, upload audio and affirmations, configure subscriptions, and view platform-wide analytics.",
  alternates: {
    canonical: "/admin",
  },
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Admin Panel | Mindora",
    description:
      "Operate Mindora at scale: user management, content CRUD, moderation queues, reporting, and revenue/subscription analytics.",
    type: "website",
    locale: "en_US",
    siteName: "Mindora",
  },
};

export default function AdminPage() {
  return (
    <Suspense fallback={null}>
      <AdminRoute>
        <AdminClient />
      </AdminRoute>
    </Suspense>
  );
}

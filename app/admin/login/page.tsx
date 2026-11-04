import type { Metadata } from "next";
import AdminLoginClient from "./AdminLoginClient";

export const metadata: Metadata = {
  title: "Admin Sign In | Mindora",
  description:
    "Restricted sign-in for Mindora administrators. Admin access is limited to approved accounts.",
  alternates: {
    canonical: "/admin/login",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLoginPage() {
  return <AdminLoginClient />;
}

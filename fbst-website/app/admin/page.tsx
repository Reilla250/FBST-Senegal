import type { Metadata } from "next";
import AdminPageClient from "./AdminPageClient";

export const metadata: Metadata = {
  title: "Admin | Business Content Editor",
  description: "Admin dashboard for managing business page content, background images and responsive site text.",
};

export default function AdminPage() {
  return <AdminPageClient />;
}

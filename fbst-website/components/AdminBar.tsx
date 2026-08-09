"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminBar() {
  const [isAdmin, setIsAdmin] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    fetch("/api/admin/me")
      .then((r) => r.json())
      .then((m) => {
        setIsAdmin(Boolean(m.authenticated));
      })
      .catch(() => {});
  }, []);

  if (!isAdmin) return null;

  return (
    <div className="bg-slate-900 text-white text-xs py-2 px-4 border-b border-slate-700 flex items-center justify-between font-mono z-50 sticky top-0">
      <div className="flex items-center gap-3">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="font-bold text-emerald-400 uppercase tracking-widest">Admin Mode Active</span>
        <span className="hidden sm:inline text-slate-400">| You have full permission to edit everything on this site</span>
      </div>

      <div className="flex items-center gap-4">
        <Link
          href={`/admin?slug=${encodeURIComponent(pathname === "/" ? "home" : pathname.replace(/^\//, ""))}`}
          className="hover:text-cyan-400 underline font-bold"
        >
          ✏️ Edit Current Page
        </Link>
        <Link href="/admin" className="hover:text-cyan-400 font-bold">
          ⚙️ Admin Dashboard
        </Link>
      </div>
    </div>
  );
}

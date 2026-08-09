"use client";

import { useState } from "react";

export default function LoginForm({ onLogin, loading }: { onLogin: (u: string, p: string) => void; loading?: boolean }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onLogin(user, pass);
      }}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <input value={user} onChange={(e) => setUser(e.target.value)} placeholder="Username" className="rounded-2xl border px-3 py-2" />
        <input value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Password" type="password" className="rounded-2xl border px-3 py-2" />
      </div>
      <div className="mt-3">
        <button type="submit" disabled={loading} className="rounded-md bg-blue-900 hover:bg-blue-950 px-4 py-2 text-sm font-semibold text-white transition-colors disabled:opacity-60">
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </div>
    </form>
  );
}

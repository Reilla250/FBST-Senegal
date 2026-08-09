"use client";

import { useEffect, useMemo, useState } from "react";
import LoginForm from "./LoginForm";

type PageData = {
  slug: string;
  label: string;
  title: string;
  description: string;
  heroHeading: string;
  heroSubheading?: string;
  heroText?: string;
  heroCtaLabel?: string;
  heroCtaHref?: string;
  images: string[];
  autoplay: boolean;
};

const initialForm: PageData = {
  slug: "",
  label: "",
  title: "",
  description: "",
  heroHeading: "",
  heroSubheading: "",
  heroText: "",
  heroCtaLabel: "",
  heroCtaHref: "",
  images: [],
  autoplay: true,
};

function splitImages(value: string) {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

export default function AdminPageClient() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [pages, setPages] = useState<PageData[]>([]);
  const [selectedSlug, setSelectedSlug] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [form, setForm] = useState<PageData>(initialForm);
  const [status, setStatus] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/me")
      .then((r) => r.json())
      .then((m) => {
        setAuthenticated(Boolean(m.authenticated));
        if (m.authenticated) {
          fetch("/api/admin/pages")
            .then((res) => res.json())
            .then((data: PageData[]) => {
              setPages(data);
              if (data.length > 0) setSelectedSlug(data[0].slug);
            })
            .catch(() => setStatus("Unable to load admin pages. Check your backend."));
        }
      })
      .catch(() => setStatus("Unable to validate admin session."));
  }, []);

  useEffect(() => {
    if (isCreating) {
      setForm(initialForm);
      return;
    }

    const page = pages.find((item) => item.slug === selectedSlug);
    if (page) {
      setForm(page);
    }
  }, [pages, selectedSlug, isCreating]);

  const pageOptions = useMemo(
    () => pages.map((page) => ({ label: page.label || page.slug, value: page.slug })),
    [pages]
  );

  function handleNewPage() {
    setIsCreating(true);
    setSelectedSlug("");
    setForm({ ...initialForm, autoplay: true });
  }

  async function handleSave() {
    if (!authenticated) {
      setStatus("You must be logged in to save.");
      return;
    }
    if (!form.slug.trim()) {
      setStatus("Please enter a page slug before saving.");
      return;
    }

    setSaving(true);
    setStatus(null);
    try {
      const response = await fetch("/api/admin/pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          images: form.images,
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.ok) {
        setStatus(result.error || "Unable to save page data.");
      } else {
        setPages((current) => current.filter((item) => item.slug !== result.page.slug).concat(result.page));
        setSelectedSlug(result.page.slug);
        setIsCreating(false);
        setStatus("Saved successfully.");
      }
    } catch {
      setStatus("Save failed. Check your connection and try again.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDeletePage(slug: string) {
    if (!authenticated) {
      setStatus("Login first.");
      return;
    }
    if (!confirm(`Delete page ${slug}?`)) {
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`/api/admin/pages?slug=${encodeURIComponent(slug)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setStatus(data.error || "Unable to delete page.");
        return;
      }

      setPages((current) => current.filter((item) => item.slug !== slug));
      setSelectedSlug("");
      setIsCreating(false);
      setStatus("Page deleted.");
    } catch {
      setStatus("Delete failed.");
    } finally {
      setSaving(false);
    }
  }

  async function handleLogin(user: string, pass: string) {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, pass }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setAuthenticated(true);
        setStatus("Logged in.");
        const p = await fetch("/api/admin/pages");
        const pagesData = await p.json();
        setPages(pagesData);
      } else {
        setStatus(data.error || "Login failed");
      }
    } catch {
      setStatus("Login request failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleUpload(file: File | null) {
    if (!file) return null;
    if (!authenticated) {
      setStatus("Please login before uploading.");
      return null;
    }
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (res.ok && data.ok) {
        setForm((cur) => ({ ...cur, images: [...(cur.images || []), data.url] }));
        setStatus("Upload successful.");
        return data.url;
      }
      setStatus(data.error || "Upload failed");
      return null;
    } catch {
      setStatus("Upload error");
      return null;
    } finally {
      setSaving(false);
    }
  }

  async function handleRemoveImage(imageUrl: string) {
    if (!authenticated) {
      setStatus("Login first.");
      return;
    }

    setSaving(true);
    try {
      const fileName = imageUrl.replace("/uploads/", "");
      const res = await fetch(`/api/admin/upload?file=${encodeURIComponent(fileName)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setStatus(data.error || "Unable to delete image.");
        return;
      }

      setForm((cur) => ({ ...cur, images: cur.images.filter((img) => img !== imageUrl) }));
      setStatus("Image deleted.");
    } catch {
      setStatus("Image delete failed.");
    } finally {
      setSaving(false);
    }
  }

  async function showDbSchema() {
    if (!authenticated) {
      setStatus("Please login to view DB schema.");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/admin/db-schema");
      if (!res.ok) {
        setStatus("Unable to fetch DB schema.");
        return;
      }
      const text = await res.text();
      await navigator.clipboard.writeText(text);
      setStatus("DB schema copied to clipboard.");
    } catch {
      setStatus("Error fetching DB schema.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 py-16">
      {authenticated === false && (
        <div className="mb-8 rounded-2xl border border-baobab/15 bg-card p-6">
          <h2 className="text-lg font-semibold mb-3">Admin sign in</h2>
          <LoginForm onLogin={handleLogin} loading={saving} />
          <p className="mt-3 text-sm text-ink/70">Use environment ADMIN_USER / ADMIN_PASS to sign in.</p>
        </div>
      )}
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.32em] text-baobab font-semibold">Business admin</p>
        <h1 className="mt-4 text-4xl font-display font-semibold text-baobab-dark">Business content editor</h1>
        <p className="mt-3 max-w-2xl text-ink/80 leading-relaxed">
          Use this admin dashboard to update business-facing page content, hero imagery, and responsive site text. Save changes and the site will display them.
        </p>
        <div className="mt-4">
          <button onClick={showDbSchema} className="rounded-full bg-slate-100 px-3 py-2 text-sm">
            Copy DB schema to clipboard
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-6 xl:flex-row xl:gap-8">
        <aside className="shrink-0 rounded-3xl border border-baobab/15 bg-sand-deep p-6 xl:w-[300px]">
          <div className="flex items-center justify-between gap-4 mb-6">
            <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-baobab-dark">Pages</h2>
            <button
              type="button"
              onClick={handleNewPage}
              className="rounded-full bg-baobab px-3 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-sand hover:bg-baobab-dark transition-colors"
            >
              New
            </button>
          </div>
          <div className="space-y-3">
            {pageOptions.length > 0 ? (
              pageOptions.map((page) => (
                <div key={page.value} className="flex items-center justify-between gap-2 rounded-2xl bg-card/80 px-4 py-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedSlug(page.value);
                      setIsCreating(false);
                    }}
                    className={`text-left text-sm transition ${
                      page.value === selectedSlug && !isCreating ? "text-baobab" : "text-baobab-dark hover:text-baobab"
                    }`}
                  >
                    {page.label}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeletePage(page.value)}
                    className="text-xs text-rose hover:underline"
                  >
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <p className="text-sm text-ink/70">No pages found. Create one using the New button.</p>
            )}
          </div>
        </aside>

        <section className="rounded-3xl border border-baobab/15 bg-card p-6 shadow-sm flex-1">
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            <label className="space-y-2 text-sm text-ink/80">
              Page slug
              <input
                value={form.slug}
                onChange={(event) => setForm({ ...form, slug: event.target.value })}
                disabled={!isCreating}
                placeholder="home or about"
                className="w-full rounded-2xl border border-baobab/20 bg-card px-4 py-3 text-sm text-ink"
              />
            </label>
            <label className="space-y-2 text-sm text-ink/80">
              Page label
              <input
                value={form.label}
                onChange={(event) => setForm({ ...form, label: event.target.value })}
                className="w-full rounded-2xl border border-baobab/20 px-4 py-3 text-sm text-baobab-dark"
              />
            </label>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_1fr] mt-6">
            <label className="space-y-2 text-sm text-ink/80">
              Browser title
              <input
                value={form.title}
                onChange={(event) => setForm({ ...form, title: event.target.value })}
                className="w-full rounded-2xl border border-baobab/20 px-4 py-3 text-sm text-baobab-dark"
              />
            </label>
            <label className="space-y-2 text-sm text-ink/80">
              Meta description
              <input
                value={form.description}
                onChange={(event) => setForm({ ...form, description: event.target.value })}
                className="w-full rounded-2xl border border-baobab/20 px-4 py-3 text-sm text-baobab-dark"
              />
            </label>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_1fr] mt-6">
            <label className="space-y-2 text-sm text-ink/80">
              Hero heading
              <input
                value={form.heroHeading}
                onChange={(event) => setForm({ ...form, heroHeading: event.target.value })}
                className="w-full rounded-2xl border border-baobab/20 px-4 py-3 text-sm text-baobab-dark"
              />
            </label>
            <label className="space-y-2 text-sm text-ink/80">
              Hero subheading
              <input
                value={form.heroSubheading ?? ""}
                onChange={(event) => setForm({ ...form, heroSubheading: event.target.value })}
                className="w-full rounded-2xl border border-baobab/20 px-4 py-3 text-sm text-baobab-dark"
              />
            </label>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_1fr] mt-6">
            <label className="space-y-2 text-sm text-ink/80">
              Hero CTA label
              <input
                value={form.heroCtaLabel ?? ""}
                onChange={(event) => setForm({ ...form, heroCtaLabel: event.target.value })}
                className="w-full rounded-2xl border border-baobab/20 px-4 py-3 text-sm text-baobab-dark"
              />
            </label>
            <label className="space-y-2 text-sm text-ink/80">
              Hero CTA URL
              <input
                value={form.heroCtaHref ?? ""}
                onChange={(event) => setForm({ ...form, heroCtaHref: event.target.value })}
                className="w-full rounded-2xl border border-baobab/20 px-4 py-3 text-sm text-baobab-dark"
              />
            </label>
          </div>

          <label className="mt-6 block text-sm text-ink/80">
            Hero text
            <textarea
              value={form.heroText ?? ""}
              onChange={(event) => setForm({ ...form, heroText: event.target.value })}
              rows={5}
              className="mt-2 w-full rounded-3xl border border-baobab/20 px-4 py-3 text-sm text-baobab-dark"
            />
          </label>

          <label className="mt-6 block text-sm text-ink/80">
            Background image URLs (one per line)
            <div className="mt-2 flex flex-col gap-3">
              <textarea
                value={form.images.join("\n")}
                onChange={(event) => setForm({ ...form, images: splitImages(event.target.value) })}
                rows={4}
                className="w-full rounded-3xl border border-baobab/20 px-4 py-3 text-sm text-baobab-dark"
              />
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const f = e.currentTarget.files ? e.currentTarget.files[0] : null;
                    if (f) handleUpload(f);
                  }}
                  className="text-sm"
                />
                <span className="text-sm text-ink/70">Upload an image to add to the list.</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {form.images.map((img) => (
                  <div key={img} className="relative">
                    <img src={img} alt="preview" className="h-16 w-24 object-cover rounded-md" />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(img)}
                      className="absolute right-1 top-1 rounded-full bg-black/70 px-2 py-1 text-[10px] text-white"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </label>

          <label className="mt-6 flex items-center gap-3 text-sm text-ink/80">
            <input
              type="checkbox"
              checked={form.autoplay}
              onChange={(event) => setForm({ ...form, autoplay: event.target.checked })}
              className="h-4 w-4 rounded border-baobab/30 text-baobab"
            />
            Autoplay slideshow on this page
          </label>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              {status && <p className="text-sm text-baobab-dark">{status}</p>}
            </div>
            <button
              type="button"
              disabled={saving}
              onClick={handleSave}
              className="inline-flex items-center justify-center rounded-full bg-baobab px-6 py-3 text-sm font-semibold text-sand hover:bg-baobab-dark transition-colors disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save page content"}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

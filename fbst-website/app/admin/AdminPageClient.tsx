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

type Submission = {
  id: string;
  receivedAt: string;
  name: string;
  contact: string;
  reason: string;
  preferredMethod: string;
  preferredTime?: string;
  message: string;
  consent: boolean;
};

type SiteSettings = {
  siteName: string;
  legalName: string;
  registrationNo: string;
  email: string;
  phone: string;
  address: string;
  primaryNav: { label: string; href: string }[];
  programs: { n: string; title: string; text: string }[];
  stats: { value: string; label: string }[];
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
  const [activeTab, setActiveTab] = useState<"pages" | "settings" | "programs" | "messages">("pages");
  const [pages, setPages] = useState<PageData[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [settings, setSettings] = useState<SiteSettings>({
    siteName: "FBST-Senegal",
    legalName: "Fondation La Bonne Santé Pour Tous",
    registrationNo: "978",
    email: "info@fdnlabonnesantepourtous.org",
    phone: "+221 77 857 70 78",
    address: "Dakar, Senegal",
    primaryNav: [],
    programs: [],
    stats: [],
  });

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
          loadPages();
          loadSubmissions();
          loadSettings();
        }
      })
      .catch(() => setStatus("Unable to validate admin session."));
  }, []);

  // Auto-logout after 5 minutes of inactivity (no mouse, keyboard or touch activity)
  useEffect(() => {
    if (!authenticated) return;

    let timer: NodeJS.Timeout;
    const FIVE_MINUTES = 5 * 60 * 1000;

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        handleLogout();
        setStatus("🔒 Session expired after 5 minutes of inactivity.");
      }, FIVE_MINUTES);
    };

    resetTimer();

    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];
    events.forEach((evt) => window.addEventListener(evt, resetTimer));

    return () => {
      clearTimeout(timer);
      events.forEach((evt) => window.removeEventListener(evt, resetTimer));
    };
  }, [authenticated]);

  function loadPages() {
    fetch("/api/admin/pages")
      .then((res) => res.json())
      .then((data: PageData[]) => {
        setPages(data);
        if (data.length > 0 && !selectedSlug) setSelectedSlug(data[0].slug);
      })
      .catch(() => setStatus("Unable to load pages."));
  }

  function loadSubmissions() {
    fetch("/api/admin/submissions")
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) setSubmissions(data.submissions || []);
      })
      .catch(() => {});
  }

  function loadSettings() {
    fetch("/api/admin/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.ok && data.settings) setSettings(data.settings);
      })
      .catch(() => {});
  }

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

  async function handleSavePage() {
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
        body: JSON.stringify({ ...form, images: form.images }),
      });

      const resText = await response.text();
      let result;
      try {
        result = JSON.parse(resText);
      } catch {
        setStatus(`Save error (${response.status}): ${resText.slice(0, 150)}`);
        return;
      }

      if (!response.ok || !result.ok) {
        setStatus(result.error || `Unable to save page data (Status ${response.status}).`);
      } else {
        setPages((current) => current.filter((item) => item.slug !== result.page.slug).concat(result.page));
        setSelectedSlug(result.page.slug);
        setIsCreating(false);
        setStatus("✅ Page saved successfully.");
      }
    } catch (err: any) {
      setStatus(`Save failed: ${err?.message || "Network error. Please try again."}`);
    } finally {
      setSaving(false);
    }
  }

  async function handleSaveSettings() {
    if (!authenticated) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      const resText = await res.text();
      let data;
      try {
        data = JSON.parse(resText);
      } catch {
        setStatus(`Error saving settings (${res.status}): ${resText.slice(0, 150)}`);
        return;
      }

      if (res.ok && data.ok) {
        setSettings(data.settings);
        setStatus("✅ Site settings saved successfully.");
      } else {
        setStatus(data.error || `Failed to save settings (Status ${res.status}).`);
      }
    } catch (err: any) {
      setStatus(`Error saving settings: ${err?.message || "Network error"}`);
    } finally {
      setSaving(false);
    }
  }

  async function handleDeletePage(slug: string) {
    if (!authenticated || !confirm(`Delete page ${slug}?`)) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/pages?slug=${encodeURIComponent(slug)}`, {
        method: "DELETE",
      });

      const resText = await res.text();
      let data;
      try {
        data = JSON.parse(resText);
      } catch {
        setStatus(`Delete error (${res.status}): ${resText.slice(0, 150)}`);
        return;
      }

      if (res.ok && data.ok) {
        setPages((current) => current.filter((item) => item.slug !== slug));
        setSelectedSlug("");
        setIsCreating(false);
        setStatus("✅ Page deleted successfully.");
      } else {
        setStatus(data.error || `Delete failed (Status ${res.status}).`);
      }
    } catch (err: any) {
      setStatus(`Delete failed: ${err?.message || "Network error"}`);
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
        setStatus("Logged in successfully.");
        loadPages();
        loadSubmissions();
        loadSettings();
      } else {
        setStatus(data.error || "Login failed");
      }
    } catch {
      setStatus("Login request failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthenticated(false);
    setStatus("Logged out.");
  }

  async function handleUpload(file: File | null, e?: React.ChangeEvent<HTMLInputElement>) {
    if (!file || !authenticated) {
      setStatus("Please log in as admin to upload images.");
      return null;
    }
    setSaving(true);
    setStatus("Uploading image...");
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      
      const resText = await res.text();
      let data;
      try {
        data = JSON.parse(resText);
      } catch {
        setStatus(`Upload error (${res.status}): ${resText.slice(0, 150)}`);
        return null;
      }

      if (res.ok && data.ok && data.url) {
        const newImages = [...(form.images || []), data.url];
        const updatedForm = { ...form, images: newImages };
        setForm(updatedForm);

        // Auto-save page content to persist the new image URL immediately
        const saveRes = await fetch("/api/admin/pages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedForm),
        });

        const saveText = await saveRes.text();
        let saveResult;
        try {
          saveResult = JSON.parse(saveText);
        } catch {
          saveResult = null;
        }

        if (saveRes.ok && saveResult && saveResult.ok) {
          setPages((current) => current.filter((item) => item.slug !== saveResult.page.slug).concat(saveResult.page));
          setStatus("✅ Image uploaded and saved to page!");
        } else {
          setStatus("Image uploaded! Please click 'Save page content' to publish.");
        }

        if (e) e.target.value = "";
        return data.url;
      } else {
        setStatus(`Upload failed: ${data.error || "Unknown error"}`);
      }
    } catch (err: any) {
      setStatus(`Upload failed: ${err?.message || "Network error"}`);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 py-12">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-teal-700 dark:text-teal-400">Master CMS Control Panel</p>
          <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white mt-1">Full System Admin</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Complete power to modify pages, titles, programs, navigation, contact info & messages.</p>
        </div>
        {authenticated && (
          <button onClick={handleLogout} className="btn-outline text-xs">
            Sign out
          </button>
        )}
      </div>

      {/* Login Form */}
      {authenticated === false && (
        <div className="max-w-md mx-auto my-12 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 p-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Admin Login</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
            Sign in to access full site management tools.
          </p>
          <LoginForm onLogin={handleLogin} loading={saving} />
        </div>
      )}

      {/* Admin Panel when Logged In */}
      {authenticated && (
        <div>
          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mb-6 border-b border-slate-200 dark:border-slate-800 pb-3">
            <button
              onClick={() => setActiveTab("pages")}
              className={`px-4 py-2 text-xs font-bold rounded uppercase tracking-wider transition-colors ${
                activeTab === "pages"
                  ? "bg-teal-600 text-white"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
              }`}
            >
              📄 Pages & Content
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`px-4 py-2 text-xs font-bold rounded uppercase tracking-wider transition-colors ${
                activeTab === "settings"
                  ? "bg-teal-600 text-white"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
              }`}
            >
              ⚙️ Organization & Contact Info
            </button>
            <button
              onClick={() => setActiveTab("programs")}
              className={`px-4 py-2 text-xs font-bold rounded uppercase tracking-wider transition-colors ${
                activeTab === "programs"
                  ? "bg-teal-600 text-white"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
              }`}
            >
              📊 Programs & Impact Stats
            </button>
            <button
              onClick={() => {
                setActiveTab("messages");
                loadSubmissions();
              }}
              className={`px-4 py-2 text-xs font-bold rounded uppercase tracking-wider transition-colors ${
                activeTab === "messages"
                  ? "bg-teal-600 text-white"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
              }`}
            >
              ✉️ Form Enquiries ({submissions.length})
            </button>
          </div>

          {status && (
            <div className="mb-4 p-3 rounded bg-teal-50 border border-teal-200 text-teal-900 text-xs font-bold">
              {status}
            </div>
          )}

          {/* TAB 1: Pages Editor */}
          {activeTab === "pages" && (
            <div className="flex flex-col gap-6 xl:flex-row xl:gap-8">
              <aside className="shrink-0 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 p-5 xl:w-[280px]">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-slate-700 dark:text-slate-300">Site Pages</h2>
                  <button type="button" onClick={handleNewPage} className="btn-primary text-xs px-3 py-1">
                    + New
                  </button>
                </div>
                <div className="space-y-2">
                  {pageOptions.map((page) => (
                    <div
                      key={page.value}
                      className={`flex items-center justify-between gap-2 rounded px-3.5 py-2.5 transition-colors border ${
                        page.value === selectedSlug && !isCreating
                          ? "bg-white dark:bg-slate-800 border-teal-600 font-bold"
                          : "bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedSlug(page.value);
                          setIsCreating(false);
                        }}
                        className="text-left text-sm text-slate-800 dark:text-slate-200 hover:text-teal-700 truncate flex-1"
                      >
                        {page.label}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeletePage(page.value)}
                        className="text-xs text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </aside>

              <section className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 p-6 shadow-sm flex-1">
                <div className="grid gap-4 lg:grid-cols-2">
                  <label className="space-y-1 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                    Page Slug
                    <input
                      value={form.slug}
                      onChange={(e) => setForm({ ...form, slug: e.target.value })}
                      disabled={!isCreating}
                      placeholder="home, about, programs"
                      className="w-full rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2 text-sm text-slate-900 dark:text-slate-100 font-normal"
                    />
                  </label>
                  <label className="space-y-1 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                    Page Label
                    <input
                      value={form.label}
                      onChange={(e) => setForm({ ...form, label: e.target.value })}
                      className="w-full rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2 text-sm text-slate-900 dark:text-slate-100 font-normal"
                    />
                  </label>
                </div>

                <div className="grid gap-4 lg:grid-cols-2 mt-4">
                  <label className="space-y-1 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                    Browser Title
                    <input
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      className="w-full rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2 text-sm text-slate-900 dark:text-slate-100 font-normal"
                    />
                  </label>
                  <label className="space-y-1 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                    Meta Description
                    <input
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      className="w-full rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2 text-sm text-slate-900 dark:text-slate-100 font-normal"
                    />
                  </label>
                </div>

                <div className="grid gap-4 lg:grid-cols-2 mt-4">
                  <label className="space-y-1 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                    Hero Heading
                    <input
                      value={form.heroHeading}
                      onChange={(e) => setForm({ ...form, heroHeading: e.target.value })}
                      className="w-full rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2 text-sm text-slate-900 dark:text-slate-100 font-normal"
                    />
                  </label>
                  <label className="space-y-1 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                    Hero Subheading
                    <input
                      value={form.heroSubheading ?? ""}
                      onChange={(e) => setForm({ ...form, heroSubheading: e.target.value })}
                      className="w-full rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2 text-sm text-slate-900 dark:text-slate-100 font-normal"
                    />
                  </label>
                </div>

                <div className="grid gap-4 lg:grid-cols-2 mt-4">
                  <label className="space-y-1 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                    Hero CTA Button Label
                    <input
                      value={form.heroCtaLabel ?? ""}
                      onChange={(e) => setForm({ ...form, heroCtaLabel: e.target.value })}
                      className="w-full rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2 text-sm text-slate-900 dark:text-slate-100 font-normal"
                    />
                  </label>
                  <label className="space-y-1 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                    Hero CTA Button URL
                    <input
                      value={form.heroCtaHref ?? ""}
                      onChange={(e) => setForm({ ...form, heroCtaHref: e.target.value })}
                      className="w-full rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2 text-sm text-slate-900 dark:text-slate-100 font-normal"
                    />
                  </label>
                </div>

                <label className="mt-4 block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                  Hero Text
                  <textarea
                    value={form.heroText ?? ""}
                    onChange={(e) => setForm({ ...form, heroText: e.target.value })}
                    rows={3}
                    className="mt-1 w-full rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2 text-sm text-slate-900 dark:text-slate-100 font-normal"
                  />
                </label>

                <label className="mt-4 block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                  Background Images
                  <div className="mt-1 flex flex-col gap-3">
                    <textarea
                      value={form.images.join("\n")}
                      onChange={(e) => setForm({ ...form, images: splitImages(e.target.value) })}
                      rows={3}
                      className="w-full rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2 text-sm font-normal text-slate-900 dark:text-slate-100"
                    />
                    <div className="flex items-center gap-3">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const f = e.currentTarget.files ? e.currentTarget.files[0] : null;
                          if (f) handleUpload(f, e);
                        }}
                        className="text-xs text-slate-700 dark:text-slate-300 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-teal-50 file:text-teal-800 hover:file:bg-teal-100 cursor-pointer"
                      />
                      <span className="text-xs text-slate-500">Auto-saves upon selecting an image file.</span>
                    </div>

                    {form.images.length > 0 && (
                      <div className="mt-2 grid grid-cols-3 sm:grid-cols-4 gap-3">
                        {form.images.map((imgUrl) => (
                          <div key={imgUrl} className="relative group rounded overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-900 aspect-video">
                            <img src={imgUrl} alt="Hero background preview" className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={async () => {
                                const newImgs = form.images.filter((i) => i !== imgUrl);
                                setForm({ ...form, images: newImgs });
                                // Delete file from server or Vercel Blob storage
                                if (imgUrl.startsWith("/uploads/") || imgUrl.includes("blob.vercel-storage.com") || imgUrl.startsWith("https://")) {
                                  await fetch(`/api/admin/upload?file=${encodeURIComponent(imgUrl)}`, { method: "DELETE" }).catch(() => {});
                                }
                              }}
                              className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow opacity-90 group-hover:opacity-100"
                              title="Remove image"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </label>

                <div className="mt-6 flex justify-end border-t border-slate-200 dark:border-slate-700 pt-4">
                  <button type="button" disabled={saving} onClick={handleSavePage} className="btn-primary">
                    {saving ? "Saving..." : "Save page content →"}
                  </button>
                </div>
              </section>
            </div>
          )}

          {/* TAB 2: Organization Settings */}
          {activeTab === "settings" && (
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Organization & Contact Info</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-1 text-xs font-bold uppercase text-slate-600 dark:text-slate-400">
                  Public Site Name
                  <input
                    value={settings.siteName}
                    onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                    className="w-full rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2 text-sm text-slate-900 dark:text-slate-100 font-normal"
                  />
                </label>
                <label className="space-y-1 text-xs font-bold uppercase text-slate-600 dark:text-slate-400">
                  Full Legal Name
                  <input
                    value={settings.legalName}
                    onChange={(e) => setSettings({ ...settings, legalName: e.target.value })}
                    className="w-full rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2 text-sm text-slate-900 dark:text-slate-100 font-normal"
                  />
                </label>
                <label className="space-y-1 text-xs font-bold uppercase text-slate-600 dark:text-slate-400">
                  Registration Number
                  <input
                    value={settings.registrationNo}
                    onChange={(e) => setSettings({ ...settings, registrationNo: e.target.value })}
                    className="w-full rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2 text-sm text-slate-900 dark:text-slate-100 font-normal"
                  />
                </label>
                <label className="space-y-1 text-xs font-bold uppercase text-slate-600 dark:text-slate-400">
                  Location / Address
                  <input
                    value={settings.address}
                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                    className="w-full rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2 text-sm text-slate-900 dark:text-slate-100 font-normal"
                  />
                </label>
                <label className="space-y-1 text-xs font-bold uppercase text-slate-600 dark:text-slate-400">
                  Contact Email
                  <input
                    value={settings.email}
                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                    className="w-full rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2 text-sm text-slate-900 dark:text-slate-100 font-normal"
                  />
                </label>
                <label className="space-y-1 text-xs font-bold uppercase text-slate-600 dark:text-slate-400">
                  Contact Phone
                  <input
                    value={settings.phone}
                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                    className="w-full rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2 text-sm text-slate-900 dark:text-slate-100 font-normal"
                  />
                </label>
              </div>

              <div className="mt-6 flex justify-end">
                <button type="button" disabled={saving} onClick={handleSaveSettings} className="btn-primary">
                  {saving ? "Saving..." : "Save organization info →"}
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: Programs & Stats Manager */}
          {activeTab === "programs" && (
            <div className="space-y-6">
              {/* Programs */}
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 p-6 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">Programs Listing Manager</h2>
                  <button
                    type="button"
                    onClick={() =>
                      setSettings({
                        ...settings,
                        programs: [
                          ...settings.programs,
                          { n: `0${settings.programs.length + 1}`, title: "New Program", text: "Program details..." },
                        ],
                      })
                    }
                    className="btn-primary text-xs"
                  >
                    + Add Program
                  </button>
                </div>
                <div className="space-y-4">
                  {settings.programs.map((p, i) => (
                    <div key={i} className="rounded border border-slate-200 dark:border-slate-700 p-4 bg-slate-50 dark:bg-slate-900 space-y-2">
                      <div className="flex gap-2">
                        <input
                          value={p.n}
                          onChange={(e) => {
                            const copy = [...settings.programs];
                            copy[i].n = e.target.value;
                            setSettings({ ...settings, programs: copy });
                          }}
                          className="w-16 rounded border px-2 py-1 text-sm font-bold text-center"
                        />
                        <input
                          value={p.title}
                          onChange={(e) => {
                            const copy = [...settings.programs];
                            copy[i].title = e.target.value;
                            setSettings({ ...settings, programs: copy });
                          }}
                          className="flex-1 rounded border px-3 py-1 text-sm font-bold"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const copy = settings.programs.filter((_, idx) => idx !== i);
                            setSettings({ ...settings, programs: copy });
                          }}
                          className="text-xs text-red-600 hover:underline px-2"
                        >
                          Remove
                        </button>
                      </div>
                      <textarea
                        value={p.text}
                        onChange={(e) => {
                          const copy = [...settings.programs];
                          copy[i].text = e.target.value;
                          setSettings({ ...settings, programs: copy });
                        }}
                        rows={2}
                        className="w-full rounded border px-3 py-1.5 text-sm"
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-end">
                  <button type="button" disabled={saving} onClick={handleSaveSettings} className="btn-primary">
                    Save programs →
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 p-6 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">Impact Statistics Manager</h2>
                  <button
                    type="button"
                    onClick={() =>
                      setSettings({
                        ...settings,
                        stats: [...settings.stats, { value: "100+", label: "New metric label" }],
                      })
                    }
                    className="btn-primary text-xs"
                  >
                    + Add Metric
                  </button>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {settings.stats.map((s, i) => (
                    <div key={i} className="rounded border border-slate-200 dark:border-slate-700 p-3 bg-slate-50 dark:bg-slate-900 flex items-center gap-2">
                      <input
                        value={s.value}
                        onChange={(e) => {
                          const copy = [...settings.stats];
                          copy[i].value = e.target.value;
                          setSettings({ ...settings, stats: copy });
                        }}
                        className="w-24 rounded border px-2 py-1 text-sm font-bold text-teal-600"
                      />
                      <input
                        value={s.label}
                        onChange={(e) => {
                          const copy = [...settings.stats];
                          copy[i].label = e.target.value;
                          setSettings({ ...settings, stats: copy });
                        }}
                        className="flex-1 rounded border px-2 py-1 text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const copy = settings.stats.filter((_, idx) => idx !== i);
                          setSettings({ ...settings, stats: copy });
                        }}
                        className="text-xs text-red-600 hover:underline"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-end">
                  <button type="button" disabled={saving} onClick={handleSaveSettings} className="btn-primary">
                    Save statistics →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Submissions Viewer */}
          {activeTab === "messages" && (
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                Visitor Contact Messages ({submissions.length})
              </h2>

              {submissions.length === 0 ? (
                <p className="text-sm text-slate-500 py-8 text-center">No contact messages received yet.</p>
              ) : (
                <div className="space-y-4">
                  {submissions.map((s) => (
                    <div
                      key={s.id}
                      className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-5 space-y-2 text-sm"
                    >
                      <div className="flex flex-wrap justify-between items-start gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
                        <div>
                          <span className="font-bold text-slate-900 dark:text-white text-base">{s.name}</span>
                          <span className="ml-3 text-xs px-2 py-0.5 rounded bg-teal-100 text-teal-800 font-bold uppercase">{s.reason}</span>
                        </div>
                        <span className="text-xs text-slate-400">
                          {new Date(s.receivedAt).toLocaleString()}
                        </span>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-400">
                        <p><strong>Contact:</strong> {s.contact}</p>
                        <p><strong>Preferred Method:</strong> {s.preferredMethod} {s.preferredTime ? `(${s.preferredTime})` : ""}</p>
                      </div>
                      <div className="pt-2">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Message:</p>
                        <p className="text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed">{s.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

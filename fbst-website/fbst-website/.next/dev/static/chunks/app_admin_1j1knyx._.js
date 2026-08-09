(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/admin/AdminPageClient.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminPageClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f$LoginForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/admin/LoginForm.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const initialForm = {
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
    autoplay: true
};
function splitImages(value) {
    return value.split(/\r?\n/).map((line)=>line.trim()).filter(Boolean);
}
function AdminPageClient() {
    _s();
    const [authenticated, setAuthenticated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("pages");
    const [pages, setPages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [submissions, setSubmissions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [settings, setSettings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        siteName: "FBST-Senegal",
        legalName: "Fondation La Bonne Santé Pour Tous",
        registrationNo: "978",
        email: "info@fdnlabonnesantepourtous.org",
        phone: "+221 77 857 70 78",
        address: "Dakar, Senegal",
        primaryNav: [],
        programs: [],
        stats: []
    });
    const [selectedSlug, setSelectedSlug] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [isCreating, setIsCreating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialForm);
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminPageClient.useEffect": ()=>{
            fetch("/api/admin/me").then({
                "AdminPageClient.useEffect": (r)=>r.json()
            }["AdminPageClient.useEffect"]).then({
                "AdminPageClient.useEffect": (m)=>{
                    setAuthenticated(Boolean(m.authenticated));
                    if (m.authenticated) {
                        loadPages();
                        loadSubmissions();
                        loadSettings();
                    }
                }
            }["AdminPageClient.useEffect"]).catch({
                "AdminPageClient.useEffect": ()=>setStatus("Unable to validate admin session.")
            }["AdminPageClient.useEffect"]);
        }
    }["AdminPageClient.useEffect"], []);
    // Auto-logout after 5 minutes of inactivity (no mouse, keyboard or touch activity)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminPageClient.useEffect": ()=>{
            if (!authenticated) return;
            let timer;
            const FIVE_MINUTES = 5 * 60 * 1000;
            const resetTimer = {
                "AdminPageClient.useEffect.resetTimer": ()=>{
                    clearTimeout(timer);
                    timer = setTimeout({
                        "AdminPageClient.useEffect.resetTimer": ()=>{
                            handleLogout();
                            setStatus("🔒 Session expired after 5 minutes of inactivity.");
                        }
                    }["AdminPageClient.useEffect.resetTimer"], FIVE_MINUTES);
                }
            }["AdminPageClient.useEffect.resetTimer"];
            resetTimer();
            const events = [
                "mousemove",
                "keydown",
                "click",
                "scroll",
                "touchstart"
            ];
            events.forEach({
                "AdminPageClient.useEffect": (evt)=>window.addEventListener(evt, resetTimer)
            }["AdminPageClient.useEffect"]);
            return ({
                "AdminPageClient.useEffect": ()=>{
                    clearTimeout(timer);
                    events.forEach({
                        "AdminPageClient.useEffect": (evt)=>window.removeEventListener(evt, resetTimer)
                    }["AdminPageClient.useEffect"]);
                }
            })["AdminPageClient.useEffect"];
        }
    }["AdminPageClient.useEffect"], [
        authenticated
    ]);
    function loadPages() {
        fetch("/api/admin/pages").then((res)=>res.json()).then((data)=>{
            setPages(data);
            if (data.length > 0 && !selectedSlug) setSelectedSlug(data[0].slug);
        }).catch(()=>setStatus("Unable to load pages."));
    }
    function loadSubmissions() {
        fetch("/api/admin/submissions").then((res)=>res.json()).then((data)=>{
            if (data.ok) setSubmissions(data.submissions || []);
        }).catch(()=>{});
    }
    function loadSettings() {
        fetch("/api/admin/settings").then((res)=>res.json()).then((data)=>{
            if (data.ok && data.settings) setSettings(data.settings);
        }).catch(()=>{});
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminPageClient.useEffect": ()=>{
            if (isCreating) {
                setForm(initialForm);
                return;
            }
            const page = pages.find({
                "AdminPageClient.useEffect.page": (item)=>item.slug === selectedSlug
            }["AdminPageClient.useEffect.page"]);
            if (page) {
                setForm(page);
            }
        }
    }["AdminPageClient.useEffect"], [
        pages,
        selectedSlug,
        isCreating
    ]);
    const pageOptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AdminPageClient.useMemo[pageOptions]": ()=>pages.map({
                "AdminPageClient.useMemo[pageOptions]": (page)=>({
                        label: page.label || page.slug,
                        value: page.slug
                    })
            }["AdminPageClient.useMemo[pageOptions]"])
    }["AdminPageClient.useMemo[pageOptions]"], [
        pages
    ]);
    function handleNewPage() {
        setIsCreating(true);
        setSelectedSlug("");
        setForm({
            ...initialForm,
            autoplay: true
        });
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
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...form,
                    images: form.images
                })
            });
            const result = await response.json();
            if (!response.ok || !result.ok) {
                setStatus(result.error || "Unable to save page data.");
            } else {
                setPages((current)=>current.filter((item)=>item.slug !== result.page.slug).concat(result.page));
                setSelectedSlug(result.page.slug);
                setIsCreating(false);
                setStatus("Page saved successfully.");
            }
        } catch  {
            setStatus("Save failed. Try again.");
        } finally{
            setSaving(false);
        }
    }
    async function handleSaveSettings() {
        if (!authenticated) return;
        setSaving(true);
        try {
            const res = await fetch("/api/admin/settings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(settings)
            });
            const data = await res.json();
            if (res.ok && data.ok) {
                setSettings(data.settings);
                setStatus("Site settings saved successfully.");
            } else {
                setStatus(data.error || "Failed to save settings.");
            }
        } catch  {
            setStatus("Error saving settings.");
        } finally{
            setSaving(false);
        }
    }
    async function handleDeletePage(slug) {
        if (!authenticated || !confirm(`Delete page ${slug}?`)) return;
        setSaving(true);
        try {
            const res = await fetch(`/api/admin/pages?slug=${encodeURIComponent(slug)}`, {
                method: "DELETE"
            });
            const data = await res.json();
            if (res.ok && data.ok) {
                setPages((current)=>current.filter((item)=>item.slug !== slug));
                setSelectedSlug("");
                setIsCreating(false);
                setStatus("Page deleted.");
            }
        } catch  {
            setStatus("Delete failed.");
        } finally{
            setSaving(false);
        }
    }
    async function handleLogin(user, pass) {
        setSaving(true);
        try {
            const res = await fetch("/api/admin/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user,
                    pass
                })
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
        } catch  {
            setStatus("Login request failed");
        } finally{
            setSaving(false);
        }
    }
    async function handleLogout() {
        await fetch("/api/admin/logout", {
            method: "POST"
        });
        setAuthenticated(false);
        setStatus("Logged out.");
    }
    async function handleUpload(file, e) {
        if (!file || !authenticated) {
            setStatus("Please log in as admin to upload images.");
            return null;
        }
        setSaving(true);
        setStatus("Uploading image...");
        try {
            const formData = new FormData();
            formData.append("file", file);
            const res = await fetch("/api/admin/upload", {
                method: "POST",
                body: formData
            });
            const data = await res.json();
            if (res.ok && data.ok && data.url) {
                const newImages = [
                    ...form.images || [],
                    data.url
                ];
                const updatedForm = {
                    ...form,
                    images: newImages
                };
                setForm(updatedForm);
                // Auto-save page content to persist the new image URL immediately
                const saveRes = await fetch("/api/admin/pages", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(updatedForm)
                });
                const saveResult = await saveRes.json();
                if (saveRes.ok && saveResult.ok) {
                    setPages((current)=>current.filter((item)=>item.slug !== saveResult.page.slug).concat(saveResult.page));
                    setStatus("✅ Image uploaded and saved to page!");
                } else {
                    setStatus("Image uploaded, but please click 'Save page content' to publish.");
                }
                if (e) e.target.value = "";
                return data.url;
            } else {
                setStatus(`Upload failed: ${data.error || "Unknown error"}`);
            }
        } catch (err) {
            setStatus(`Upload failed: ${err?.message || "Network error"}`);
        } finally{
            setSaving(false);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mx-auto max-w-6xl px-5 sm:px-8 py-12",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-slate-200 dark:border-slate-800",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs font-bold uppercase tracking-widest text-teal-700 dark:text-teal-400",
                                children: "Master CMS Control Panel"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/AdminPageClient.tsx",
                                lineNumber: 337,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-3xl font-display font-bold text-slate-900 dark:text-white mt-1",
                                children: "Full System Admin"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/AdminPageClient.tsx",
                                lineNumber: 338,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-slate-500 dark:text-slate-400",
                                children: "Complete power to modify pages, titles, programs, navigation, contact info & messages."
                            }, void 0, false, {
                                fileName: "[project]/app/admin/AdminPageClient.tsx",
                                lineNumber: 339,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/AdminPageClient.tsx",
                        lineNumber: 336,
                        columnNumber: 9
                    }, this),
                    authenticated && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleLogout,
                        className: "btn-outline text-xs",
                        children: "Sign out"
                    }, void 0, false, {
                        fileName: "[project]/app/admin/AdminPageClient.tsx",
                        lineNumber: 342,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/AdminPageClient.tsx",
                lineNumber: 335,
                columnNumber: 7
            }, this),
            authenticated === false && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-md mx-auto my-12 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 p-8 shadow-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-xl font-bold text-slate-900 dark:text-white mb-2",
                        children: "Admin Login"
                    }, void 0, false, {
                        fileName: "[project]/app/admin/AdminPageClient.tsx",
                        lineNumber: 351,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-slate-500 dark:text-slate-400 mb-6",
                        children: "Sign in to access full site management tools."
                    }, void 0, false, {
                        fileName: "[project]/app/admin/AdminPageClient.tsx",
                        lineNumber: 352,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f$LoginForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        onLogin: handleLogin,
                        loading: saving
                    }, void 0, false, {
                        fileName: "[project]/app/admin/AdminPageClient.tsx",
                        lineNumber: 355,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/AdminPageClient.tsx",
                lineNumber: 350,
                columnNumber: 9
            }, this),
            authenticated && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-2 mb-6 border-b border-slate-200 dark:border-slate-800 pb-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setActiveTab("pages"),
                                className: `px-4 py-2 text-xs font-bold rounded uppercase tracking-wider transition-colors ${activeTab === "pages" ? "bg-teal-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"}`,
                                children: "📄 Pages & Content"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/AdminPageClient.tsx",
                                lineNumber: 364,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setActiveTab("settings"),
                                className: `px-4 py-2 text-xs font-bold rounded uppercase tracking-wider transition-colors ${activeTab === "settings" ? "bg-teal-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"}`,
                                children: "⚙️ Organization & Contact Info"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/AdminPageClient.tsx",
                                lineNumber: 374,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setActiveTab("programs"),
                                className: `px-4 py-2 text-xs font-bold rounded uppercase tracking-wider transition-colors ${activeTab === "programs" ? "bg-teal-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"}`,
                                children: "📊 Programs & Impact Stats"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/AdminPageClient.tsx",
                                lineNumber: 384,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    setActiveTab("messages");
                                    loadSubmissions();
                                },
                                className: `px-4 py-2 text-xs font-bold rounded uppercase tracking-wider transition-colors ${activeTab === "messages" ? "bg-teal-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"}`,
                                children: [
                                    "✉️ Form Enquiries (",
                                    submissions.length,
                                    ")"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/AdminPageClient.tsx",
                                lineNumber: 394,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/AdminPageClient.tsx",
                        lineNumber: 363,
                        columnNumber: 11
                    }, this),
                    status && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-4 p-3 rounded bg-teal-50 border border-teal-200 text-teal-900 text-xs font-bold",
                        children: status
                    }, void 0, false, {
                        fileName: "[project]/app/admin/AdminPageClient.tsx",
                        lineNumber: 410,
                        columnNumber: 13
                    }, this),
                    activeTab === "pages" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-6 xl:flex-row xl:gap-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                                className: "shrink-0 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 p-5 xl:w-[280px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between gap-4 mb-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-xs font-bold uppercase tracking-widest text-slate-700 dark:text-slate-300",
                                                children: "Site Pages"
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/AdminPageClient.tsx",
                                                lineNumber: 420,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: handleNewPage,
                                                className: "btn-primary text-xs px-3 py-1",
                                                children: "+ New"
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/AdminPageClient.tsx",
                                                lineNumber: 421,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/AdminPageClient.tsx",
                                        lineNumber: 419,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2",
                                        children: pageOptions.map((page)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `flex items-center justify-between gap-2 rounded px-3.5 py-2.5 transition-colors border ${page.value === selectedSlug && !isCreating ? "bg-white dark:bg-slate-800 border-teal-600 font-bold" : "bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700"}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>{
                                                            setSelectedSlug(page.value);
                                                            setIsCreating(false);
                                                        },
                                                        className: "text-left text-sm text-slate-800 dark:text-slate-200 hover:text-teal-700 truncate flex-1",
                                                        children: page.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/AdminPageClient.tsx",
                                                        lineNumber: 435,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>handleDeletePage(page.value),
                                                        className: "text-xs text-red-600 hover:underline",
                                                        children: "Delete"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/AdminPageClient.tsx",
                                                        lineNumber: 445,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, page.value, true, {
                                                fileName: "[project]/app/admin/AdminPageClient.tsx",
                                                lineNumber: 427,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/AdminPageClient.tsx",
                                        lineNumber: 425,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/AdminPageClient.tsx",
                                lineNumber: 418,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 p-6 shadow-sm flex-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid gap-4 lg:grid-cols-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "space-y-1 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400",
                                                children: [
                                                    "Page Slug",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        value: form.slug,
                                                        onChange: (e)=>setForm({
                                                                ...form,
                                                                slug: e.target.value
                                                            }),
                                                        disabled: !isCreating,
                                                        placeholder: "home, about, programs",
                                                        className: "w-full rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2 text-sm text-slate-900 dark:text-slate-100 font-normal"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/AdminPageClient.tsx",
                                                        lineNumber: 461,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/admin/AdminPageClient.tsx",
                                                lineNumber: 459,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "space-y-1 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400",
                                                children: [
                                                    "Page Label",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        value: form.label,
                                                        onChange: (e)=>setForm({
                                                                ...form,
                                                                label: e.target.value
                                                            }),
                                                        className: "w-full rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2 text-sm text-slate-900 dark:text-slate-100 font-normal"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/AdminPageClient.tsx",
                                                        lineNumber: 471,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/admin/AdminPageClient.tsx",
                                                lineNumber: 469,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/AdminPageClient.tsx",
                                        lineNumber: 458,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid gap-4 lg:grid-cols-2 mt-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "space-y-1 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400",
                                                children: [
                                                    "Browser Title",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        value: form.title,
                                                        onChange: (e)=>setForm({
                                                                ...form,
                                                                title: e.target.value
                                                            }),
                                                        className: "w-full rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2 text-sm text-slate-900 dark:text-slate-100 font-normal"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/AdminPageClient.tsx",
                                                        lineNumber: 482,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/admin/AdminPageClient.tsx",
                                                lineNumber: 480,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "space-y-1 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400",
                                                children: [
                                                    "Meta Description",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        value: form.description,
                                                        onChange: (e)=>setForm({
                                                                ...form,
                                                                description: e.target.value
                                                            }),
                                                        className: "w-full rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2 text-sm text-slate-900 dark:text-slate-100 font-normal"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/AdminPageClient.tsx",
                                                        lineNumber: 490,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/admin/AdminPageClient.tsx",
                                                lineNumber: 488,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/AdminPageClient.tsx",
                                        lineNumber: 479,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid gap-4 lg:grid-cols-2 mt-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "space-y-1 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400",
                                                children: [
                                                    "Hero Heading",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        value: form.heroHeading,
                                                        onChange: (e)=>setForm({
                                                                ...form,
                                                                heroHeading: e.target.value
                                                            }),
                                                        className: "w-full rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2 text-sm text-slate-900 dark:text-slate-100 font-normal"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/AdminPageClient.tsx",
                                                        lineNumber: 501,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/admin/AdminPageClient.tsx",
                                                lineNumber: 499,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "space-y-1 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400",
                                                children: [
                                                    "Hero Subheading",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        value: form.heroSubheading ?? "",
                                                        onChange: (e)=>setForm({
                                                                ...form,
                                                                heroSubheading: e.target.value
                                                            }),
                                                        className: "w-full rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2 text-sm text-slate-900 dark:text-slate-100 font-normal"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/AdminPageClient.tsx",
                                                        lineNumber: 509,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/admin/AdminPageClient.tsx",
                                                lineNumber: 507,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/AdminPageClient.tsx",
                                        lineNumber: 498,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid gap-4 lg:grid-cols-2 mt-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "space-y-1 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400",
                                                children: [
                                                    "Hero CTA Button Label",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        value: form.heroCtaLabel ?? "",
                                                        onChange: (e)=>setForm({
                                                                ...form,
                                                                heroCtaLabel: e.target.value
                                                            }),
                                                        className: "w-full rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2 text-sm text-slate-900 dark:text-slate-100 font-normal"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/AdminPageClient.tsx",
                                                        lineNumber: 520,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/admin/AdminPageClient.tsx",
                                                lineNumber: 518,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "space-y-1 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400",
                                                children: [
                                                    "Hero CTA Button URL",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        value: form.heroCtaHref ?? "",
                                                        onChange: (e)=>setForm({
                                                                ...form,
                                                                heroCtaHref: e.target.value
                                                            }),
                                                        className: "w-full rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2 text-sm text-slate-900 dark:text-slate-100 font-normal"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/AdminPageClient.tsx",
                                                        lineNumber: 528,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/admin/AdminPageClient.tsx",
                                                lineNumber: 526,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/AdminPageClient.tsx",
                                        lineNumber: 517,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "mt-4 block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400",
                                        children: [
                                            "Hero Text",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                value: form.heroText ?? "",
                                                onChange: (e)=>setForm({
                                                        ...form,
                                                        heroText: e.target.value
                                                    }),
                                                rows: 3,
                                                className: "mt-1 w-full rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2 text-sm text-slate-900 dark:text-slate-100 font-normal"
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/AdminPageClient.tsx",
                                                lineNumber: 538,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/AdminPageClient.tsx",
                                        lineNumber: 536,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "mt-4 block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400",
                                        children: [
                                            "Background Images",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-1 flex flex-col gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                        value: form.images.join("\n"),
                                                        onChange: (e)=>setForm({
                                                                ...form,
                                                                images: splitImages(e.target.value)
                                                            }),
                                                        rows: 3,
                                                        className: "w-full rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2 text-sm font-normal text-slate-900 dark:text-slate-100"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/AdminPageClient.tsx",
                                                        lineNumber: 549,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "file",
                                                                accept: "image/*",
                                                                onChange: (e)=>{
                                                                    const f = e.currentTarget.files ? e.currentTarget.files[0] : null;
                                                                    if (f) handleUpload(f, e);
                                                                },
                                                                className: "text-xs text-slate-700 dark:text-slate-300 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-teal-50 file:text-teal-800 hover:file:bg-teal-100 cursor-pointer"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/admin/AdminPageClient.tsx",
                                                                lineNumber: 556,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs text-slate-500",
                                                                children: "Auto-saves upon selecting an image file."
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/admin/AdminPageClient.tsx",
                                                                lineNumber: 565,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/admin/AdminPageClient.tsx",
                                                        lineNumber: 555,
                                                        columnNumber: 21
                                                    }, this),
                                                    form.images.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-2 grid grid-cols-3 sm:grid-cols-4 gap-3",
                                                        children: form.images.map((imgUrl)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "relative group rounded overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-900 aspect-video",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                        src: imgUrl,
                                                                        alt: "Hero background preview",
                                                                        className: "w-full h-full object-cover"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/admin/AdminPageClient.tsx",
                                                                        lineNumber: 572,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        type: "button",
                                                                        onClick: async ()=>{
                                                                            const newImgs = form.images.filter((i)=>i !== imgUrl);
                                                                            setForm({
                                                                                ...form,
                                                                                images: newImgs
                                                                            });
                                                                            // If it's a local upload, also delete the file
                                                                            if (imgUrl.startsWith("/uploads/")) {
                                                                                const filename = imgUrl.replace("/uploads/", "");
                                                                                await fetch(`/api/admin/upload?file=${encodeURIComponent(filename)}`, {
                                                                                    method: "DELETE"
                                                                                }).catch(()=>{});
                                                                            }
                                                                        },
                                                                        className: "absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow opacity-90 group-hover:opacity-100",
                                                                        title: "Remove image",
                                                                        children: "✕"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/admin/AdminPageClient.tsx",
                                                                        lineNumber: 573,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, imgUrl, true, {
                                                                fileName: "[project]/app/admin/AdminPageClient.tsx",
                                                                lineNumber: 571,
                                                                columnNumber: 27
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/AdminPageClient.tsx",
                                                        lineNumber: 569,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/admin/AdminPageClient.tsx",
                                                lineNumber: 548,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/AdminPageClient.tsx",
                                        lineNumber: 546,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-6 flex justify-end border-t border-slate-200 dark:border-slate-700 pt-4",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            disabled: saving,
                                            onClick: handleSavePage,
                                            className: "btn-primary",
                                            children: saving ? "Saving..." : "Save page content →"
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/AdminPageClient.tsx",
                                            lineNumber: 597,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/AdminPageClient.tsx",
                                        lineNumber: 596,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/AdminPageClient.tsx",
                                lineNumber: 457,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/AdminPageClient.tsx",
                        lineNumber: 417,
                        columnNumber: 13
                    }, this),
                    activeTab === "settings" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 p-6 shadow-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-lg font-bold text-slate-900 dark:text-white mb-4",
                                children: "Organization & Contact Info"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/AdminPageClient.tsx",
                                lineNumber: 608,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid gap-4 sm:grid-cols-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "space-y-1 text-xs font-bold uppercase text-slate-600 dark:text-slate-400",
                                        children: [
                                            "Public Site Name",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                value: settings.siteName,
                                                onChange: (e)=>setSettings({
                                                        ...settings,
                                                        siteName: e.target.value
                                                    }),
                                                className: "w-full rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2 text-sm text-slate-900 dark:text-slate-100 font-normal"
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/AdminPageClient.tsx",
                                                lineNumber: 612,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/AdminPageClient.tsx",
                                        lineNumber: 610,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "space-y-1 text-xs font-bold uppercase text-slate-600 dark:text-slate-400",
                                        children: [
                                            "Full Legal Name",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                value: settings.legalName,
                                                onChange: (e)=>setSettings({
                                                        ...settings,
                                                        legalName: e.target.value
                                                    }),
                                                className: "w-full rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2 text-sm text-slate-900 dark:text-slate-100 font-normal"
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/AdminPageClient.tsx",
                                                lineNumber: 620,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/AdminPageClient.tsx",
                                        lineNumber: 618,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "space-y-1 text-xs font-bold uppercase text-slate-600 dark:text-slate-400",
                                        children: [
                                            "Registration Number",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                value: settings.registrationNo,
                                                onChange: (e)=>setSettings({
                                                        ...settings,
                                                        registrationNo: e.target.value
                                                    }),
                                                className: "w-full rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2 text-sm text-slate-900 dark:text-slate-100 font-normal"
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/AdminPageClient.tsx",
                                                lineNumber: 628,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/AdminPageClient.tsx",
                                        lineNumber: 626,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "space-y-1 text-xs font-bold uppercase text-slate-600 dark:text-slate-400",
                                        children: [
                                            "Location / Address",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                value: settings.address,
                                                onChange: (e)=>setSettings({
                                                        ...settings,
                                                        address: e.target.value
                                                    }),
                                                className: "w-full rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2 text-sm text-slate-900 dark:text-slate-100 font-normal"
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/AdminPageClient.tsx",
                                                lineNumber: 636,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/AdminPageClient.tsx",
                                        lineNumber: 634,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "space-y-1 text-xs font-bold uppercase text-slate-600 dark:text-slate-400",
                                        children: [
                                            "Contact Email",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                value: settings.email,
                                                onChange: (e)=>setSettings({
                                                        ...settings,
                                                        email: e.target.value
                                                    }),
                                                className: "w-full rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2 text-sm text-slate-900 dark:text-slate-100 font-normal"
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/AdminPageClient.tsx",
                                                lineNumber: 644,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/AdminPageClient.tsx",
                                        lineNumber: 642,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "space-y-1 text-xs font-bold uppercase text-slate-600 dark:text-slate-400",
                                        children: [
                                            "Contact Phone",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                value: settings.phone,
                                                onChange: (e)=>setSettings({
                                                        ...settings,
                                                        phone: e.target.value
                                                    }),
                                                className: "w-full rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2 text-sm text-slate-900 dark:text-slate-100 font-normal"
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/AdminPageClient.tsx",
                                                lineNumber: 652,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/AdminPageClient.tsx",
                                        lineNumber: 650,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/AdminPageClient.tsx",
                                lineNumber: 609,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-6 flex justify-end",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    disabled: saving,
                                    onClick: handleSaveSettings,
                                    className: "btn-primary",
                                    children: saving ? "Saving..." : "Save organization info →"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/AdminPageClient.tsx",
                                    lineNumber: 661,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/admin/AdminPageClient.tsx",
                                lineNumber: 660,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/AdminPageClient.tsx",
                        lineNumber: 607,
                        columnNumber: 13
                    }, this),
                    activeTab === "programs" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 p-6 shadow-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between items-center mb-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-lg font-bold text-slate-900 dark:text-white",
                                                children: "Programs Listing Manager"
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/AdminPageClient.tsx",
                                                lineNumber: 674,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>setSettings({
                                                        ...settings,
                                                        programs: [
                                                            ...settings.programs,
                                                            {
                                                                n: `0${settings.programs.length + 1}`,
                                                                title: "New Program",
                                                                text: "Program details..."
                                                            }
                                                        ]
                                                    }),
                                                className: "btn-primary text-xs",
                                                children: "+ Add Program"
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/AdminPageClient.tsx",
                                                lineNumber: 675,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/AdminPageClient.tsx",
                                        lineNumber: 673,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-4",
                                        children: settings.programs.map((p, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "rounded border border-slate-200 dark:border-slate-700 p-4 bg-slate-50 dark:bg-slate-900 space-y-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                value: p.n,
                                                                onChange: (e)=>{
                                                                    const copy = [
                                                                        ...settings.programs
                                                                    ];
                                                                    copy[i].n = e.target.value;
                                                                    setSettings({
                                                                        ...settings,
                                                                        programs: copy
                                                                    });
                                                                },
                                                                className: "w-16 rounded border px-2 py-1 text-sm font-bold text-center"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/admin/AdminPageClient.tsx",
                                                                lineNumber: 695,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                value: p.title,
                                                                onChange: (e)=>{
                                                                    const copy = [
                                                                        ...settings.programs
                                                                    ];
                                                                    copy[i].title = e.target.value;
                                                                    setSettings({
                                                                        ...settings,
                                                                        programs: copy
                                                                    });
                                                                },
                                                                className: "flex-1 rounded border px-3 py-1 text-sm font-bold"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/admin/AdminPageClient.tsx",
                                                                lineNumber: 704,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: ()=>{
                                                                    const copy = settings.programs.filter((_, idx)=>idx !== i);
                                                                    setSettings({
                                                                        ...settings,
                                                                        programs: copy
                                                                    });
                                                                },
                                                                className: "text-xs text-red-600 hover:underline px-2",
                                                                children: "Remove"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/admin/AdminPageClient.tsx",
                                                                lineNumber: 713,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/admin/AdminPageClient.tsx",
                                                        lineNumber: 694,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                        value: p.text,
                                                        onChange: (e)=>{
                                                            const copy = [
                                                                ...settings.programs
                                                            ];
                                                            copy[i].text = e.target.value;
                                                            setSettings({
                                                                ...settings,
                                                                programs: copy
                                                            });
                                                        },
                                                        rows: 2,
                                                        className: "w-full rounded border px-3 py-1.5 text-sm"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/AdminPageClient.tsx",
                                                        lineNumber: 724,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, i, true, {
                                                fileName: "[project]/app/admin/AdminPageClient.tsx",
                                                lineNumber: 693,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/AdminPageClient.tsx",
                                        lineNumber: 691,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-4 flex justify-end",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            disabled: saving,
                                            onClick: handleSaveSettings,
                                            className: "btn-primary",
                                            children: "Save programs →"
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/AdminPageClient.tsx",
                                            lineNumber: 738,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/AdminPageClient.tsx",
                                        lineNumber: 737,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/AdminPageClient.tsx",
                                lineNumber: 672,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 p-6 shadow-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between items-center mb-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-lg font-bold text-slate-900 dark:text-white",
                                                children: "Impact Statistics Manager"
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/AdminPageClient.tsx",
                                                lineNumber: 747,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>setSettings({
                                                        ...settings,
                                                        stats: [
                                                            ...settings.stats,
                                                            {
                                                                value: "100+",
                                                                label: "New metric label"
                                                            }
                                                        ]
                                                    }),
                                                className: "btn-primary text-xs",
                                                children: "+ Add Metric"
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/AdminPageClient.tsx",
                                                lineNumber: 748,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/AdminPageClient.tsx",
                                        lineNumber: 746,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid gap-3 sm:grid-cols-2",
                                        children: settings.stats.map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "rounded border border-slate-200 dark:border-slate-700 p-3 bg-slate-50 dark:bg-slate-900 flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        value: s.value,
                                                        onChange: (e)=>{
                                                            const copy = [
                                                                ...settings.stats
                                                            ];
                                                            copy[i].value = e.target.value;
                                                            setSettings({
                                                                ...settings,
                                                                stats: copy
                                                            });
                                                        },
                                                        className: "w-24 rounded border px-2 py-1 text-sm font-bold text-teal-600"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/AdminPageClient.tsx",
                                                        lineNumber: 764,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        value: s.label,
                                                        onChange: (e)=>{
                                                            const copy = [
                                                                ...settings.stats
                                                            ];
                                                            copy[i].label = e.target.value;
                                                            setSettings({
                                                                ...settings,
                                                                stats: copy
                                                            });
                                                        },
                                                        className: "flex-1 rounded border px-2 py-1 text-xs"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/AdminPageClient.tsx",
                                                        lineNumber: 773,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>{
                                                            const copy = settings.stats.filter((_, idx)=>idx !== i);
                                                            setSettings({
                                                                ...settings,
                                                                stats: copy
                                                            });
                                                        },
                                                        className: "text-xs text-red-600 hover:underline",
                                                        children: "✕"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/AdminPageClient.tsx",
                                                        lineNumber: 782,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, i, true, {
                                                fileName: "[project]/app/admin/AdminPageClient.tsx",
                                                lineNumber: 763,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/AdminPageClient.tsx",
                                        lineNumber: 761,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-4 flex justify-end",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            disabled: saving,
                                            onClick: handleSaveSettings,
                                            className: "btn-primary",
                                            children: "Save statistics →"
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/AdminPageClient.tsx",
                                            lineNumber: 796,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/AdminPageClient.tsx",
                                        lineNumber: 795,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/AdminPageClient.tsx",
                                lineNumber: 745,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/AdminPageClient.tsx",
                        lineNumber: 670,
                        columnNumber: 13
                    }, this),
                    activeTab === "messages" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 p-6 shadow-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-lg font-bold text-slate-900 dark:text-white mb-4",
                                children: [
                                    "Visitor Contact Messages (",
                                    submissions.length,
                                    ")"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/AdminPageClient.tsx",
                                lineNumber: 807,
                                columnNumber: 15
                            }, this),
                            submissions.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-slate-500 py-8 text-center",
                                children: "No contact messages received yet."
                            }, void 0, false, {
                                fileName: "[project]/app/admin/AdminPageClient.tsx",
                                lineNumber: 812,
                                columnNumber: 17
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4",
                                children: submissions.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-5 space-y-2 text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-wrap justify-between items-start gap-2 border-b border-slate-200 dark:border-slate-800 pb-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-bold text-slate-900 dark:text-white text-base",
                                                                children: s.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/admin/AdminPageClient.tsx",
                                                                lineNumber: 822,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "ml-3 text-xs px-2 py-0.5 rounded bg-teal-100 text-teal-800 font-bold uppercase",
                                                                children: s.reason
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/admin/AdminPageClient.tsx",
                                                                lineNumber: 823,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/admin/AdminPageClient.tsx",
                                                        lineNumber: 821,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs text-slate-400",
                                                        children: new Date(s.receivedAt).toLocaleString()
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/AdminPageClient.tsx",
                                                        lineNumber: 825,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/admin/AdminPageClient.tsx",
                                                lineNumber: 820,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-400",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "Contact:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/admin/AdminPageClient.tsx",
                                                                lineNumber: 830,
                                                                columnNumber: 28
                                                            }, this),
                                                            " ",
                                                            s.contact
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/admin/AdminPageClient.tsx",
                                                        lineNumber: 830,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "Preferred Method:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/admin/AdminPageClient.tsx",
                                                                lineNumber: 831,
                                                                columnNumber: 28
                                                            }, this),
                                                            " ",
                                                            s.preferredMethod,
                                                            " ",
                                                            s.preferredTime ? `(${s.preferredTime})` : ""
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/admin/AdminPageClient.tsx",
                                                        lineNumber: 831,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/admin/AdminPageClient.tsx",
                                                lineNumber: 829,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "pt-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs font-bold text-slate-500 uppercase tracking-wider mb-1",
                                                        children: "Message:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/AdminPageClient.tsx",
                                                        lineNumber: 834,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed",
                                                        children: s.message
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/AdminPageClient.tsx",
                                                        lineNumber: 835,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/admin/AdminPageClient.tsx",
                                                lineNumber: 833,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, s.id, true, {
                                        fileName: "[project]/app/admin/AdminPageClient.tsx",
                                        lineNumber: 816,
                                        columnNumber: 21
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/admin/AdminPageClient.tsx",
                                lineNumber: 814,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/AdminPageClient.tsx",
                        lineNumber: 806,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/AdminPageClient.tsx",
                lineNumber: 361,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/AdminPageClient.tsx",
        lineNumber: 333,
        columnNumber: 5
    }, this);
}
_s(AdminPageClient, "tBdXEUXR2TjKDivjkh0HG5fa52w=");
_c = AdminPageClient;
var _c;
__turbopack_context__.k.register(_c, "AdminPageClient");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/admin/LoginForm.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LoginForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function LoginForm({ onLogin, loading }) {
    _s();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [pass, setPass] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        onSubmit: (e)=>{
            e.preventDefault();
            onLogin(user, pass);
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-3 sm:grid-cols-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        value: user,
                        onChange: (e)=>setUser(e.target.value),
                        placeholder: "Username",
                        className: "rounded-2xl border px-3 py-2"
                    }, void 0, false, {
                        fileName: "[project]/app/admin/LoginForm.tsx",
                        lineNumber: 17,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        value: pass,
                        onChange: (e)=>setPass(e.target.value),
                        placeholder: "Password",
                        type: "password",
                        className: "rounded-2xl border px-3 py-2"
                    }, void 0, false, {
                        fileName: "[project]/app/admin/LoginForm.tsx",
                        lineNumber: 18,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/LoginForm.tsx",
                lineNumber: 16,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "submit",
                    disabled: loading,
                    className: "rounded-md bg-blue-900 hover:bg-blue-950 px-4 py-2 text-sm font-semibold text-white transition-colors disabled:opacity-60",
                    children: loading ? "Signing in..." : "Sign in"
                }, void 0, false, {
                    fileName: "[project]/app/admin/LoginForm.tsx",
                    lineNumber: 21,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/admin/LoginForm.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/LoginForm.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
_s(LoginForm, "lIU76d1p23cCrhrnJYIYPuitPQk=");
_c = LoginForm;
var _c;
__turbopack_context__.k.register(_c, "LoginForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_admin_1j1knyx._.js.map
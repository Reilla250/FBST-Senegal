(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/BackgroundSlideshow.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BackgroundSlideshow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function BackgroundSlideshow({ images, autoplay = true }) {
    _s();
    const [index, setIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const visibleImages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "BackgroundSlideshow.useMemo[visibleImages]": ()=>images.filter(Boolean)
    }["BackgroundSlideshow.useMemo[visibleImages]"], [
        images
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BackgroundSlideshow.useEffect": ()=>{
            if (!autoplay || visibleImages.length <= 1) {
                return;
            }
            const interval = window.setInterval({
                "BackgroundSlideshow.useEffect.interval": ()=>{
                    setIndex({
                        "BackgroundSlideshow.useEffect.interval": (current)=>(current + 1) % visibleImages.length
                    }["BackgroundSlideshow.useEffect.interval"]);
                }
            }["BackgroundSlideshow.useEffect.interval"], 7000);
            return ({
                "BackgroundSlideshow.useEffect": ()=>window.clearInterval(interval)
            })["BackgroundSlideshow.useEffect"];
        }
    }["BackgroundSlideshow.useEffect"], [
        autoplay,
        visibleImages.length
    ]);
    if (visibleImages.length === 0) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute inset-0 z-0 pointer-events-none overflow-hidden",
        children: visibleImages.map((src, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "aria-hidden": "true",
                className: `absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${idx === index ? "opacity-100" : "opacity-0"}`,
                style: {
                    backgroundImage: `url('${src}')`
                }
            }, `${src}-${idx}`, false, {
                fileName: "[project]/components/BackgroundSlideshow.tsx",
                lineNumber: 33,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/BackgroundSlideshow.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}
_s(BackgroundSlideshow, "kV3/Xa3N1pTHTh2UMrA8mfWMGx8=");
_c = BackgroundSlideshow;
var _c;
__turbopack_context__.k.register(_c, "BackgroundSlideshow");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_BackgroundSlideshow_tsx_0mt7vf4._.js.map
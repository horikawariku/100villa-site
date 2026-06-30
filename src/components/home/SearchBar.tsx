"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Search, X, ChevronDown } from "lucide-react";
import { REGION_LABEL, FEATURE_LABEL, type Region, type FeatureTag } from "@/data/types";

const REGIONS: Region[] = ["hokkaido", "tohoku", "kanto", "chubu", "kansai", "chugoku", "shikoku", "kyushu", "okinawa"];
const FEATURES: FeatureTag[] = [
    "sauna",
    "private",
    "pool",
    "ocean-view",
    "lake-view",
    "mountain-view",
    "onsen",
    "bbq",
    "fire",
    "kominka",
    "modern",
    "luxury",
    "pet-ok",
    "anniversary",
];

/**
 * テキスト + エリア + 体験 の3軸絞り込み検索バー。
 * 選択した結果はURLパラメータで保持され、同ページ内 FilteredResults が即座に反映する。
 */
export function SearchBar({ dropUp = false }: { dropUp?: boolean }) {
    const router = useRouter();
    const sp = useSearchParams();

    const selectedRegions = (sp.get("regions") || "").split(",").filter(Boolean) as Region[];
    const selectedFeatures = (sp.get("features") || "").split(",").filter(Boolean) as FeatureTag[];
    const qFromUrl = sp.get("q") || "";

    const [textInput, setTextInput] = useState(qFromUrl);
    const [openRegion, setOpenRegion] = useState(false);
    const [openFeature, setOpenFeature] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // URLが変わったらテキストも同期
    useEffect(() => {
        setTextInput(qFromUrl);
    }, [qFromUrl]);

    // ポップアップ外クリックで閉じる
    useEffect(() => {
        const onDocClick = (e: MouseEvent) => {
            if (!wrapperRef.current?.contains(e.target as Node)) {
                setOpenRegion(false);
                setOpenFeature(false);
            }
        };
        document.addEventListener("mousedown", onDocClick);
        return () => document.removeEventListener("mousedown", onDocClick);
    }, []);

    const updateUrl = (next: { q?: string; regions?: Region[]; features?: FeatureTag[] }) => {
        const params = new URLSearchParams();
        const finalQ = next.q !== undefined ? next.q : qFromUrl;
        const finalR = next.regions ?? selectedRegions;
        const finalF = next.features ?? selectedFeatures;
        if (finalQ.trim()) params.set("q", finalQ.trim());
        if (finalR.length) params.set("regions", finalR.join(","));
        if (finalF.length) params.set("features", finalF.join(","));
        const qStr = params.toString();
        router.replace(qStr ? `/?${qStr}#results` : "/", { scroll: false });
    };

    const toggleRegion = (r: Region) => {
        const next = selectedRegions.includes(r)
            ? selectedRegions.filter((x) => x !== r)
            : [...selectedRegions, r];
        updateUrl({ regions: next });
    };

    const toggleFeature = (f: FeatureTag) => {
        const next = selectedFeatures.includes(f)
            ? selectedFeatures.filter((x) => x !== f)
            : [...selectedFeatures, f];
        updateUrl({ features: next });
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        updateUrl({ q: textInput });
    };

    const clearAll = () => {
        setTextInput("");
        router.replace("/", { scroll: false });
    };

    const hasFilters = selectedRegions.length > 0 || selectedFeatures.length > 0 || !!qFromUrl;

    return (
        <div ref={wrapperRef} className="w-full max-w-2xl mx-auto relative">
            {/* メイン検索フォーム */}
            <form
                onSubmit={submit}
                className="flex items-center gap-2 bg-bg/95 border border-line shadow-sm rounded-lg overflow-hidden"
            >
                <Search className="w-4 h-4 ml-4 text-mute shrink-0" />
                <input
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder="キーワード  例: サウナ / 古民家"
                    className="flex-1 py-3.5 px-2 text-sm tracking-wider bg-transparent placeholder:text-mute focus:outline-none min-w-0"
                />
                <button
                    type="submit"
                    className="px-5 py-3.5 bg-ink text-bg text-xs tracking-widest font-medium hover:bg-gold-deep transition-colors shrink-0"
                >
                    探す
                </button>
            </form>

            {/* フィルターチップ列 */}
            <div className="flex flex-wrap items-center gap-1.5 mt-2.5 px-0.5">
                <button
                    type="button"
                    onClick={() => {
                        setOpenRegion(!openRegion);
                        setOpenFeature(false);
                    }}
                    className={`text-[10px] tracking-widest border px-3 py-1.5 inline-flex items-center gap-1 transition ${
                        openRegion ? "bg-ink text-bg border-ink" : "bg-bg/90 border-line hover:border-ink"
                    }`}
                >
                    + エリア
                    <ChevronDown className={`w-3 h-3 transition-transform ${openRegion ? "rotate-180" : ""}`} />
                </button>
                <button
                    type="button"
                    onClick={() => {
                        setOpenFeature(!openFeature);
                        setOpenRegion(false);
                    }}
                    className={`text-[10px] tracking-widest border px-3 py-1.5 inline-flex items-center gap-1 transition ${
                        openFeature ? "bg-ink text-bg border-ink" : "bg-bg/90 border-line hover:border-ink"
                    }`}
                >
                    + 体験
                    <ChevronDown className={`w-3 h-3 transition-transform ${openFeature ? "rotate-180" : ""}`} />
                </button>

                {selectedRegions.map((r) => (
                    <button
                        key={r}
                        type="button"
                        onClick={() => toggleRegion(r)}
                        className="text-[10px] tracking-widest bg-ink text-bg px-3 py-1.5 inline-flex items-center gap-1 hover:opacity-80 transition"
                    >
                        {REGION_LABEL[r]}
                        <X className="w-3 h-3" />
                    </button>
                ))}
                {selectedFeatures.map((f) => (
                    <button
                        key={f}
                        type="button"
                        onClick={() => toggleFeature(f)}
                        className="text-[10px] tracking-widest bg-gold-deep text-bg px-3 py-1.5 inline-flex items-center gap-1 hover:opacity-80 transition"
                    >
                        {FEATURE_LABEL[f]}
                        <X className="w-3 h-3" />
                    </button>
                ))}

                {hasFilters && (
                    <button
                        type="button"
                        onClick={clearAll}
                        className="text-[10px] tracking-widest text-mute px-2 py-1.5 underline underline-offset-2 hover:text-ink"
                    >
                        クリア
                    </button>
                )}
            </div>

            {/* エリアポップアップ */}
            {openRegion && (
                <div className={`absolute z-30 left-0 right-0 ${dropUp ? "bottom-full mb-2" : "mt-2"} p-3 bg-bg border border-line shadow-lg rounded-lg`}>
                    <p className="text-[10px] tracking-widest text-mute mb-2 uppercase font-medium">Area (複数可)</p>
                    <div className="flex flex-wrap gap-1.5">
                        {REGIONS.map((r) => (
                            <button
                                key={r}
                                type="button"
                                onClick={() => toggleRegion(r)}
                                className={`text-xs px-3 py-1.5 border transition ${
                                    selectedRegions.includes(r)
                                        ? "bg-ink text-bg border-ink"
                                        : "bg-bg border-line hover:border-ink"
                                }`}
                            >
                                {REGION_LABEL[r]}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* 体験ポップアップ */}
            {openFeature && (
                <div className={`absolute z-30 left-0 right-0 ${dropUp ? "bottom-full mb-2" : "mt-2"} p-3 bg-bg border border-line shadow-lg rounded-lg`}>
                    <p className="text-[10px] tracking-widest text-mute mb-2 uppercase font-medium">Feature (複数可)</p>
                    <div className="flex flex-wrap gap-1.5">
                        {FEATURES.map((f) => (
                            <button
                                key={f}
                                type="button"
                                onClick={() => toggleFeature(f)}
                                className={`text-xs px-3 py-1.5 border transition ${
                                    selectedFeatures.includes(f)
                                        ? "bg-gold-deep text-bg border-gold-deep"
                                        : "bg-bg border-line hover:border-ink"
                                }`}
                            >
                                {FEATURE_LABEL[f]}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

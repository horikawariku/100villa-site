"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { X, ChevronDown, MapPin, Sparkles } from "lucide-react";
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
 * エリア + 体験 の2軸フィルター。キーワード検索は廃止。
 * 選択は即 URL (?regions=&features=) に反映され、同ページ FilteredResults が切替わる。
 * 候補ポップアップは dropUp=true で上方向に開く（画面下部の固定ドック用）。
 */
export function SearchBar({ dropUp = false }: { dropUp?: boolean }) {
    const router = useRouter();
    const sp = useSearchParams();

    const selectedRegions = (sp.get("regions") || "").split(",").filter(Boolean) as Region[];
    const selectedFeatures = (sp.get("features") || "").split(",").filter(Boolean) as FeatureTag[];

    const [openRegion, setOpenRegion] = useState(false);
    const [openFeature, setOpenFeature] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

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

    const updateUrl = (next: { regions?: Region[]; features?: FeatureTag[] }) => {
        const params = new URLSearchParams();
        const finalR = next.regions ?? selectedRegions;
        const finalF = next.features ?? selectedFeatures;
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

    const clearAll = () => router.replace("/", { scroll: false });

    const hasFilters = selectedRegions.length > 0 || selectedFeatures.length > 0;

    const trigger = (open: boolean, active: boolean) =>
        `inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-[13px] tracking-[0.08em] transition-colors duration-200 ${
            open
                ? "border-ink bg-ink text-bg"
                : active
                  ? "border-ink/60 bg-bg text-ink"
                  : "border-line bg-bg/70 text-ink-soft hover:border-ink hover:text-ink"
        }`;

    const popupCls =`absolute z-30 left-0 right-0 ${dropUp ? "bottom-full mb-3" : "mt-3"} p-4 md:p-5 bg-bg border border-line shadow-xl rounded-2xl`;
    const optionCls = (selected: boolean) =>
        `text-xs tracking-wide px-3.5 py-2 rounded-full border transition-colors duration-200 ${
            selected ? "bg-ink text-bg border-ink" : "bg-bg border-line text-ink-soft hover:border-ink hover:text-ink"
        }`;

    return (
        <div ref={wrapperRef} className="w-full max-w-3xl mx-auto relative">
            <div className="flex items-center justify-center md:justify-start gap-2 flex-wrap">
                <span className="hidden md:inline text-[11px] tracking-[0.18em] text-mute mr-1.5">
                    宿を絞り込む
                </span>

                {/* エリア */}
                <button
                    type="button"
                    onClick={() => {
                        setOpenRegion(!openRegion);
                        setOpenFeature(false);
                    }}
                    className={trigger(openRegion, selectedRegions.length > 0)}
                    aria-expanded={openRegion}
                >
                    <MapPin className="w-4 h-4" strokeWidth={1.6} />
                    エリア
                    {selectedRegions.length > 0 && (
                        <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-gold-deep text-bg text-[10px] leading-none">
                            {selectedRegions.length}
                        </span>
                    )}
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openRegion ? "rotate-180" : ""}`} />
                </button>

                {/* 体験 */}
                <button
                    type="button"
                    onClick={() => {
                        setOpenFeature(!openFeature);
                        setOpenRegion(false);
                    }}
                    className={trigger(openFeature, selectedFeatures.length > 0)}
                    aria-expanded={openFeature}
                >
                    <Sparkles className="w-4 h-4" strokeWidth={1.6} />
                    体験
                    {selectedFeatures.length > 0 && (
                        <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-gold-deep text-bg text-[10px] leading-none">
                            {selectedFeatures.length}
                        </span>
                    )}
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openFeature ? "rotate-180" : ""}`} />
                </button>

                {/* 選択中チップ */}
                {hasFilters && <span className="hidden md:block w-px h-5 bg-line mx-1" />}
                {selectedRegions.map((r) => (
                    <button
                        key={r}
                        type="button"
                        onClick={() => toggleRegion(r)}
                        className="group text-[12px] tracking-wide rounded-full bg-ink text-bg pl-3 pr-2 py-1.5 inline-flex items-center gap-1 hover:bg-ink/85 transition-colors"
                    >
                        {REGION_LABEL[r]}
                        <X className="w-3 h-3 opacity-70 group-hover:opacity-100" />
                    </button>
                ))}
                {selectedFeatures.map((f) => (
                    <button
                        key={f}
                        type="button"
                        onClick={() => toggleFeature(f)}
                        className="group text-[12px] tracking-wide rounded-full bg-gold-deep text-bg pl-3 pr-2 py-1.5 inline-flex items-center gap-1 hover:bg-gold-deep/85 transition-colors"
                    >
                        {FEATURE_LABEL[f]}
                        <X className="w-3 h-3 opacity-70 group-hover:opacity-100" />
                    </button>
                ))}
                {hasFilters && (
                    <button
                        type="button"
                        onClick={clearAll}
                        className="text-[12px] tracking-widest text-mute px-2 py-1.5 underline underline-offset-2 hover:text-ink transition-colors"
                    >
                        クリア
                    </button>
                )}
            </div>

            {/* エリアポップアップ */}
            {openRegion && (
                <div className={popupCls}>
                    <p className="text-[11px] tracking-[0.12em] text-mute mb-3 font-medium">エリアを選ぶ（複数可）</p>
                    <div className="flex flex-wrap gap-2">
                        {REGIONS.map((r) => (
                            <button key={r} type="button" onClick={() => toggleRegion(r)} className={optionCls(selectedRegions.includes(r))}>
                                {REGION_LABEL[r]}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* 体験ポップアップ */}
            {openFeature && (
                <div className={popupCls}>
                    <p className="text-[11px] tracking-[0.12em] text-mute mb-3 font-medium">体験で選ぶ（複数可）</p>
                    <div className="flex flex-wrap gap-2">
                        {FEATURES.map((f) => (
                            <button key={f} type="button" onClick={() => toggleFeature(f)} className={optionCls(selectedFeatures.includes(f))}>
                                {FEATURE_LABEL[f]}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

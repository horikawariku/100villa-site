"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useMemo, useRef } from "react";
import { X, ChevronDown, MapPin, Sparkles } from "lucide-react";
import { getAllProperties } from "@/data/properties";
import { REGION_LABEL, FEATURE_LABEL, type Region, type FeatureTag } from "@/data/types";

/**
 * エリア + 体験 の2軸フィルター。
 * - 選択は「保留状態」に溜まり、「◯宿を見る」ボタンで初めて URL (?regions=&features=) に反映される
 *   (即時反映だと何が起きたか分からない、という UX 指摘への対応)
 * - 外クリックで保留分は破棄 (適用済み状態に戻る)
 * - 件数は FilteredResults と同一ロジック (エリア=OR / 体験=AND) でリアルタイム計算
 * - 宿が0件のエリア/体験は選択肢に出さない (行き止まり防止)
 */
export function SearchBar({ dropUp = false }: { dropUp?: boolean }) {
    const router = useRouter();
    const sp = useSearchParams();

    const appliedRegions = (sp.get("regions") || "").split(",").filter(Boolean) as Region[];
    const appliedFeatures = (sp.get("features") || "").split(",").filter(Boolean) as FeatureTag[];

    // null = 保留なし (適用済みをそのまま表示)
    const [pendingR, setPendingR] = useState<Region[] | null>(null);
    const [pendingF, setPendingF] = useState<FeatureTag[] | null>(null);
    const [openRegion, setOpenRegion] = useState(false);
    const [openFeature, setOpenFeature] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const effR = pendingR ?? appliedRegions;
    const effF = pendingF ?? appliedFeatures;
    const isOpen = openRegion || openFeature;

    // 選択肢: 宿が1軒以上あるものだけ (件数付き)
    const { regionOptions, featureOptions } = useMemo(() => {
        const all = getAllProperties();
        const rCount = new Map<Region, number>();
        const fCount = new Map<FeatureTag, number>();
        for (const p of all) {
            rCount.set(p.area.region, (rCount.get(p.area.region) || 0) + 1);
            for (const f of p.features) fCount.set(f, (fCount.get(f) || 0) + 1);
        }
        return {
            regionOptions: [...rCount.entries()],
            featureOptions: [...fCount.entries()],
        };
    }, []);

    // FilteredResults と同一の絞り込みロジックで件数を計算
    const matchCount = useMemo(() => {
        let list = getAllProperties();
        if (effR.length > 0) list = list.filter((p) => effR.includes(p.area.region));
        if (effF.length > 0) list = list.filter((p) => effF.every((f) => (p.features as string[]).includes(f)));
        return list.length;
    }, [effR, effF]);

    const discardPending = () => {
        setPendingR(null);
        setPendingF(null);
        setOpenRegion(false);
        setOpenFeature(false);
    };

    // ポップアップ外クリック → 保留分を破棄して閉じる
    useEffect(() => {
        const onDocClick = (e: MouseEvent) => {
            if (!wrapperRef.current?.contains(e.target as Node)) discardPending();
        };
        document.addEventListener("mousedown", onDocClick);
        return () => document.removeEventListener("mousedown", onDocClick);
    }, []);

    const toggleR = (r: Region) => {
        const base = pendingR ?? appliedRegions;
        setPendingR(base.includes(r) ? base.filter((x) => x !== r) : [...base, r]);
    };
    const toggleF = (f: FeatureTag) => {
        const base = pendingF ?? appliedFeatures;
        setPendingF(base.includes(f) ? base.filter((x) => x !== f) : [...base, f]);
    };

    const apply = () => {
        const params = new URLSearchParams();
        if (effR.length) params.set("regions", effR.join(","));
        if (effF.length) params.set("features", effF.join(","));
        const qStr = params.toString();
        router.replace(qStr ? `/?${qStr}#results` : "/", { scroll: false });
        setPendingR(null);
        setPendingF(null);
        setOpenRegion(false);
        setOpenFeature(false);
        // 絞り込み結果までスクロール (結果セクションはページ最上部に描画される)
        setTimeout(() => {
            document.getElementById("results")?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 200);
    };

    const clearAll = () => {
        setPendingR(null);
        setPendingF(null);
        setOpenRegion(false);
        setOpenFeature(false);
        router.replace("/", { scroll: false });
    };

    const clearPending = () => {
        setPendingR([]);
        setPendingF([]);
    };

    const hasApplied = appliedRegions.length > 0 || appliedFeatures.length > 0;
    const pendingChanged = pendingR !== null || pendingF !== null;

    // トリガーラベル: 1件選択ならその名前、複数なら件数
    const regionLabel =
        effR.length === 1 ? `エリア・${REGION_LABEL[effR[0]]}` : "エリア";
    const featureLabel =
        effF.length === 1 ? `体験・${FEATURE_LABEL[effF[0]]}` : "体験";

    const trigger = (open: boolean, active: boolean) =>
        `inline-flex items-center gap-2 rounded-full border px-5 min-h-[44px] text-[13px] font-semibold tracking-[0.04em] transition-colors duration-200 ${
            open || active
                ? "border-ink bg-ink text-bg"
                : "border-line-strong bg-bg-card text-ink hover:border-ink"
        }`;

    const popupCls = `absolute z-30 left-0 right-0 ${dropUp ? "bottom-full mb-3" : "mt-3"} p-4 md:p-5 bg-bg-card border border-line-strong shadow-xl rounded-2xl animate-pop-in`;
    const optionCls = (selected: boolean) =>
        `inline-flex items-center gap-1.5 text-[13px] font-medium tracking-wide px-4 min-h-[40px] rounded-full border transition-colors duration-200 ${
            selected
                ? "bg-ink text-bg border-ink"
                : "bg-bg-card border-line-strong text-ink hover:border-ink"
        }`;

    const popupFooter = (
        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-line">
            <button
                type="button"
                onClick={apply}
                disabled={matchCount === 0}
                className={`flex-1 rounded-xl min-h-[46px] text-[14px] font-semibold tracking-[0.04em] transition-colors ${
                    matchCount === 0
                        ? "bg-line text-mute cursor-not-allowed"
                        : "bg-ink text-bg hover:bg-ink/90"
                }`}
            >
                {matchCount === 0 ? "該当なし — 条件を減らしてください" : `${matchCount}宿を見る`}
            </button>
            <button
                type="button"
                onClick={clearPending}
                className="text-[13px] font-medium text-ink-soft px-2 py-2 underline underline-offset-4 hover:text-ink transition-colors"
            >
                クリア
            </button>
        </div>
    );

    return (
        <div ref={wrapperRef} className="w-full max-w-3xl mx-auto relative">
            <div className="flex items-center justify-center md:justify-start gap-2 flex-wrap">
                {/* エリア */}
                <button
                    type="button"
                    onClick={() => {
                        setOpenRegion(!openRegion);
                        setOpenFeature(false);
                    }}
                    className={trigger(openRegion, effR.length > 0)}
                    aria-expanded={openRegion}
                >
                    <MapPin className="w-4 h-4" strokeWidth={2} />
                    {regionLabel}
                    {effR.length > 1 && (
                        <span className="inline-flex items-center justify-center min-w-[20px] h-[20px] px-1 rounded-full bg-accent text-bg text-[11px] font-semibold leading-none">
                            {effR.length}
                        </span>
                    )}
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openRegion ? "rotate-180" : ""}`} strokeWidth={2} />
                </button>

                {/* 体験 */}
                <button
                    type="button"
                    onClick={() => {
                        setOpenFeature(!openFeature);
                        setOpenRegion(false);
                    }}
                    className={trigger(openFeature, effF.length > 0)}
                    aria-expanded={openFeature}
                >
                    <Sparkles className="w-4 h-4" strokeWidth={2} />
                    {featureLabel}
                    {effF.length > 1 && (
                        <span className="inline-flex items-center justify-center min-w-[20px] h-[20px] px-1 rounded-full bg-accent text-bg text-[11px] font-semibold leading-none">
                            {effF.length}
                        </span>
                    )}
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openFeature ? "rotate-180" : ""}`} strokeWidth={2} />
                </button>

                {/* 適用済みの解除 (ポップアップを開いていない時のみ表示) */}
                {hasApplied && !isOpen && !pendingChanged && (
                    <button
                        type="button"
                        onClick={clearAll}
                        className="text-[13px] font-medium tracking-wide text-ink-soft px-2 min-h-[44px] underline underline-offset-4 hover:text-ink transition-colors"
                    >
                        <X className="w-3.5 h-3.5 inline -mt-0.5 mr-0.5" />
                        解除
                    </button>
                )}
            </div>

            {/* エリアポップアップ */}
            {openRegion && (
                <div className={popupCls}>
                    <p className="text-[12px] tracking-[0.1em] text-ink font-semibold mb-3">エリアを選ぶ（複数可）</p>
                    <div className="flex flex-wrap gap-2">
                        {regionOptions.map(([r, n]) => (
                            <button key={r} type="button" onClick={() => toggleR(r)} className={optionCls(effR.includes(r))}>
                                {effR.includes(r) && <span aria-hidden>✓</span>}
                                {REGION_LABEL[r]}
                                <span className={`text-[11px] ${effR.includes(r) ? "text-bg/70" : "text-mute"}`}>{n}</span>
                            </button>
                        ))}
                    </div>
                    {popupFooter}
                </div>
            )}

            {/* 体験ポップアップ */}
            {openFeature && (
                <div className={popupCls}>
                    <p className="text-[12px] tracking-[0.1em] text-ink font-semibold mb-3">体験で選ぶ（複数可）</p>
                    <div className="flex flex-wrap gap-2">
                        {featureOptions.map(([f, n]) => (
                            <button key={f} type="button" onClick={() => toggleF(f)} className={optionCls(effF.includes(f))}>
                                {effF.includes(f) && <span aria-hidden>✓</span>}
                                {FEATURE_LABEL[f]}
                                <span className={`text-[11px] ${effF.includes(f) ? "text-bg/70" : "text-mute"}`}>{n}</span>
                            </button>
                        ))}
                    </div>
                    {popupFooter}
                </div>
            )}
        </div>
    );
}

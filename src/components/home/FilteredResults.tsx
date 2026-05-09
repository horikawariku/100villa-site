"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { PropertyCard } from "@/components/property/PropertyCard";
import { getAllProperties } from "@/data/properties";
import { searchProperties } from "@/data/search";
import type { Region, FeatureTag } from "@/data/types";
import { REGION_LABEL, FEATURE_LABEL } from "@/data/types";

/**
 * URLクエリ (?q=&regions=&features=) を読み取って絞り込み結果を表示。
 * フィルター無しなら null (非表示)。SearchBar と連動してその場切替を実現。
 */
export function FilteredResults() {
    const sp = useSearchParams();
    const q = sp.get("q") || "";
    const regions = (sp.get("regions") || "").split(",").filter(Boolean) as Region[];
    const features = (sp.get("features") || "").split(",").filter(Boolean) as FeatureTag[];

    const hasFilter = !!q || regions.length > 0 || features.length > 0;

    const results = useMemo(() => {
        if (!hasFilter) return [];
        let list = getAllProperties();
        if (regions.length > 0) {
            list = list.filter((p) => regions.includes(p.area.region));
        }
        if (features.length > 0) {
            list = list.filter((p) =>
                features.every((f) => (p.features as string[]).includes(f)),
            );
        }
        if (q) {
            const found = searchProperties(q);
            const ids = new Set(found.map((p) => p.id));
            list = list.filter((p) => ids.has(p.id));
        }
        return list;
    }, [q, regions, features, hasFilter]);

    if (!hasFilter) return null;

    const labels: string[] = [];
    if (q) labels.push(`「${q}」`);
    regions.forEach((r) => labels.push(REGION_LABEL[r]));
    features.forEach((f) => labels.push(FEATURE_LABEL[f]));

    return (
        <section id="results" className="py-8 md:py-12 bg-bg-card/50 border-y border-line">
            <div className="container mx-auto px-5 md:px-7">
                <div className="flex items-end justify-between gap-3 mb-6 md:mb-8">
                    <div>
                        <p className="text-[10px] tracking-[0.3em] uppercase text-gold-deep font-display mb-1.5">
                            Filtered
                        </p>
                        <h2 className="font-mincho text-xl md:text-2xl font-bold tracking-wide">
                            絞り込み結果
                            <span className="ml-2 text-sm md:text-base text-mute font-normal">
                                {results.length} 件
                            </span>
                        </h2>
                        <p className="text-[11px] tracking-wide text-mute mt-1">
                            {labels.join(" / ")}
                        </p>
                    </div>
                </div>

                {results.length === 0 ? (
                    <div className="text-center py-12 text-mute text-sm">
                        条件に該当する宿が見つかりませんでした。フィルターを変更してください。
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
                        {results.map((p) => (
                            <PropertyCard key={p.id} property={p} size="md" />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

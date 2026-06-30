"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Search } from "lucide-react";
import { PropertyCard } from "@/components/property/PropertyCard";
import { searchProperties, getAllProperties } from "@/data/properties";
import { FEATURE_LABEL, REGION_LABEL } from "@/data/types";
import type { Property } from "@/data/types";

function SearchContent() {
    const params = useSearchParams();
    const router = useRouter();
    const initialQ = params.get("q") ?? "";
    const [q, setQ] = useState(initialQ);
    const [results, setResults] = useState<Property[]>([]);

    useEffect(() => {
        if (initialQ) setResults(searchProperties(initialQ));
    }, [initialQ]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!q.trim()) return;
        router.push(`/search?q=${encodeURIComponent(q.trim())}`);
        setResults(searchProperties(q));
    };

    const all = getAllProperties();

    return (
        <main className="pt-24 md:pt-32 pb-20 md:pb-24">
            <div className="container mx-auto px-5 md:px-7 max-w-4xl">
                <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-ink-soft font-medium mb-2">
                    Search
                </p>
                <h1 className="font-sans text-3xl md:text-5xl font-bold tracking-wide mb-7 md:mb-9">
                    宿を探す
                </h1>

                <form onSubmit={submit} className="flex items-center gap-2 bg-bg border border-line shadow-sm">
                    <Search className="w-4 h-4 ml-4 text-mute shrink-0" />
                    <input
                        autoFocus
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder="エリア・体験で検索"
                        className="flex-1 py-3.5 px-2 text-sm tracking-wider bg-transparent placeholder:text-mute focus:outline-none"
                    />
                    <button
                        type="submit"
                        className="px-5 py-3.5 bg-ink text-bg text-xs tracking-widest font-medium hover:bg-gold-deep transition-colors"
                    >
                        探す
                    </button>
                </form>

                {/* 検索例 (実際の検索行動) */}
                <div className="flex flex-wrap gap-1.5 mt-3 mb-12">
                    <span className="text-[10px] text-mute tracking-widest mr-1 self-center">例:</span>
                    {["滋賀 サウナ", "カップル 沖縄", "軽井沢", "合宿 関東", "古民家 温泉", "犬OK"].map((eg) => (
                        <button
                            key={eg}
                            onClick={() => {
                                setQ(eg);
                                router.push(`/search?q=${encodeURIComponent(eg)}`);
                                setResults(searchProperties(eg));
                            }}
                            className="text-[11px] tracking-widest px-2.5 py-1 border border-line text-ink-soft hover:border-ink hover:text-ink transition-colors"
                        >
                            {eg}
                        </button>
                    ))}
                </div>

                {/* 結果 */}
                {initialQ && (
                    <>
                        <p className="text-sm tracking-wide text-ink-soft mb-6">
                            「<strong>{initialQ}</strong>」の検索結果: {results.length} 件
                        </p>
                        {results.length === 0 ? (
                            <div className="py-14 text-center text-mute text-sm">
                                該当する宿が見つかりませんでした。
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mb-14">
                                {results.map((p) => (
                                    <PropertyCard key={p.id} property={p} size="md" />
                                ))}
                            </div>
                        )}
                    </>
                )}

                {/* 検索ヒント */}
                <div className="mt-10 pt-10 border-t border-line">
                    <p className="text-[10px] tracking-[0.3em] uppercase text-ink-soft font-medium mb-4">
                        Quick Browse
                    </p>
                    <div className="space-y-5">
                        <div>
                            <p className="text-xs tracking-widest text-mute mb-2">エリア</p>
                            <div className="flex flex-wrap gap-1.5">
                                {Object.entries(REGION_LABEL).map(([region, label]) => (
                                    <Link
                                        key={region}
                                        href={`/area/${region}`}
                                        className="text-[11px] tracking-widest px-2.5 py-1 border border-line hover:border-ink transition-colors"
                                    >
                                        {label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="text-xs tracking-widest text-mute mb-2">体験</p>
                            <div className="flex flex-wrap gap-1.5">
                                {Object.entries(FEATURE_LABEL).map(([f, label]) => (
                                    <Link
                                        key={f}
                                        href={`/feature/${f}`}
                                        className="text-[11px] tracking-widest px-2.5 py-1 border border-line hover:border-ink transition-colors"
                                    >
                                        {label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 全宿一覧 (検索なし時のフォールバック) */}
                {!initialQ && (
                    <div className="mt-14 pt-10 border-t border-line">
                        <p className="text-[10px] tracking-[0.3em] uppercase text-ink-soft font-medium mb-4">
                            All Stays
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                            {all.map((p) => (
                                <PropertyCard key={p.id} property={p} size="md" />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div className="pt-32 text-center text-sm text-mute">読み込み中...</div>}>
            <SearchContent />
        </Suspense>
    );
}

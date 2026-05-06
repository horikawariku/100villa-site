"use client";

import { useEffect, useState } from "react";
import { PropertyCard } from "./PropertyCard";
import { PROPERTIES } from "@/data/properties";
import type { Property } from "@/data/types";

const STORAGE_KEY = "100villa.recentlyViewed";
const MAX_HISTORY = 6;

/** 物件ページで呼んで履歴に追加 (Hook) */
export function useTrackRecentlyViewed(propertyId: string) {
    useEffect(() => {
        if (typeof window === "undefined") return;
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            const ids: string[] = raw ? JSON.parse(raw) : [];
            const next = [propertyId, ...ids.filter((id) => id !== propertyId)].slice(0, MAX_HISTORY);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {}
    }, [propertyId]);
}

interface Props {
    /** 表示時に除外したい物件ID (現在表示中の物件) */
    excludeId?: string;
}

export function RecentlyViewed({ excludeId }: Props) {
    const [items, setItems] = useState<Property[]>([]);
    useEffect(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            const ids: string[] = raw ? JSON.parse(raw) : [];
            const list = ids
                .filter((id) => id !== excludeId)
                .map((id) => PROPERTIES.find((p) => p.id === id))
                .filter((p): p is Property => !!p)
                .slice(0, 4);
            setItems(list);
        } catch {}
    }, [excludeId]);

    if (items.length === 0) return null;
    return (
        <section className="border-t border-line py-12 md:py-16 bg-bg-card/40">
            <div className="container mx-auto px-5 md:px-7">
                <div className="mb-6 md:mb-8">
                    <p className="text-[10px] tracking-[0.3em] uppercase text-gold-deep font-display mb-1.5">
                        Recently Viewed
                    </p>
                    <h2 className="font-mincho text-xl md:text-2xl font-bold tracking-wide">最近見た宿</h2>
                </div>
                <div className="md:hidden flex overflow-x-auto no-scrollbar gap-3 pb-2">
                    {items.map((p) => (
                        <PropertyCard key={p.id} property={p} size="sm" />
                    ))}
                </div>
                <div className="hidden md:grid md:grid-cols-4 gap-5">
                    {items.map((p) => (
                        <PropertyCard key={p.id} property={p} size="md" />
                    ))}
                </div>
            </div>
        </section>
    );
}

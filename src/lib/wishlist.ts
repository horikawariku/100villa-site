"use client";

import { useEffect, useState, useCallback } from "react";

const STORAGE_KEY = "100villa.wishlist";

/** localStorage から wishlist (slug配列) を取得 */
function readWishlist(): string[] {
    if (typeof window === "undefined") return [];
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

function writeWishlist(ids: string[]) {
    if (typeof window === "undefined") return;
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
        window.dispatchEvent(new Event("wishlist:change"));
    } catch {}
}

/** wishlist 全体を取得・購読する Hook */
export function useWishlist(): string[] {
    const [items, setItems] = useState<string[]>([]);
    useEffect(() => {
        setItems(readWishlist());
        const onChange = () => setItems(readWishlist());
        window.addEventListener("wishlist:change", onChange);
        window.addEventListener("storage", onChange);
        return () => {
            window.removeEventListener("wishlist:change", onChange);
            window.removeEventListener("storage", onChange);
        };
    }, []);
    return items;
}

/** 単一物件の状態と toggle を扱う Hook */
export function useWishlistItem(slug: string): { saved: boolean; toggle: () => void } {
    const items = useWishlist();
    const saved = items.includes(slug);
    const toggle = useCallback(() => {
        const current = readWishlist();
        const next = current.includes(slug)
            ? current.filter((id) => id !== slug)
            : [slug, ...current];
        writeWishlist(next);
    }, [slug]);
    return { saved, toggle };
}

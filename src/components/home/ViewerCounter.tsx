"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { siteMeta } from "@/data/siteMeta";

interface Props {
    className?: string;
    minCount?: number;
}

/**
 * 本日の閲覧数表示 (redirect-tracker /api/viewer-count?p=100villa)。
 * 画面の social proof 用。minCount未満なら非表示。
 */
export function ViewerCounter({ className = "text-bg/85", minCount = 1 }: Props) {
    const [count, setCount] = useState<number | null>(null);

    useEffect(() => {
        let cancelled = false;
        fetch(`${siteMeta.trackerOrigin}/api/viewer-count?p=100villa`)
            .then((r) => (r.ok ? r.json() : null))
            .then((d: { count?: number } | null) => {
                if (cancelled) return;
                if (d && typeof d.count === "number" && d.count >= minCount) {
                    setCount(d.count);
                }
            })
            .catch(() => {});
        return () => {
            cancelled = true;
        };
    }, [minCount]);

    if (count === null) return null;

    return (
        <div className={`inline-flex items-center gap-1.5 text-[10px] md:text-[11px] tracking-[0.15em] font-light ${className}`}>
            <Eye size={12} strokeWidth={1.4} />
            <span>本日 {count} 人が閲覧中</span>
        </div>
    );
}

"use client";

import { ArrowUpRight } from "lucide-react";
import { bookingUrl } from "@/data/siteMeta";
import type { Property } from "@/data/types";

interface Props {
    property: Property;
    /** CTAの設置場所を識別 (トラッキング用) */
    placement: "top" | "mid" | "bottom" | "sticky";
    variant?: "primary" | "outline";
    fullWidth?: boolean;
}

/**
 * 公式サイトへ遷移するCTA。
 * redirect-tracker 経由で click_id cookie が設定されるため、
 * 後日その公式サイトで予約があれば成果として計上される。
 */
export function OfficialSiteCTA({ property, placement, variant = "primary", fullWidth = false }: Props) {
    const url = bookingUrl({
        propertyId: property.redirectId,
        source: "100villa",
        cta: `100villa-${placement}`,
        campaign: property.id,
    });
    const base = fullWidth ? "w-full" : "inline-flex";
    if (variant === "outline") {
        return (
            <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${base} group items-center justify-center gap-2 px-6 py-3 border border-ink hover:bg-ink hover:text-bg text-sm tracking-widest font-medium transition-colors`}
            >
                公式サイトを見る
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
        );
    }
    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${base} group items-center justify-center gap-2 px-7 py-3.5 bg-ink text-bg hover:bg-gold-deep text-sm tracking-widest font-medium transition-colors`}
        >
            公式サイトを見る
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
    );
}

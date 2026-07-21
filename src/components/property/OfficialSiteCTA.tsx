"use client";

import { ArrowUpRight } from "lucide-react";
import { bookingUrl, mysaSiteUrl, withVisitorId } from "@/data/siteMeta";
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
    // mysa宿は mysa-site の宿ページへ（そこからBeds24予約=redirect経由で100villa成果に計上）
    const url =
        mysaSiteUrl(property.id, "100villa") ??
        bookingUrl({
            propertyId: property.redirectId,
            source: "100villa",
            cta: `100villa-${placement}`,
            campaign: property.id,
        });
    const base = fullWidth ? "w-full" : "inline-flex";
    // クリック直前に訪問者IDを付与 (cookieはクリック時点で読む必要があるため href を書き換える)
    const attachVid = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.currentTarget.href = withVisitorId(url);
    };
    if (variant === "outline") {
        return (
            <a
                href={url}
                onClick={attachVid}
                target="_blank"
                rel="noopener noreferrer"
                className={`${base} press group items-center justify-center gap-2 px-6 py-3 border border-ink hover:bg-ink hover:text-bg text-sm tracking-widest font-medium transition-colors`}
            >
                公式サイトを見る
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
        );
    }
    return (
        <a
            href={url}
            onClick={attachVid}
            target="_blank"
            rel="noopener noreferrer"
            className={`${base} press group items-center justify-center gap-2 px-7 py-3.5 bg-ink text-bg hover:bg-accent text-sm tracking-widest font-medium transition-colors`}
        >
            公式サイトを見る
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
    );
}

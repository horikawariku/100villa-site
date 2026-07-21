"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { bookingUrl, mysaSiteUrl, withVisitorId } from "@/data/siteMeta";
import type { Property } from "@/data/types";

interface Props {
    property: Property;
}

/**
 * 画面下に常時固定される予約バー（mysa風）。全ブレークポイントで表示し、
 * ヒーローを隠さないようスクロールが少し進んでから出現する。
 * mysa宿は mysa-site へ、それ以外は redirect-tracker 経由で公式へ（成果計測を維持）。
 */
export function StickyBookBar({ property: p }: Props) {
    const [show, setShow] = useState(false);
    useEffect(() => {
        const onScroll = () => setShow((window.scrollY || 0) > 440);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const url =
        mysaSiteUrl(p.id, "100villa") ??
        bookingUrl({
            propertyId: p.redirectId,
            source: "100villa",
            cta: "100villa-sticky",
            campaign: p.id,
        });

    return (
        <div
            className={`fixed inset-x-3 bottom-3 z-50 mx-auto max-w-[520px] transition-all duration-500 ${
                show ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0 pointer-events-none"
            }`}
        >
            <div className="flex items-center justify-between gap-3 rounded-2xl bg-bg-card/95 backdrop-blur border border-line shadow-[0_14px_36px_-8px_rgba(20,16,12,0.28)] py-2.5 pl-5 pr-2.5">
                <div className="min-w-0">
                    {p.pricePerPersonFrom !== undefined ? (
                        <p className="flex items-baseline gap-1 text-ink">
                            <span
                                className="font-sans text-xl md:text-[22px] font-bold tracking-tight"
                                style={{ fontVariantNumeric: "tabular-nums" }}
                            >
                                ¥{p.pricePerPersonFrom.toLocaleString()}
                            </span>
                            <span className="text-[12px] text-mute">〜 / 人</span>
                        </p>
                    ) : (
                        <p className="font-sans text-[15px] font-bold text-ink truncate">{p.name}</p>
                    )}
                    <p className="text-[10px] tracking-[0.06em] text-mute mt-0.5 truncate">
                        定員 {p.capacity.min}–{p.capacity.max}名 ・ 公式サイトへ
                    </p>
                </div>
                <a
                    href={url}
                    onClick={(e) => { e.currentTarget.href = withVisitorId(url); }}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="press shrink-0 inline-flex items-center gap-1.5 rounded-xl bg-ink text-bg px-6 py-3 text-sm font-bold tracking-wide hover:bg-accent transition-colors"
                >
                    予約へ
                    <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
                </a>
            </div>
        </div>
    );
}

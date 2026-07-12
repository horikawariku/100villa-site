"use client";

import Link from "next/link";
import Image from "next/image";
import type { Property } from "@/data/types";
import { HeartButton } from "./HeartButton";

interface Props {
    property: Property;
    /** カードサイズバリエーション */
    size?: "sm" | "md" | "lg";
}

const SIZE_CLASS: Record<NonNullable<Props["size"]>, { card: string; img: string }> = {
    sm: { card: "w-[64vw] max-w-[280px]", img: "aspect-[4/5]" },
    md: { card: "w-full", img: "aspect-[4/5]" },
    lg: { card: "w-full", img: "aspect-[3/4]" },
};

/**
 * earthboat / mysa 調のクリーンカード。
 * 写真 (角丸) の下にクリーム地で「地名 / 宿名 / 金額」のみ。
 */
export function PropertyCard({ property: p, size = "md" }: Props) {
    const cls = SIZE_CLASS[size];

    return (
        <div className={`group relative ${cls.card} shrink-0`}>
            <Link href={`/p/${p.id}`} className="block">
                {/* 写真 */}
                <div className={`relative ${cls.img} overflow-hidden rounded-xl bg-line`}>
                    <Image
                        src={p.mainPhoto}
                        alt={p.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, 25vw"
                    />
                </div>

                {/* 情報: 地名 / 宿名 / 金額 */}
                <div className="pt-3.5">
                    <p className="text-[11.5px] tracking-[0.1em] font-medium text-ink-soft truncate mb-1.5">
                        {p.area.prefecture}・{p.area.city}
                    </p>
                    <h3
                        className="font-sans text-[16px] md:text-[17px] font-semibold leading-[1.35] text-ink line-clamp-2 mb-1.5"
                        style={{ letterSpacing: "0.005em" }}
                    >
                        {p.name}
                    </h3>
                    {p.pricePerPersonFrom !== undefined ? (
                        <p className="text-[14.5px] font-semibold text-ink" style={{ fontVariantNumeric: "tabular-nums" }}>
                            ¥{p.pricePerPersonFrom.toLocaleString()}
                            <span className="text-[11.5px] font-medium text-ink-soft ml-0.5">〜/人</span>
                        </p>
                    ) : (
                        <p className="text-[12.5px] font-medium text-ink-soft">料金は公式サイトで</p>
                    )}
                </div>
            </Link>

            {/* 写真右上: ハート (Linkの外でナビゲーション抑止) */}
            <div className="absolute top-2.5 right-2.5 z-10">
                <HeartButton slug={p.id} />
            </div>
        </div>
    );
}

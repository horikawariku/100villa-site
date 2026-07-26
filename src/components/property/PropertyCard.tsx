"use client";

import { Link } from "next-view-transitions";
import Image from "next/image";
import type { Property } from "@/data/types";
import { HeartButton } from "./HeartButton";

interface Props {
    property: Property;
    /** カードサイズバリエーション */
    size?: "sm" | "md" | "lg";
    /**
     * View Transition 名 (詳細ページのヒーローへ写真が連続変形する)。
     * 同一ページ内で同じ宿が複数箇所に出ると名前が重複して遷移が壊れるため、
     * 「1宿1回しか出ないセクション」(AllProperties) からのみ渡すこと。
     */
    vtName?: string;
}

const SIZE_CLASS: Record<NonNullable<Props["size"]>, { card: string; img: string }> = {
    sm: { card: "w-[58vw] max-w-[260px]", img: "aspect-square" },
    md: { card: "w-full", img: "aspect-square" },
    lg: { card: "w-full", img: "aspect-square" },
};

/**
 * Airbnb調のクリーンカード。
 * 正方形写真 (角丸) の下に「宿名 / 地名 / 金額」をタイトな行間で。
 */
export function PropertyCard({ property: p, size = "md", vtName }: Props) {
    const cls = SIZE_CLASS[size];

    return (
        <div className={`group relative ${cls.card} shrink-0`}>
            <Link href={`/p/${p.id}`} className="block press">
                {/* 写真 (vtName指定時: 詳細ページのヒーローへ連続変形する) */}
                <div
                    className={`relative ${cls.img} overflow-hidden rounded-xl bg-line`}
                    style={vtName ? { viewTransitionName: vtName } : undefined}
                >
                    <Image
                        src={p.mainPhoto}
                        alt={p.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        sizes="(max-width: 768px) 50vw, 25vw"
                    />
                </div>

                {/* 情報: 宿名 / 地名 / 金額 (Airbnb順) */}
                <div className="pt-2.5">
                    <h3 className="font-sans text-[14.5px] md:text-[15px] font-semibold leading-[1.4] text-ink line-clamp-1">
                        {p.name}
                    </h3>
                    <p className="text-[13px] leading-[1.5] text-ink-soft truncate mt-[3px]">
                        {p.area.prefecture}・{p.area.city}
                    </p>
                    {p.pricePerPersonFrom !== undefined ? (
                        <p className="text-[13.5px] leading-[1.5] text-ink mt-[3px]" style={{ fontVariantNumeric: "tabular-nums" }}>
                            <span className="font-semibold">¥{p.pricePerPersonFrom.toLocaleString()}</span>
                            <span className="text-ink-soft"> 〜/人</span>
                        </p>
                    ) : (
                        <p className="text-[13px] leading-[1.5] text-ink-soft mt-[3px]">料金は公式サイトで</p>
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

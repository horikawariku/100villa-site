"use client";

import Link from "next/link";
import Image from "next/image";
import { Users } from "lucide-react";
import type { Property } from "@/data/types";
import { REGION_LABEL } from "@/data/types";
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
 * 縦長 + 全情報オーバーレイ型カード。
 * 写真左上にエリアバッジ / 右上にハート (アイコンのみ・白) / 写真下部に宿名+定員+価格。
 */
export function PropertyCard({ property: p, size = "md" }: Props) {
    const cls = SIZE_CLASS[size];
    return (
        <div className={`group relative ${cls.card} shrink-0 transition-transform duration-500 hover:-translate-y-1`}>
            <Link
                href={`/p/${p.id}`}
                className="block relative overflow-hidden rounded-2xl shadow-sm hover:shadow-lg transition-shadow"
            >
                <div className={`relative ${cls.img} overflow-hidden bg-line`}>
                    <Image
                        src={p.mainPhoto}
                        alt={p.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 from-0% via-black/20 via-35% to-transparent to-65%" />

                    {/* 左上: エリアバッジ */}
                    <div className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-bg/90 backdrop-blur-sm text-[9px] tracking-[0.25em] uppercase font-display text-ink">
                        {REGION_LABEL[p.area.region]}
                    </div>

                    {/* オーバーレイ情報 (下) */}
                    <div className="absolute inset-x-0 bottom-0 p-3 md:p-3.5 text-bg">
                        <h3 className="font-sans text-[14px] md:text-[15px] font-bold tracking-tight leading-snug line-clamp-1 mb-1">
                            {p.name}
                        </h3>
                        <div className="flex items-center justify-between gap-2 text-[11px] md:text-[12px] font-sans">
                            <span className="flex items-center gap-1 text-bg/85 whitespace-nowrap">
                                <Users className="w-3 h-3 shrink-0" />
                                <span className="font-semibold">{p.capacity.min}–{p.capacity.max}</span>
                                <span className="text-[10px] text-bg/65">名</span>
                            </span>
                            <span className="whitespace-nowrap">
                                <span className="text-bg/60">¥</span>
                                <span className="font-bold">{p.pricePerPersonFrom.toLocaleString()}</span>
                                <span className="text-bg/60 text-[10px] ml-0.5">〜/人</span>
                            </span>
                        </div>
                    </div>
                </div>
            </Link>

            {/* 右上: ハート (アイコンのみ・白) */}
            <div className="absolute top-1.5 right-1.5 z-10">
                <HeartButton slug={p.id} />
            </div>
        </div>
    );
}

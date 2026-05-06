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
    sm: { card: "w-[64vw] max-w-[280px]", img: "aspect-[4/3]" },
    md: { card: "w-full", img: "aspect-[4/3]" },
    lg: { card: "w-full", img: "aspect-[3/2]" },
};

/**
 * 横長 + 全情報オーバーレイ型カード (bestvilla.jp 風)。
 * - 写真左上にエリアバッジ
 * - 写真右上にハート (wishlist保存)
 * - 写真下部にグラデーション + 宿名 / 県・定員 / 価格 をオーバーレイ
 * - ホバーで下に浮く + 写真ズーム
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
                        sizes="(max-width: 768px) 64vw, 33vw"
                    />
                    {/* 下部グラデーション (テキスト読みやすく) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 from-0% via-black/30 via-30% to-transparent to-65%" />

                    {/* 左上: エリアバッジ */}
                    <div className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-bg/90 backdrop-blur-sm text-[9px] tracking-[0.25em] uppercase font-display text-ink">
                        {REGION_LABEL[p.area.region]}
                    </div>

                    {/* オーバーレイ情報 (下) */}
                    <div className="absolute inset-x-0 bottom-0 p-3.5 md:p-4 text-bg">
                        <h3 className="font-mincho text-base md:text-lg font-bold tracking-wide leading-snug line-clamp-1 mb-1.5">
                            {p.name}
                        </h3>
                        <div className="flex items-center justify-between text-[10px] md:text-[11px] tracking-widest">
                            <div className="flex items-center gap-2 text-bg/75">
                                <span>{p.area.prefecture}</span>
                                <span className="text-bg/30">·</span>
                                <span className="flex items-center gap-1">
                                    <Users className="w-3 h-3" />
                                    {p.capacity.min}〜{p.capacity.max}名
                                </span>
                            </div>
                            <p className="font-display">
                                <span className="text-bg/55">¥</span>
                                <span className="font-bold">{p.pricePerPersonFrom.toLocaleString()}</span>
                                <span className="text-bg/55 text-[9px] ml-0.5">〜/人</span>
                            </p>
                        </div>
                    </div>
                </div>
            </Link>

            {/* 右上: ハート (Linkの外側に配置、独立クリック領域) */}
            <div className="absolute top-2.5 right-2.5 z-10">
                <HeartButton slug={p.id} />
            </div>
        </div>
    );
}

import Image from "next/image";
import { Users, Calendar, ShieldCheck } from "lucide-react";
import type { Property } from "@/data/types";
import { OfficialSiteCTA } from "./OfficialSiteCTA";
import { HeartButton } from "./HeartButton";

interface Props {
    property: Property;
}

/**
 * 物件詳細ページのデスクトップ右側に sticky 配置するブッキングカード。
 * 写真サムネ + 価格 + 仕様 + CTA を凝縮し、スクロール中も常に視界に。
 * 数字・記号は細いゴシック (font-light) + 単色 で統一。
 */
export function BookingCard({ property: p }: Props) {
    return (
        <div className="hidden lg:block lg:sticky lg:top-24 lg:self-start">
            <div className="bg-bg-card border border-line rounded-xl shadow-sm overflow-hidden">
                {/* ミニ写真 */}
                <div className="relative aspect-[4/3]">
                    <Image
                        src={p.mainPhoto}
                        alt={p.name}
                        fill
                        className="object-cover"
                        sizes="33vw"
                    />
                    <div className="absolute top-2.5 right-2.5">
                        <HeartButton slug={p.id} />
                    </div>
                </div>

                {/* 中身 */}
                <div className="p-5 space-y-4">
                    <div>
                        <p className="text-[10px] tracking-[0.25em] uppercase text-ink-soft font-medium mb-1">
                            {p.area.prefecture}
                        </p>
                        <h3 className="font-sans text-base font-semibold leading-snug line-clamp-2 text-ink">
                            {p.name}
                        </h3>
                    </div>

                    {/* 価格 (細いゴシック・単色) */}
                    {p.pricePerPersonFrom !== undefined && (
                        <div className="flex items-baseline gap-1 pb-3 border-b border-line font-sans font-normal text-ink">
                            <span className="text-2xl">¥{p.pricePerPersonFrom.toLocaleString()}</span>
                            <span className="text-xs">〜 / 人</span>
                        </div>
                    )}

                    {/* 仕様サマリー */}
                    <div className="space-y-2 text-xs tracking-wide text-ink font-sans font-normal">
                        <div className="flex items-center gap-2">
                            <Users className="w-3.5 h-3.5" strokeWidth={1.5} />
                            <span>定員 {p.capacity.min}〜{p.capacity.max} 名</span>
                        </div>
                        {p.specs.checkIn && (
                            <div className="flex items-center gap-2">
                                <Calendar className="w-3.5 h-3.5" strokeWidth={1.5} />
                                <span>IN {p.specs.checkIn} / OUT {p.specs.checkOut}</span>
                            </div>
                        )}
                        {p.specs.cancellation && (
                            <div className="flex items-start gap-2">
                                <ShieldCheck className="w-3.5 h-3.5 mt-0.5" strokeWidth={1.5} />
                                <span className="text-[11px] leading-relaxed">{p.specs.cancellation}</span>
                            </div>
                        )}
                    </div>

                    {/* CTA */}
                    <OfficialSiteCTA property={p} placement="top" fullWidth />

                    <p className="text-[10px] text-mute text-center tracking-widest">
                        日程・空室は公式サイトでご確認ください
                    </p>
                </div>
            </div>
        </div>
    );
}

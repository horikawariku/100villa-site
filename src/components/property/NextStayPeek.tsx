import Image from "next/image";
import { Link } from "next-view-transitions";
import { ArrowRight } from "lucide-react";
import type { Property } from "@/data/types";

/**
 * 詳細ページ末尾の「次の宿」ピーク。
 * 次のカードの上端が覗いているような佇まいで、宿→宿の直接回遊を促す
 * (回遊率39.7%に対し宿間の直接遷移が少ない、というデータへの対応)。
 * 写真の viewTransitionName は付けない (同宿が SimilarProperties にも出るため重複防止)。
 */
export function NextStayPeek({ property: p }: { property: Property }) {
    return (
        <section className="mx-auto max-w-4xl px-6 md:px-8 pb-10">
            <Link
                href={`/p/${p.id}`}
                className="press group block overflow-hidden rounded-t-[24px] border border-b-0 border-line-strong bg-bg-card shadow-[0_-8px_28px_-12px_rgba(27,23,20,0.18)]"
            >
                <div className="flex items-center justify-between px-5 pt-4 pb-3">
                    <span className="text-[11px] tracking-[0.14em] font-semibold text-ink-soft">次の宿</span>
                    <ArrowRight className="w-4 h-4 text-ink-soft transition-transform group-hover:translate-x-1" strokeWidth={2} />
                </div>
                <div className="flex items-center gap-4 px-5 pb-5">
                    <div className="relative w-24 h-16 shrink-0 overflow-hidden rounded-lg bg-line">
                        <Image src={p.mainPhoto} alt={p.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="96px" />
                    </div>
                    <div className="min-w-0">
                        <p className="text-[15px] font-semibold text-ink truncate">{p.name}</p>
                        <p className="text-[11.5px] font-medium text-ink-soft mt-0.5">
                            {p.area.prefecture}・{p.area.city}
                            {p.pricePerPersonFrom !== undefined && (
                                <span className="ml-2 text-[13px] font-bold text-ink" style={{ fontVariantNumeric: "tabular-nums" }}>
                                    ¥{p.pricePerPersonFrom.toLocaleString()}
                                    <span className="text-[10.5px] font-medium text-ink-soft">〜/人</span>
                                </span>
                            )}
                        </p>
                    </div>
                </div>
            </Link>
        </section>
    );
}

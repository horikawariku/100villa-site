import Link from "next/link";
import Image from "next/image";
import { getAllProperties } from "@/data/properties";

/**
 * ホーム末尾の全幅CTA (mysa詳細ページのCTAと同じ文法)。
 * 写真は実在の featured クライアント宿のものを使用。
 * 下部固定の検索ドックとはボタン位置が重ならない (中央配置 + ドック分の余白は body 側で確保済み)。
 */
export function ClosingCTA() {
    const all = getAllProperties();
    const p = all.find((x) => x.isClient && x.featured) ?? all[0];
    if (!p) return null;

    return (
        <section className="relative h-[52vh] min-h-[380px] overflow-hidden bg-ink">
            <Image
                src={p.mainPhoto}
                alt={p.name}
                fill
                className="object-cover opacity-70"
                sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/20" />
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                <p className="text-[11px] tracking-[0.24em] uppercase text-bg/80 font-medium mb-4">
                    Find Your Stay
                </p>
                <p className="text-bg text-2xl md:text-4xl font-bold leading-snug mb-7">
                    次の週末は、どの一棟に泊まる?
                </p>
                <Link
                    href="/#all"
                    className="rounded-full bg-bg text-ink text-sm font-semibold px-8 py-3.5 hover:opacity-90 transition-opacity"
                >
                    全ての宿を見る
                </Link>
            </div>
        </section>
    );
}

import Link from "next/link";
import { Instagram } from "lucide-react";
import { siteMeta } from "@/data/siteMeta";
import { REGION_LABEL, FEATURE_LABEL } from "@/data/types";
import { ViewerCounter } from "@/components/home/ViewerCounter";

const REGIONS_FOR_FOOTER = ["hokkaido", "tohoku", "kanto", "chubu", "kansai", "chugoku", "shikoku", "kyushu", "okinawa"] as const;
const FEATURES_FOR_FOOTER = ["sauna", "private", "pool", "ocean-view", "onsen", "bbq", "kominka", "anniversary"] as const;

export function Footer() {
    return (
        <footer className="bg-ink text-bg/70">
            <div className="container mx-auto px-5 md:px-7 py-14 md:py-20">
                <div className="grid md:grid-cols-4 gap-10">
                    {/* ブランド */}
                    <div className="md:col-span-1">
                        <p className="font-display text-2xl tracking-[0.2em] font-medium text-bg mb-4">
                            {siteMeta.name}
                        </p>
                        <p className="text-[13px] leading-[1.85] text-bg/60 mb-6 max-w-[28ch]" style={{ textWrap: "pretty" }}>
                            {siteMeta.tagline}
                        </p>
                        <div className="flex items-center gap-3">
                            <a
                                href={siteMeta.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className="hover:opacity-70 transition-opacity"
                            >
                                <Instagram className="w-4 h-4 text-bg" />
                            </a>
                            <a
                                href={siteMeta.tiktok}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="TikTok"
                                className="text-[12px] tracking-[0.06em] text-bg/70 hover:text-bg transition-colors duration-300 italic"
                            >
                                tiktok
                            </a>
                        </div>
                    </div>

                    {/* エリア */}
                    <div>
                        <p className="text-[11px] tracking-[0.14em] text-gold-deep/80 mb-4 font-display italic">Area</p>
                        <ul className="space-y-2">
                            {REGIONS_FOR_FOOTER.map((r) => (
                                <li key={r}>
                                    <Link
                                        href={`/area/${r}`}
                                        className="text-[13px] tracking-[0.04em] text-bg/65 hover:text-bg transition-colors duration-300"
                                    >
                                        {REGION_LABEL[r]}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 体験 */}
                    <div>
                        <p className="text-[11px] tracking-[0.14em] text-gold-deep/80 mb-4 font-display italic">Feature</p>
                        <ul className="space-y-2">
                            {FEATURES_FOR_FOOTER.map((f) => (
                                <li key={f}>
                                    <Link
                                        href={`/feature/${f}`}
                                        className="text-[13px] tracking-[0.04em] text-bg/65 hover:text-bg transition-colors duration-300"
                                    >
                                        {FEATURE_LABEL[f]}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* About */}
                    <div>
                        <p className="text-[11px] tracking-[0.14em] text-gold-deep/80 mb-4 font-display italic">About</p>
                        <ul className="space-y-2 text-[13px] tracking-[0.04em] text-bg/65">
                            <li><Link href="/about" className="hover:text-bg transition-colors duration-300">編集部について</Link></li>
                            <li><Link href="/wishlist" className="hover:text-bg transition-colors duration-300">お気に入り</Link></li>
                            <li><a href={`mailto:`} className="hover:text-bg transition-colors duration-300">掲載希望のお問い合わせ</a></li>
                        </ul>
                        <div className="mt-6 pt-5 border-t border-bg/10 text-[12px] tracking-[0.04em] text-bg/45 leading-[1.7] italic">
                            <p>editor — {siteMeta.editor.name}</p>
                            <p className="mt-1">{siteMeta.editor.title}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-14 pt-7 border-t border-bg/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                    <p className="text-[11px] tracking-[0.06em] text-bg/40">
                        © {new Date().getFullYear()} {siteMeta.name}. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        <ViewerCounter className="text-bg/45" />
                        <p className="text-[11px] tracking-[0.06em] text-bg/40 italic">
                            本サイトは民泊メディアです。予約は各宿の公式サイトでお願いします。
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

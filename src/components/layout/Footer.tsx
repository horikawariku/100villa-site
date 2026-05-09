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
                        <p className="font-display text-2xl tracking-[0.25em] font-semibold text-bg mb-4">
                            {siteMeta.name}
                        </p>
                        <p className="text-xs tracking-widest leading-relaxed text-bg/55 mb-5">
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
                                className="text-[10px] tracking-widest text-bg/70 hover:text-bg transition-colors"
                            >
                                TIKTOK
                            </a>
                        </div>
                    </div>

                    {/* エリア */}
                    <div>
                        <p className="text-[10px] tracking-[0.3em] text-bg/45 uppercase mb-4 font-display">Area</p>
                        <ul className="space-y-2">
                            {REGIONS_FOR_FOOTER.map((r) => (
                                <li key={r}>
                                    <Link
                                        href={`/area/${r}`}
                                        className="text-xs tracking-widest text-bg/65 hover:text-bg transition-colors"
                                    >
                                        {REGION_LABEL[r]}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 体験 */}
                    <div>
                        <p className="text-[10px] tracking-[0.3em] text-bg/45 uppercase mb-4 font-display">Feature</p>
                        <ul className="space-y-2">
                            {FEATURES_FOR_FOOTER.map((f) => (
                                <li key={f}>
                                    <Link
                                        href={`/feature/${f}`}
                                        className="text-xs tracking-widest text-bg/65 hover:text-bg transition-colors"
                                    >
                                        {FEATURE_LABEL[f]}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* About */}
                    <div>
                        <p className="text-[10px] tracking-[0.3em] text-bg/45 uppercase mb-4 font-display">About</p>
                        <ul className="space-y-2 text-xs tracking-widest text-bg/65">
                            <li><Link href="/about" className="hover:text-bg transition-colors">編集部について</Link></li>
                            <li><Link href="/wishlist" className="hover:text-bg transition-colors">お気に入り</Link></li>
                            <li><a href={`mailto:`} className="hover:text-bg transition-colors">掲載希望のお問い合わせ</a></li>
                        </ul>
                        <div className="mt-6 pt-5 border-t border-bg/10 text-[10px] tracking-widest text-bg/40 leading-relaxed">
                            <p>EDITOR / {siteMeta.editor.name}</p>
                            <p className="mt-1">{siteMeta.editor.title}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-14 pt-7 border-t border-bg/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                    <p className="text-[10px] tracking-widest text-bg/35">
                        © {new Date().getFullYear()} {siteMeta.name}. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        <ViewerCounter className="text-bg/45" />
                        <p className="text-[10px] tracking-widest text-bg/35">
                            本サイトは民泊メディアです。予約は各宿の公式サイトでお願いします。
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

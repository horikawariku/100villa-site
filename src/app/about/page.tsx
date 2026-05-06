import type { Metadata } from "next";
import { siteMeta } from "@/data/siteMeta";

export const metadata: Metadata = {
    title: "編集部について",
    description: `${siteMeta.name} は、フォロワー${(siteMeta.stats.followers / 10000).toFixed(0)}万人の編集部が運営する民泊メディア。`,
};

export default function AboutPage() {
    return (
        <main className="pt-24 md:pt-32 pb-20 md:pb-24">
            <div className="container mx-auto px-5 md:px-7 max-w-2xl">
                <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-gold-deep font-display mb-2">
                    About
                </p>
                <h1 className="font-mincho text-3xl md:text-5xl font-bold tracking-wide mb-8 md:mb-10">
                    編集部について
                </h1>

                <div className="space-y-6 text-sm md:text-base text-ink-soft tracking-wide leading-loose">
                    <p>
                        {siteMeta.name} は、フォロワー{(siteMeta.stats.followers / 10000).toFixed(0)}万人の編集部が選び抜いた、
                        日本中の極上ヴィラ・宿を紹介するメディアです。
                    </p>
                    <p>
                        サウナ、貸切、絶景、古民家——
                        TikTokで日々紹介している宿を、より深く知って・比べられる場所として運営しています。
                    </p>
                    <p>
                        全宿、編集部が直接または信頼できるホストから情報を集めて掲載。
                        予約は各宿の公式サイトから直接お願いしています。
                    </p>
                </div>

                {/* スタッツ */}
                <div className="mt-12 md:mt-16 pt-10 border-t border-line grid grid-cols-3 gap-6">
                    <div>
                        <p className="font-display text-3xl md:text-4xl font-semibold leading-none">
                            {(siteMeta.stats.followers / 10000).toFixed(0)}<span className="text-lg ml-1 text-mute">万</span>
                        </p>
                        <p className="text-[10px] tracking-[0.25em] text-mute mt-2 uppercase font-display">Followers</p>
                    </div>
                    <div>
                        <p className="font-display text-3xl md:text-4xl font-semibold leading-none">
                            {siteMeta.stats.properties}<span className="text-lg ml-1 text-mute">棟</span>
                        </p>
                        <p className="text-[10px] tracking-[0.25em] text-mute mt-2 uppercase font-display">Properties</p>
                    </div>
                    <div>
                        <p className="font-display text-3xl md:text-4xl font-semibold leading-none">
                            {siteMeta.stats.prefectures}<span className="text-lg ml-1 text-mute">県</span>
                        </p>
                        <p className="text-[10px] tracking-[0.25em] text-mute mt-2 uppercase font-display">Prefectures</p>
                    </div>
                </div>

                {/* 編集者プロフィール */}
                <div className="mt-12 md:mt-16 pt-10 border-t border-line">
                    <p className="text-[10px] tracking-[0.3em] uppercase text-gold-deep font-display mb-3">
                        Editor
                    </p>
                    <p className="font-mincho text-xl md:text-2xl font-bold tracking-wide mb-2">
                        {siteMeta.editor.name}
                    </p>
                    <p className="text-xs md:text-sm tracking-widest text-mute">{siteMeta.editor.title}</p>
                </div>

                {/* 掲載お問い合わせ */}
                <div className="mt-12 md:mt-16 pt-10 border-t border-line">
                    <p className="text-[10px] tracking-[0.3em] uppercase text-gold-deep font-display mb-3">
                        For Property Owners
                    </p>
                    <h3 className="font-mincho text-lg md:text-xl font-bold tracking-wide mb-3">
                        宿の掲載をご希望の方へ
                    </h3>
                    <p className="text-sm tracking-wide text-ink-soft leading-relaxed mb-5">
                        編集部では、SNS集客と公式サイト制作・予約トラッキングを一気通貫で支援する
                        成果報酬型サービスを提供しています。
                    </p>
                    <a
                        href={siteMeta.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex px-5 py-2.5 border border-ink text-xs tracking-widest hover:bg-ink hover:text-bg transition-colors"
                    >
                        Instagram DMでご相談 →
                    </a>
                </div>
            </div>
        </main>
    );
}

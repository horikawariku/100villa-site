"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { siteMeta } from "@/data/siteMeta";
import { SearchBar } from "./SearchBar";
import { ViewerCounter } from "./ViewerCounter";

export function Hero() {
    const [imgIdx, setImgIdx] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const imgs = siteMeta.heroImages;

    useEffect(() => {
        const t = setTimeout(() => setLoaded(true), 100);
        return () => clearTimeout(t);
    }, []);
    useEffect(() => {
        const t = setInterval(() => setImgIdx((i) => (i + 1) % imgs.length), 6000);
        return () => clearInterval(t);
    }, [imgs.length]);

    return (
        <section className="relative h-[100vh] min-h-[640px] overflow-hidden bg-ink">
            {/* 背景写真 (Ken Burns slow zoom) */}
            <AnimatePresence mode="sync">
                <motion.div
                    key={imgIdx}
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ opacity: { duration: 1.8, ease: "easeInOut" }, scale: { duration: 8, ease: "easeOut" } }}
                    className="absolute inset-0"
                >
                    <Image
                        src={imgs[imgIdx]}
                        alt=""
                        fill
                        priority={imgIdx === 0}
                        className="object-cover"
                        sizes="100vw"
                    />
                </motion.div>
            </AnimatePresence>

            {/* 温かいveil (earthboat/mysa調・グレイン無し・写真を活かす) */}
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "linear-gradient(to bottom, rgba(20,16,12,0.50) 0%, rgba(20,16,12,0.26) 42%, rgba(20,16,12,0.62) 100%)",
                }}
            />

            {/* 中央: ブランド (eyebrow → wordmark → 和文サブ → en) */}
            <div className="absolute inset-0 flex flex-col items-center justify-center px-5 z-10 text-bg text-center">
                <p className="text-[11px] md:text-xs tracking-[0.34em] text-bg/85 mb-7 md:mb-9">
                    {siteMeta.tagline}
                </p>
                <h1
                    className="font-display font-medium tracking-[0.18em] text-5xl md:text-7xl lg:text-8xl leading-none"
                    style={{ textShadow: "0 2px 34px rgba(0,0,0,0.30)" }}
                >
                    100&nbsp;VILLA
                </h1>
                <p className="font-sans text-[15px] md:text-lg tracking-[0.12em] text-bg/90 mt-6 md:mt-8">
                    次に泊まりたい、一棟がここに。
                </p>
                <p className="text-[10px] md:text-[11px] tracking-[0.4em] uppercase text-bg/65 mt-4">
                    japan&apos;s best stays
                </p>
                <div className="mt-8">
                    <ViewerCounter />
                </div>
            </div>

            {/* 下部: 検索バー */}
            <div className="absolute inset-x-0 bottom-0 pb-12 md:pb-16 px-5 md:px-7 z-10">
                <div className="container mx-auto">
                    <Suspense fallback={<div className="h-14" />}>
                        <SearchBar />
                    </Suspense>
                </div>
            </div>

            {/* 写真インジケータドット (右下) */}
            <div className="absolute bottom-4 right-5 md:right-10 z-10 flex gap-1.5">
                {imgs.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setImgIdx(i)}
                        aria-label={`画像 ${i + 1}`}
                        className={`h-1 rounded-full transition-all duration-500 ${
                            i === imgIdx ? "bg-bg/85 w-5" : "bg-bg/30 w-1.5"
                        }`}
                    />
                ))}
            </div>

            {/* スクロールヒント (細い縦線・グレイン廃止) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: loaded ? 1 : 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-bg/60 pointer-events-none"
            >
                <span className="text-[10px] tracking-[0.3em] uppercase">scroll</span>
                <motion.span
                    animate={{ scaleY: [0.35, 1, 0.35] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                    className="block w-px h-8 bg-bg/45 origin-top"
                />
            </motion.div>
        </section>
    );
}

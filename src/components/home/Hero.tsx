"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { siteMeta } from "@/data/siteMeta";
import { SearchBar } from "./SearchBar";
import { ViewerCounter } from "./ViewerCounter";

export function Hero() {
    const [imgIdx, setImgIdx] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const imgs = siteMeta.heroImages;

    useEffect(() => {
        setTimeout(() => setLoaded(true), 100);
    }, []);
    useEffect(() => {
        const t = setInterval(() => setImgIdx((i) => (i + 1) % imgs.length), 5000);
        return () => clearInterval(t);
    }, [imgs.length]);

    return (
        <>
            <section className="relative h-[100vh] min-h-[680px] overflow-hidden bg-ink">
                {/* 背景写真 (Ken Burns slow zoom) */}
                <AnimatePresence mode="sync">
                    <motion.div
                        key={imgIdx}
                        initial={{ opacity: 0, scale: 1.08 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ opacity: { duration: 1.8, ease: "easeInOut" }, scale: { duration: 7, ease: "easeOut" } }}
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
                {/* 控えめ overlay (写真を見せる) */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/50" />
                {/* 微細グレイン */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-overlay"
                    style={{
                        backgroundImage:
                            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='nf'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23nf)'/%3E%3C/svg%3E\")",
                    }}
                />

                {/* キャッチコピー上部 (UNIQ 風) */}
                <div className="absolute inset-x-0 top-0 pt-24 md:pt-32 px-5 md:px-7 z-10">
                    <p
                        className="text-center text-[11px] md:text-sm tracking-[0.32em] uppercase text-bg/95 max-w-3xl mx-auto leading-relaxed font-light"
                        style={{ textWrap: "balance" }}
                    >
                        {siteMeta.tagline}
                    </p>
                </div>

                {/* 中央: 100 VILLA タイトル */}
                <div className="absolute inset-0 flex flex-col items-center justify-center px-5 md:px-7 z-10 text-bg text-center">
                    <h1 className="font-mincho italic font-light leading-[0.9]" style={{ letterSpacing: "0.005em" }}>
                        <span className="block text-7xl md:text-[10rem] lg:text-[14rem]" style={{ fontVariantNumeric: "tabular-nums" }}>100</span>
                        <span className="block text-3xl md:text-6xl lg:text-7xl mt-1 md:mt-3 not-italic font-display tracking-[0.18em]">VILLA</span>
                    </h1>
                    <p className="mt-7 md:mt-10 text-[11px] md:text-sm tracking-[0.4em] uppercase text-bg/80 font-light">
                        japan&apos;s best stays
                    </p>
                    <div className="mt-8">
                        <ViewerCounter />
                    </div>
                </div>

                {/* 下部: 検索バー */}
                <div className="absolute inset-x-0 bottom-0 pb-10 md:pb-14 px-5 md:px-7 z-10">
                    <div className="container mx-auto">
                        <Suspense fallback={<div className="h-14" />}>
                            <SearchBar />
                        </Suspense>
                    </div>
                </div>

                {/* 写真インジケータドット (右下) */}
                <div className="absolute bottom-3 right-5 md:right-10 z-10 flex gap-1.5">
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

                {/* スクロールヒント */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: loaded ? 1 : 0 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 text-bg/65 text-[10px] tracking-[0.3em] uppercase pointer-events-none"
                >
                    <span>scroll</span>
                    <motion.div animate={{ y: [0, 4, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
                        <ChevronDown className="w-3 h-3" strokeWidth={1.4} />
                    </motion.div>
                </motion.div>
            </section>
        </>
    );
}

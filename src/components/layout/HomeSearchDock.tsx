"use client";

import { Suspense, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { SearchBar } from "@/components/home/SearchBar";

/**
 * ホーム (/) のみ、画面下部に常時固定表示する検索ドック。
 * バーの高さ分だけ body に padding-bottom を付与してフッターが隠れないようにする。
 * 候補ポップアップは上方向 (dropUp) に開く。
 */
export function HomeSearchDock() {
    const pathname = usePathname();
    const isHome = pathname === "/";
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isHome) return;
        const el = ref.current;
        if (!el) return;
        const update = () => {
            // 浮遊ピル分 (下オフセット12px + 余白12px) を加算
            document.body.style.paddingBottom = `${el.offsetHeight + 24}px`;
        };
        update();
        const ro = new ResizeObserver(update);
        ro.observe(el);
        return () => {
            ro.disconnect();
            document.body.style.paddingBottom = "";
        };
    }, [isHome]);

    if (!isHome) return null;

    return (
        <div ref={ref} className="fixed bottom-3 inset-x-3 z-40 pointer-events-none">
            {/* 浮遊ピル (iOS Dock風): 全幅バーをやめ、左右に余白を持つ丸い浮遊面に */}
            <div className="pointer-events-auto mx-auto max-w-xl rounded-full site-chrome border border-line-strong shadow-[0_10px_32px_-8px_rgba(27,23,20,0.22)] px-4 py-2.5">
                <Suspense fallback={<div className="h-11" />}>
                    <SearchBar dropUp />
                </Suspense>
            </div>
        </div>
    );
}

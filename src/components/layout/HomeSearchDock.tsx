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
            document.body.style.paddingBottom = `${el.offsetHeight}px`;
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
        <div
            ref={ref}
            className="fixed bottom-0 left-0 w-full z-40 bg-bg/95 backdrop-blur-md border-t border-line"
        >
            <div className="container mx-auto px-5 md:px-7 py-3">
                <Suspense fallback={<div className="h-12" />}>
                    <SearchBar dropUp />
                </Suspense>
            </div>
        </div>
    );
}

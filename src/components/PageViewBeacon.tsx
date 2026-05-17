"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { siteMeta } from "@/data/siteMeta";

/**
 * Next.js App Router の client-side navigation でも毎回 page_view を発火させるための tracker.
 *
 * 既存の <script src=".../api/site-tracker-js" defer> はページ初回ロード時のみ発火し、
 * Link クリックでの遷移では発火しない問題があった。
 * このコンポーネントは usePathname の変化を検知してすべての route 切替で page_view を送る.
 */
export function PageViewBeacon() {
    const pathname = usePathname();

    useEffect(() => {
        let cancelled = false;
        // Next.js が <meta name="rt-property"> を新しいページの値に書き換えるのを待つため少し遅延
        const timer = setTimeout(() => {
            if (cancelled) return;
            try {
                const meta = document.querySelector<HTMLMetaElement>('meta[name="rt-property"]');
                const propertyId = meta?.content || null;

                // visitor cookie (180日)
                const cookieName = "_rt_site_vid";
                const existingMatch = document.cookie.match(new RegExp(`(?:^|; )${cookieName}=([^;]+)`));
                const fallbackMatch = document.cookie.match(/(?:^|; )_rt_cid=([^;]+)/);
                let visitorId = existingMatch?.[1] || fallbackMatch?.[1];
                if (!visitorId) {
                    visitorId = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
                        const r = (Math.random() * 16) | 0;
                        return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
                    });
                }
                document.cookie = `${cookieName}=${visitorId}; max-age=${180 * 24 * 60 * 60}; path=/; SameSite=Lax`;

                // page_type 判定
                const path = window.location.pathname.toLowerCase();
                let page_type: string;
                if (path === "/" || path === "") page_type = "site_top";
                else if (path.includes("/booking") || path.includes("/reserve") || path.includes("/reservation")) {
                    if (/(complete|confirm|done|thanks)/.test(path)) page_type = "booking_complete";
                    else page_type = "booking_page";
                } else page_type = "site_page";

                const url = `${siteMeta.trackerOrigin}/api/page-view`;
                const body = JSON.stringify({
                    visitor_id: visitorId,
                    property_id: propertyId,
                    page_type,
                    page_url: window.location.href,
                    referrer: document.referrer || null,
                });

                if (typeof fetch === "function") {
                    fetch(url, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body,
                        keepalive: true,
                        mode: "cors",
                        credentials: "omit",
                    }).catch(() => {
                        if (navigator.sendBeacon) {
                            try { navigator.sendBeacon(url, body); } catch { /* ignore */ }
                        }
                    });
                } else if (navigator.sendBeacon) {
                    navigator.sendBeacon(url, body);
                }
            } catch {
                // 失敗しても致命的じゃないので静かに諦める
            }
        }, 80);

        return () => {
            cancelled = true;
            clearTimeout(timer);
        };
    }, [pathname]);

    return null;
}

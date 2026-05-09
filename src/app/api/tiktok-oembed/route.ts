import { NextRequest, NextResponse } from "next/server";

/**
 * TikTok oEmbed プロキシ。
 * vt.tiktok.com の短縮URLでも動くよう、TikTok公式 oEmbed に委譲。
 *
 * 戻り値: { thumbnail_url, author_name, title, html, embed_url }
 * キャッシュ: 1日 (TikTok側でURL署名が回っても影響を最小化)
 */
export async function GET(req: NextRequest) {
    const url = req.nextUrl.searchParams.get("url");
    if (!url) {
        return NextResponse.json({ error: "Missing url" }, { status: 400 });
    }

    try {
        const oembedUrl = `https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`;
        const res = await fetch(oembedUrl, {
            next: { revalidate: 86400 },
            headers: { "User-Agent": "Mozilla/5.0 (compatible; 100villa-tiktok-bot)" },
        });
        if (!res.ok) {
            return NextResponse.json(
                { error: "oEmbed failed", status: res.status },
                { status: 502 },
            );
        }
        const data = await res.json();

        // html から canonical URL (cite=) と video_id を抽出 (短縮URLでも再生できるように)
        let embedUrl: string | null = null;
        let videoId: string | null = null;
        if (typeof data.html === "string") {
            const citeMatch = data.html.match(/cite="([^"]+)"/);
            if (citeMatch) embedUrl = citeMatch[1];
            const idMatch = data.html.match(/data-video-id="(\d+)"/);
            if (idMatch) videoId = idMatch[1];
        }

        return NextResponse.json(
            {
                thumbnail_url: data.thumbnail_url ?? null,
                author_name: data.author_name ?? null,
                title: data.title ?? null,
                html: data.html ?? null,
                embed_url: embedUrl,
                video_id: videoId,
            },
            {
                headers: {
                    "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
                },
            },
        );
    } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : "unknown";
        return NextResponse.json({ error: msg }, { status: 500 });
    }
}

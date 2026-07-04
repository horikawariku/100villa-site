import type { MetadataRoute } from "next";
import { siteMeta } from "@/data/siteMeta";
import { getAllProperties } from "@/data/properties";

/**
 * サイトマップ (https://<domain>/sitemap.xml)
 * 宿ページは全件、エリア/体験ページは「1宿以上存在するもの」のみ掲載
 * (空ページをインデックスさせない)。
 */
export default function sitemap(): MetadataRoute.Sitemap {
    const base = siteMeta.url;
    const props = getAllProperties();

    const regions = [...new Set(props.map((p) => p.area.region))];
    const features = [...new Set(props.flatMap((p) => p.features))];

    return [
        { url: base, changeFrequency: "daily", priority: 1 },
        { url: `${base}/search`, changeFrequency: "weekly", priority: 0.4 },
        ...props.map((p) => ({
            url: `${base}/p/${p.id}`,
            lastModified: new Date(p.publishedAt),
            changeFrequency: "weekly" as const,
            priority: 0.8,
        })),
        ...regions.map((r) => ({
            url: `${base}/area/${r}`,
            changeFrequency: "weekly" as const,
            priority: 0.5,
        })),
        ...features.map((f) => ({
            url: `${base}/feature/${f}`,
            changeFrequency: "weekly" as const,
            priority: 0.5,
        })),
    ];
}

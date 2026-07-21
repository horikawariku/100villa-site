import type { Metadata } from "next";
import { ViewTransitions } from "next-view-transitions";
import { Cinzel, Playfair_Display, Zen_Kaku_Gothic_New } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HomeSearchDock } from "@/components/layout/HomeSearchDock";
import { PageViewBeacon } from "@/components/PageViewBeacon";
import { siteMeta } from "@/data/siteMeta";
import "./globals.css";

const zenGothic = Zen_Kaku_Gothic_New({ weight: ["300", "400", "500", "700"], subsets: ["latin"], variable: "--font-zen-gothic" });
const cinzel = Cinzel({ weight: ["400", "500", "600"], subsets: ["latin"], variable: "--font-cinzel" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
    title: { default: siteMeta.name, template: `%s | ${siteMeta.name}` },
    description: siteMeta.description,
    metadataBase: new URL(siteMeta.url),
    other: {
        // redirect-tracker の site-tracker-js が読み取る宿ID (100villa media のアクセス計測用)
        "rt-property": "100villa",
    },
    openGraph: {
        title: siteMeta.name,
        description: siteMeta.description,
        url: siteMeta.url,
        siteName: siteMeta.name,
        type: "website",
        locale: "ja_JP",
        images: [{ url: siteMeta.ogImage, width: 1200, height: 630, alt: siteMeta.name }],
    },
    twitter: {
        card: "summary_large_image",
        title: siteMeta.name,
        description: siteMeta.description,
        images: [siteMeta.ogImage],
    },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <ViewTransitions>
        <html lang="ja">
            <head>
                <link rel="preconnect" href={siteMeta.trackerOrigin} />
            </head>
            <body
                className={`${zenGothic.variable} ${cinzel.variable} ${playfair.variable} antialiased bg-bg text-ink`}
                style={{ fontFamily: "var(--font-zen-gothic), system-ui, sans-serif" }}
            >
                <PageViewBeacon />
                <Header />
                {children}
                <Footer />
                <HomeSearchDock />
            </body>
        </html>
        </ViewTransitions>
    );
}

import type { Metadata } from "next";
import { Inter, Cinzel, Playfair_Display, Zen_Old_Mincho } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { siteMeta } from "@/data/siteMeta";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const cinzel = Cinzel({ weight: ["400", "500", "600", "700"], subsets: ["latin"], variable: "--font-cinzel" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const zenMincho = Zen_Old_Mincho({ weight: ["400", "500", "700"], subsets: ["latin"], variable: "--font-zen-mincho" });

export const metadata: Metadata = {
    title: { default: siteMeta.name, template: `%s | ${siteMeta.name}` },
    description: siteMeta.description,
    metadataBase: new URL(siteMeta.url),
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
        <html lang="ja">
            <body
                className={`${inter.variable} ${cinzel.variable} ${playfair.variable} ${zenMincho.variable} antialiased bg-bg text-ink`}
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
                <Header />
                {children}
                <Footer />
            </body>
        </html>
    );
}

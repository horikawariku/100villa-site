import { Hero } from "@/components/home/Hero";
import { TikTokFeed } from "@/components/home/TikTokFeed";
import { Ranking } from "@/components/home/Ranking";
import { RegionTiles } from "@/components/home/RegionTiles";
import { FeatureTiles } from "@/components/home/FeatureTiles";
import { FeaturedSection } from "@/components/home/FeaturedSection";
import { AllProperties } from "@/components/home/AllProperties";

export default function Home() {
    return (
        <main>
            <Hero />
            <TikTokFeed />
            <RegionTiles />
            <FeatureTiles />
            <FeaturedSection />
            <AllProperties />
            <Ranking />
        </main>
    );
}

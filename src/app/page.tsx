import { Suspense } from "react";
import { Hero } from "@/components/home/Hero";
import { FilteredResults } from "@/components/home/FilteredResults";
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
            {/* SearchBar の絞り込みが効いた時に最上位で表示。空のときは null */}
            <Suspense fallback={null}>
                <FilteredResults />
            </Suspense>
            <TikTokFeed />
            <RegionTiles />
            <FeatureTiles />
            <FeaturedSection />
            <AllProperties />
            <Ranking />
        </main>
    );
}

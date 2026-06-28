import { Suspense } from "react";
import { FilteredResults } from "@/components/home/FilteredResults";
import { TikTokFeed } from "@/components/home/TikTokFeed";
import { RegionTiles } from "@/components/home/RegionTiles";
import { FeatureTiles } from "@/components/home/FeatureTiles";
import { AllProperties } from "@/components/home/AllProperties";

export default function Home() {
    return (
        <main className="overflow-hidden">
            {/* 検索の絞り込みが効いた時のみ表示 (空のときは null) */}
            <Suspense fallback={null}>
                <FilteredResults />
            </Suspense>

            {/* ヒーロー: TikTokで見た宿の一覧 */}
            <TikTokFeed />

            {/* 全宿一覧 */}
            <AllProperties />

            {/* エリア / 体験 */}
            <RegionTiles />
            <FeatureTiles />
        </main>
    );
}

import { Suspense } from "react";
import { FilteredResults } from "@/components/home/FilteredResults";
import { TikTokFeed } from "@/components/home/TikTokFeed";
import { RegionTiles } from "@/components/home/RegionTiles";
import { FeatureTiles } from "@/components/home/FeatureTiles";
import { AllProperties } from "@/components/home/AllProperties";
import { PropertyRow } from "@/components/home/PropertyRow";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { getAllProperties } from "@/data/properties";

export default function Home() {
    const all = getAllProperties();
    const sauna = all.filter((p) => p.features.includes("sauna"));
    const pet = all.filter((p) => p.features.includes("pet-ok"));
    const bigGroup = all.filter((p) => p.capacity && p.capacity.max >= 10);
    const pool = all.filter((p) => p.features.includes("pool"));

    return (
        <main className="overflow-hidden">
            {/* 検索の絞り込みが効いた時のみ表示 (空のときは null) */}
            <Suspense fallback={null}>
                <FilteredResults />
            </Suspense>

            {/* ヒーロー: TikTokで見た宿の一覧 */}
            <TikTokFeed />

            {/* 全宿一覧 (ao → mysa → gozahills 固定先頭の横スクロール) */}
            <AllProperties />

            {/* カテゴリ別の横スクロール行 */}
            <PropertyRow title="サウナ付きのヴィラ" suffix={`${sauna.length}件`} href="/feature/sauna" properties={sauna} />
            <PropertyRow title="ペットOKのヴィラ" suffix={`${pet.length}件`} href="/feature/pet-ok" properties={pet} />

            {/* エリア別 */}
            <RegionTiles />

            <PropertyRow title="10人以上OKのヴィラ" suffix={`${bigGroup.length}件`} properties={bigGroup} />
            <PropertyRow title="プール付きのヴィラ" suffix={`${pool.length}件`} href="/feature/pool" properties={pool} />

            {/* その他の体験から探す */}
            <FeatureTiles />

            {/* 締めの全幅CTA */}
            <ClosingCTA />
        </main>
    );
}

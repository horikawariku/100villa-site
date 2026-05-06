"use client";

import { useTrackRecentlyViewed } from "./RecentlyViewed";

/** Server Component から呼び出すため、useEffect Hook をラップ */
export function RecordView({ propertyId }: { propertyId: string }) {
    useTrackRecentlyViewed(propertyId);
    return null;
}

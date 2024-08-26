import { _getArtists } from "@/api/SP-Artists/API-SP-Artists";
import { TrackArtist } from "@/types/SpotifyTypes/TrackArtist/type";
import { cache } from "react";

export const getDataCacheArtist = cache(async (id: string) => {
    const Artist: TrackArtist[] = await _getArtists(id);
    return Artist[0];
});
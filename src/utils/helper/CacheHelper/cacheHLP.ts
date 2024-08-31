import { _getArtists } from "@/api/SP-Artists/API-SP-Artists";
import { TrackArtist } from "@/types/SpotifyTypes/TrackArtist/type";
import { cache } from "react";

export const getDataCacheArtist = cache(async (id: string) => {
    try {
        const Artist: TrackArtist[] = await _getArtists(id);
        return Artist[0];
    }
    catch {
        return {
            external_urls: {
                spotify: ""
            },
            followers: {
                href: "",
                total: 0,
            },
            genres: Array<string>,
            href: "",
            id: "",
            images: [{
                url: "",
            }],
            name: "",
            popularity: "",
            type: "",
            uri: "",
        }
    }
});
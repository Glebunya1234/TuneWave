"use server"
import { SearchTracks, SpotifySearchResult } from "@/types/SpotifyTypes/SearchType/SearchType";
import { fetchWithRetry } from "../ApiSpotify";
import { _checkIfTracksAreSaved } from "../SP-Tracks/API-SP-Tracks";

export const _Search = async (q: string, type: string = 'album,artist,playlist,track', offset: number = 0): Promise<SpotifySearchResult | null> => {

    const url = `https://api.spotify.com/v1/search?q=${q}&type=${type}&limit=20&offset=${offset}`;

    const response = await fetchWithRetry(url);

    if (!response.ok) {
        console.log('Failed search')
        return null;

    }

    const data: SpotifySearchResult = await response.json()

    const trackIds = data?.tracks?.items?.map(track => track.id);
    if (trackIds !== undefined && data.tracks !== undefined) {
        const isSavedArray = await _checkIfTracksAreSaved(trackIds);
        const tracksWithSavedInfo = data.tracks?.items.map((item, index) => ({
            ...item,
            isSaved: isSavedArray[index],

        }));
        return {
            ...data,
            tracks: { ...data.tracks, items: tracksWithSavedInfo },
        };
    }

    return data
};
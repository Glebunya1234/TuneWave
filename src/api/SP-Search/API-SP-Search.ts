"use server"
import { SpotifySearchResult } from "@/types/SpotifyTypes/SearchType/SearchType";
import { fetchWithRetry } from "../ApiSpotify";

export const _Search = async (q: string, type: string = 'album,artist,playlist,track', offset: number = 0): Promise<SpotifySearchResult | null> => {

    const url = `https://api.spotify.com/v1/search?q=${q}&type=${type}&limit=20&offset=${offset}`;

    const response = await fetchWithRetry(url);

    if (!response.ok) {
        console.log('Failed search')
        return null;

    }

    const data: SpotifySearchResult = await response.json()
    console.log("data", data)
    return data
};
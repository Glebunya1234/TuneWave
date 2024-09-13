import { fetchWithRetry } from "../ApiSpotify";

export const _Search = async (q: string, type: string = 'album,artist,playlist,track'): Promise<SpotifySearchResult | null> => {

    const encodedQuery = encodeURIComponent(q);
    const url = `https://api.spotify.com/v1/search?q=${encodedQuery}&type=${type}&limit=1`;

    const response = await fetchWithRetry(url);

    if (!response.ok) {
        console.log('Failed search')
        return null

    }

    const data: SpotifySearchResult = await response.json()
    return data
};
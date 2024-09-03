"use server"
import { SavedTrack, SpotifyTracksResponse } from "@/types/SpotifyTypes/TrackFavoriteType/type";
import { test } from "../SP-Tokens/API-SP-Tokens";
import { CurrentlyTrack } from "@/types/SpotifyTypes/CurrentlyTrack/type";
import { fetchWithRetry } from "../ApiSpotify";

export const _getSavedTrackUser = async (count: number): Promise<SpotifyTracksResponse> => {

    const url = `https://api.spotify.com/v1/me/tracks?limit=20&offset=${count}`

    const response = await fetchWithRetry(url);
    if (!response.ok) {
        console.log('Failed to get tracks')
    }

    const newData: SpotifyTracksResponse = await response.json();
    const trackIds = newData?.items?.map(track => track.track.id);
    const isSavedArray = await _checkIfTracksAreSaved(trackIds);

    const tracksWithSavedInfo: SavedTrack[] = newData.items.map((item, index) => ({
        ...item,
        track: {
            ...item.track,
            isSaved: isSavedArray[index],
        }
    }));
    return { ...newData, items: tracksWithSavedInfo };
}


export const _checkIfTracksAreSaved = async (trackIds: string[]): Promise<boolean[]> => {

    const idsString = trackIds?.join(',');
    const url = `https://api.spotify.com/v1/me/tracks/contains?ids=${idsString}`

    const response = await fetchWithRetry(url);

    if (!response.ok) {
        console.log('Failed to check if tracks are saved')
        return [false]

    }
    const data = await response.json()
    return data
};

export const _getTrack = async (id: string): Promise<{ track: CurrentlyTrack, isSaved: Array<boolean>; }> => {

    const url = ` https://api.spotify.com/v1/tracks/${id}`
    const url2 = `https://api.spotify.com/v1/me/tracks/contains?ids=${id}`
    const response = await fetchWithRetry(url);

    if (!response) {
        console.warn("AlbumErrorrrr")

    }
    const IsSavedResponse = await fetchWithRetry(url2);

    const Data = await response.json();
    const isSaved = await IsSavedResponse.json();
    return { track: Data, isSaved: isSaved }
}
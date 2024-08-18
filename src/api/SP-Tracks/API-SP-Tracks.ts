"use server"
import { SavedTrack, SpotifyTracksResponse } from "@/types/SpotifyTypes/TrackFavoriteType/type";
import { test } from "../SP-Tokens/API-SP-Tokens";
import { CurrentlyTrack } from "@/types/SpotifyTypes/CurrentlyTrack/type";

export const _getSavedTrackUser = async (count: number): Promise<SpotifyTracksResponse> => {
    const { access_token } = await test()

    const response = await fetch(`https://api.spotify.com/v1/me/tracks?limit=20&offset=${count}`, {
        method: 'GET',
        headers: {
            // 'Authorization': `Bearer ${_refreshToken(readCache(cacheFilePathRefresh))}`,
            'Authorization': `Bearer ${access_token}`,
        },

    });
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
    const { access_token } = await test();
    const idsString = trackIds.join(',');

    const response = await fetch(`https://api.spotify.com/v1/me/tracks/contains?ids=${idsString}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${access_token}`,
        },
    });

    if (!response.ok) {
        console.log('Failed to check if tracks are saved')
        return [false]

    }
    const data = await response.json()
    return data
};

export const _getTrack = async (id: string): Promise<{ track: CurrentlyTrack, isSaved: Array<boolean>; }> => {

    const { access_token } = await test()
    const url = ` https://api.spotify.com/v1/tracks/${id}`
    const url2 = `https://api.spotify.com/v1/me/tracks/contains?ids=${id}`
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${access_token}`,
        },
    });
    if (!response) {
        console.warn("AlbumErrorrrr")

    }
    const IsSavedResponse = await fetch(url2, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${access_token}`,
        },
    });
    const Data = await response.json();
    const isSaved = await IsSavedResponse.json();
    return { track: Data, isSaved: isSaved }
}
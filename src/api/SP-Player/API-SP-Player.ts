"use server"
import { CurrentlyPlayingTrack } from "@/types/SpotifyTypes/CurrentlyPlayingTrack/type";
import { test } from "../SP-Tokens/API-SP-Tokens";
import { _CheckIsFollowArtist } from "../SP-Users/API-SP-Users";
import { fetchWithRetry, fetchWithRetryForWriteMethods } from "../ApiSpotify";

export const _getCurrentlyPlayingTrack = async (token?: string | null): Promise<CurrentlyPlayingTrack> => {
    const url = "https://api.spotify.com/v1/me/player/currently-playing"


    const response = await fetchWithRetry(url)
    if (!response.ok) {
        console.warn("Errorrrr")

    }
    const Data: CurrentlyPlayingTrack = await response.json();
    const checkedFollow = await _CheckIsFollowArtist(Data.item.artists.map(id => id.id))




    const WithSavedInfo = Data.item.artists.map((artist, index) => ({
        ...artist,
        isFollow: checkedFollow[index],

    }));

    return { ...Data, item: { ...Data.item, artists: WithSavedInfo } }
}

export const _setPlayTrack = async (uri: string) => {

    const url = 'https://api.spotify.com/v1/me/player/play';
    const options: RequestInit = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            context_uri: uri,
            offset: {
                position: 5,
            },
            position_ms: 0,
        }),
    };

    const response = await fetchWithRetryForWriteMethods(url, options);
    if (!response.ok) {
        const error = await response.json();
        console.error('Error:', error);
        return;
    }
    return null;
}

export const _UnSaveTrack = async (ids: string) => {
    const url = `https://api.spotify.com/v1/me/tracks?ids=${ids}`;
    const options: RequestInit = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const response = await fetchWithRetryForWriteMethods(url, options);

    if (!response.ok) {
        const error = await response.json();
        console.error('Error:', error);
        return;
    }
    return null;
}
export const _SaveTrack = async (ids: string) => {
    const url = `https://api.spotify.com/v1/me/tracks?ids=${ids}`;
    const options: RequestInit = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const response = await fetchWithRetryForWriteMethods(url, options);
    if (!response.ok) {
        const error = await response.json();
        console.error('Error:', error);
        return;
    }

    const data = await response.json();
    return data;

}
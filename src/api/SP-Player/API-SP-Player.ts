"use server"
import { CurrentlyPlayingTrack } from "@/types/SpotifyTypes/CurrentlyPlayingTrack/type";
import { test } from "../SP-Tokens/API-SP-Tokens";
import { _CheckIsFollowArtist } from "../SP-Users/API-SP-Users";

export const _getCurrentlyPlayingTrack = async (token?: string | null): Promise<CurrentlyPlayingTrack> => {
    const url = "https://api.spotify.com/v1/me/player/currently-playing"

    const { access_token } = await test()
    const response = await fetch(url, {

        method: 'GET',
        headers: {
            'Authorization': `Bearer ${access_token}`,
        },
    });

    if (!response) {
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
    const { access_token } = await test()
    const response = await fetch('https://api.spotify.com/v1/me/player/play', {

        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            context_uri: `${uri}`,
            offset: {
                position: 5,
            },
            position_ms: 0,
        }),
    });
    if (!response.ok) {
        const error = await response.json();
        console.error('Error:', error);
        return;
    }

    const data = await response.json();
}

export const _UnSaveTrack = async (ids: string) => {
    const { access_token } = await test()
    const response = await fetch(`https://api.spotify.com/v1/me/tracks?ids=${ids}`, {

        method: 'Delete',
        headers: {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/json',
        },

    });
    if (!response.ok) {
        const error = await response.json();
        console.error('Error:', error);
        return;
    }

    const data = await response.json();

    return data;
}
export const _SaveTrack = async (ids: string) => {
    const { access_token } = await test()
    const response = await fetch(`https://api.spotify.com/v1/me/tracks?ids=${ids}`, {

        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/json',
        },


    });
    if (!response.ok) {
        const error = await response.json();
        console.error('Error:', error);
        return;
    }

    const data = await response.json();
    return data;

}
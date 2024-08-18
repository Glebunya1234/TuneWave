"use server"
import { test } from "../SP-Tokens/API-SP-Tokens";

export const _getCurrentlyPlayingTrack = async (token?: string | null): Promise<any> => {
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
    const Data = await response.json();
    return Data
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
    console.log('Delete:', data);
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
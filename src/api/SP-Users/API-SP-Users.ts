'use server'
import { CurrentlyUserType } from "@/types/SpotifyTypes/CurrentlyUser/type";
import { test } from "../SP-Tokens/API-SP-Tokens";

export const GetUserById = async (userId: string): Promise<CurrentlyUserType> => {
    const { access_token } = await test()
    const url = `https://api.spotify.com/v1/users/${userId}`
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${access_token}`,
        },


    });
    const Data: CurrentlyUserType = await response.json();
    return Data;
}

export const _UserUnFollowArtist = async (ids: string) => {
    const { access_token } = await test()
    const response = await fetch(`https://api.spotify.com/v1/me/following?type=artist&ids=${ids}`, {

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

    await response.json();
    return
}
export const _UserFollowArtist = async (ids: string) => {
    const { access_token } = await test()
    const response = await fetch(`https://api.spotify.com/v1/me/following?type=artist&ids=${ids}`, {

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

    await response.json();
    return

}
export const _CheckIsFollowArtist = async (ids: string | string[]): Promise<boolean[]> => {
    const { access_token } = await test()
    let idsString;

    if (typeof ids === 'string') {
        idsString = ids
    }
    else {
        idsString = ids.join(',');
    }
    const encodedIds = encodeURIComponent(idsString);
    const response = await fetch(`https://api.spotify.com/v1/me/following/contains?type=artist&ids=${encodedIds}`, {

        method: 'GET',
        headers: {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const error = await response.json();
        console.error('Error:', error);
        return [false];
    }

    const data = await response.json();
    console.error('Sacces', data);
    return data

}
"use server"
import { TrackArtist, FollowedArtistType } from "@/types/SpotifyTypes/TrackArtist/type";
import { test } from "../SP-Tokens/API-SP-Tokens";

export const _getOneArtist = async (ids: string): Promise<TrackArtist | undefined> => {
    try {
        const url = ` https://api.spotify.com/v1/artists?ids=${ids}`
        const { access_token } = await test()
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${access_token}`,
            },
        });
        if (!response.ok) {
            console.warn("artistsTrackErrorrrr")

        }
        const Data = await response.json();

        return Data.artists[0]
    }
    catch (error) {
        console.warn("artistsTrackErrorrrr")
    }
}
export const _getArtists = async (ids: string[]): Promise<TrackArtist[]> => {

    const idsString = ids.join(',');
    const encodedIds = encodeURIComponent(idsString);
    const url = ` https://api.spotify.com/v1/artists?ids=${encodedIds}`
    const { access_token } = await test()
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${access_token}`,
        },
    });
    if (!response) {
        console.warn("artistsTrackErrorrrr")

    }
    const Data = await response.json();

    return Data.artists
}



export const _getTopArtists = async (): Promise<FollowedArtistType> => {
    const url = "https://api.spotify.com/v1/me/top/artists?limit=10"
    const { access_token } = await test()
    const getTopsUser = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${access_token}`,
        },
    });
    if (!getTopsUser.ok) {
        throw new Error('Ошибка получения топ артистов');
    }
    const getTopsUserResult: FollowedArtistType = await getTopsUser.json()

    return getTopsUserResult;

}

export const _getFollowedArtists = async (): Promise<FollowedArtistType> => {
    const url = "https://api.spotify.com/v1/me/following?type=artist&limit=40"
    const { access_token } = await test()
    const getFollowedUser = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${access_token}`,
        },
    });
    if (!getFollowedUser.ok) {
        throw new Error('Ошибка получения топ артистов');
    }
    const getTopsUserResult = await getFollowedUser.json()

    return getTopsUserResult.artists;

}


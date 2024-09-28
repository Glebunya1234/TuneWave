'use server'
import { CurrentlyUserType } from "@/types/SpotifyTypes/CurrentlyUser/type";
import { test } from "../SP-Tokens/API-SP-Tokens";
import { fetchWithRetry, fetchWithRetryForWriteMethods } from "../ApiSpotify";

export const GetUserById = async (userId: string): Promise<CurrentlyUserType> => {
    const url = `https://api.spotify.com/v1/users/${userId}`
    const response = await fetchWithRetry(url);
    const Data: CurrentlyUserType = await response.json();
    return Data;
}
export const GetUser = async (): Promise<CurrentlyUserType> => {
    const url = `https://api.spotify.com/v1/me`
    const response = await fetchWithRetry(url);
    const Data: CurrentlyUserType = await response.json();
    return Data;
}

export const _UserUnFollowArtist = async (ids: string) => {

    const url = `https://api.spotify.com/v1/me/following?type=artist&ids=${ids}`
    const options: RequestInit = {
        method: 'Delete',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        await fetchWithRetryForWriteMethods(url, options);
    } catch (error) {
        console.error('Ошибка при удалении артиста:', error);
    }



}
export const _UserFollowArtist = async (ids: string) => {
    const url = `https://api.spotify.com/v1/me/following?type=artist&ids=${ids}`
    const options: RequestInit = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        await fetchWithRetryForWriteMethods(url, options);
    } catch (error) {
        console.error('Ошибка при сохранении артиста:', error);
    }


}
export const _CheckIsFollowArtist = async (ids: string | string[]): Promise<boolean[]> => {
    let idsString;

    if (typeof ids === 'string') {
        idsString = ids
    }
    else {
        idsString = ids.join(',');
    }
    const encodedIds = encodeURIComponent(idsString);
    const url = `https://api.spotify.com/v1/me/following/contains?type=artist&ids=${encodedIds}`
    const response = await fetchWithRetry(url)

    if (!response.ok) {
        const error = await response.json();
        console.error('Error:', error);
        return [false];
    }

    const data = await response.json();

    return data

}
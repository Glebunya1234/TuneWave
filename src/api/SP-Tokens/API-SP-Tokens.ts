"use server"

import { readCache, cacheFilePathRefresh } from "../../../cache/controller";
const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!;
const client_secret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET!;


export const test = async () => {
    let refresh_token = readCache(cacheFilePathRefresh);
    let basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64')
    let response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            Authorization: `Basic ${basic}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token,
        }),
    })

    return response.json()
}

export const _refreshToken = async (refreshToken: string): Promise<string | null> => {
    try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
                client_id: client_id
            }),
        })
        const result = await response.json();
        return result


    } catch (error) {
        console.error('Ошибка обновления токена:', error);
        return null;
    }
};

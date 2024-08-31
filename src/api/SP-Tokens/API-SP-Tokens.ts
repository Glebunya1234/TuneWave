"use server"

import { readCache, cacheFilePathRefresh, cacheFilePathAccess, writeCache } from "../../../cache/controller";
const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!;
const client_secret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET!;


export const _refreshToken = async () => {
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

    const sss = await response.json()
    return sss
}

export const test = async (refreshToken?: string): Promise<string | null> => {
    try {
        let refreshToken = readCache(cacheFilePathRefresh);
        const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${basic}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
            cache: "no-cache"
        });

        const result = await response.json();
        writeCache(result, cacheFilePathAccess);
        if (!response.ok) {
            console.error('Ошибка обновления токена:', result);
            return null;
        }

        return result.access_token
    } catch (error) {
        console.error('Ошибка обновления токена:', error);
        return null;
    }
};

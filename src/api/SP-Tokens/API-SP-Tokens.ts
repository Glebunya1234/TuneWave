"use server"

import { GetDataProfileUser } from "@/providers/SupaBase-methods/user-action";
import { readRefreshToken, writeToken } from "../../../cache/controller";
const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!;
const client_secret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET!;


export const _refreshToken = async () => {
    const userData = await GetDataProfileUser();
    let userId = userData.user?.id ?? "";
    let refreshToken = await readRefreshToken(userId);

    if (!refreshToken) {
        console.error('Ошибка обновления токена:');
        return null;
    }



    let basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64')

    let response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            Authorization: `Basic ${basic}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refreshToken,
        }),
    })

    const sss = await response.json()
    return sss
}

export const test = async (): Promise<string | null> => {
    try {
        const userData = await GetDataProfileUser();
        let userId = userData.user?.id ?? "";
        let refreshToken = await readRefreshToken(userId);


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

        writeToken(userId, result.access_token);
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

"use server"
import { createClient } from '@/utils/supabase/server';
import fs from 'fs';
import path from 'path';
import { cacheFilePathAccess, cacheFilePathRefresh, readCache } from '../../cache/controller';

// const cacheDir = path.resolve('./cache');
// const cacheFilePath = path.join(cacheDir, 'spotify-tracks.json');

const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!;
const client_secret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET!;


// const ensureCacheDirExists = (cacheDir: any) => {
//     if (!fs.existsSync(cacheDir)) {
//         fs.mkdirSync(cacheDir, { recursive: true });
//     }
// };


// const readCache = () => {
//     if (fs.existsSync(cacheFilePath)) {
//         return JSON.parse(fs.readFileSync(cacheFilePath, 'utf8'));
//     }
//     return null;
// };


// const writeCache = (data: any) => {
//     ensureCacheDirExists(cacheDir);
//     fs.writeFileSync(cacheFilePath, JSON.stringify(data));
// };

const _refreshToken = async (refreshToken: string): Promise<string | null> => {
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
        console.log("_refreshToken", result)
        return result

        // const response = await fetch('https://accounts.spotify.com/api/token', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/x-www-form-urlencoded',
        //         'Authorization': `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`
        //     },
        //     body: new URLSearchParams({
        //         grant_type: 'refresh_token',
        //         refresh_token: refreshToken
        //     })
        // });

        // const data = await response.json();

        // return data.access_token || null;
    } catch (error) {
        console.error('Ошибка обновления токена:', error);
        return null;
    }
};

export const _getToken = async (isRefresh?: boolean): Promise<string | null> => {
    try {
        const supabase = createClient();
        const { data: session, error } = await supabase.auth.getSession();
        if (error || !session) {
            console.error('Ошибка получения сессии:', error);
            return null;
        }

        // const token = session.session?.provider_token;
        const token = readCache(cacheFilePathAccess);
        const refreshToken = session.session?.provider_refresh_token;
        if (isRefresh) {

            const newToken = await _refreshToken(readCache(cacheFilePathRefresh));
            console.log("_refreshToken", newToken)
            return newToken
        }

        // if (token && refreshToken) {

        //     const newToken = await _refreshToken(refreshToken);
        //     if (newToken) {
        //         // Обновляем токен в Supabase
        //         await supabase.auth.updateUser({
        //             data: {
        //                 provider_token: newToken
        //             }
        //         });
        //         return newToken;
        //     }
        // }

        return token || null;
    } catch (error) {
        console.error('Ошибка в _getToken:', error);
        return null;
    }
};
const test = async () => {
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

export const _getSavedTrackUser = async (token: string | null, count: number): Promise<any> => {


    // const cachedData = readCache();
    // const cachedItems = cachedData ? cachedData.items : [];
    // const response = await fetch(`https://api.spotify.com/v1/me/tracks?limit=20&offset=${count}`, {
    //     method: 'GET',
    //     headers: {
    //         'Authorization': `Bearer ${readCache(cacheFilePathAccess)}`,
    //     },
    // });
    // if (response) {

    // const newToken = _getToken(true)
    const { access_token } = await test()
    console.log(await test())
    const response = await fetch(`https://api.spotify.com/v1/me/tracks?limit=20&offset=${count}`, {
        method: 'GET',
        headers: {
            // 'Authorization': `Bearer ${_refreshToken(readCache(cacheFilePathRefresh))}`,
            'Authorization': `Bearer ${access_token}`,
        },
    });
    const newData = await response.json();

    return newData
}








export const _getCurrentlyPlayingTrack = async (token?: string | null): Promise<any> => {
    const url = "https://api.spotify.com/v1/me/player/currently-playing "
    const { access_token } = await test()
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${access_token}`,
        },
    });
    if (!response) {
        console.warn("Errorrrr")
        // const newToken = _getToken(true)
        // const response = await fetch(url, {
        //     method: 'GET',
        //     headers: {
        //         'Authorization': `Bearer ${newToken}`,
        //     },

        // });
        // const Data = await response.json();
        // return Data
    }

    const Data = await response.json();
    return Data

}

export const _getPlayTrack = async (uri: string) => {
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
    console.log('Success:', data);
}




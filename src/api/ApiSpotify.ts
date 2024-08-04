
import { createClient } from '@/utils/supabase/server';
import fs from 'fs';
import path from 'path';

const cacheDir = path.resolve('./cache');
const cacheFilePath = path.join(cacheDir, 'spotify-tracks.json');
const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!;
const client_secret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET!;


const ensureCacheDirExists = () => {
    if (!fs.existsSync(cacheDir)) {
        fs.mkdirSync(cacheDir, { recursive: true });
    }
};


const readCache = () => {
    if (fs.existsSync(cacheFilePath)) {
        return JSON.parse(fs.readFileSync(cacheFilePath, 'utf8'));
    }
    return null;
};


const writeCache = (data: any) => {
    ensureCacheDirExists();
    fs.writeFileSync(cacheFilePath, JSON.stringify(data));
};

const _refreshToken = async (refreshToken: string): Promise<string | null> => {
    try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')}`
            },
            body: new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: refreshToken
            })
        });

        const data = await response.json();
        return data.access_token || null;
    } catch (error) {
        console.error('Ошибка обновления токена:', error);
        return null;
    }
};

export const _getToken = async (): Promise<string | null> => {
    try {
        const supabase = createClient();
        const { data: session, error } = await supabase.auth.getSession();
        if (error || !session) {
            console.error('Ошибка получения сессии:', error);
            return null;
        }

        const token = session.session?.provider_token;
        const refreshToken = session.session?.provider_refresh_token;

        if (token && refreshToken) {

            const newToken = await _refreshToken(refreshToken);
            if (newToken) {
                // Обновляем токен в Supabase
                await supabase.auth.updateUser({
                    data: {
                        provider_token: newToken
                    }
                });
                return newToken;
            }
        }

        return token || null;
    } catch (error) {
        console.error('Ошибка в _getToken:', error);
        return null;
    }
};



export const _getSavedTrackUser = async (token: string | null): Promise<any> => {


    const cachedData = readCache();
    const cachedItems = cachedData ? cachedData.items : [];

    const response = await fetch('https://api.spotify.com/v1/me/tracks', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    const newData = await response.json();
    const newItems = newData.items;


    const compareTracks = (a: any, b: any) => a.id === b.id;
    const isSameTracks = (arr1: any[], arr2: any[]) => arr1.length === arr2.length && arr1.every(track1 => arr2.some(track2 => compareTracks(track1, track2)));


    if (cachedItems === undefined && newItems === undefined) {
        console.log("oba")
        return [];
    }

    if (cachedItems === undefined && newItems !== undefined) {
        console.log("только cachedItems")
        writeCache(newItems);
        return newItems;
    }

    if (cachedItems !== undefined && newItems === undefined) {
        return cachedItems;
    }

    if (cachedItems !== undefined && newItems !== undefined) {
        console.log("оба целые")
        if (!isSameTracks(cachedItems, newItems)) {
            writeCache(newItems);
            return newItems;
        } else {
            return newItems;
        }
    }
};








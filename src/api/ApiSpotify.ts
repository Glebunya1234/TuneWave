
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


export const _getToken = async (): Promise<string | null> => {
    try {
        const supabase = createClient();
        const { data: session, error } = await supabase.auth.getSession();
        if (error || !session) {
            console.error('Ошибка получения сессии:', error);
            return null;
        }

        let token = session.session?.provider_token;

        if (token === undefined) {
            const response = await fetch("https://accounts.spotify.com/api/token", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: 'grant_type=client_credentials&client_id=' + client_id + '&client_secret=' + client_secret
            });
            const newToken = await response.json();
            console.log("newTokennewToken", newToken)
            token = newToken.access_token
        }

        return token || "";
    } catch (error) {
        console.error('Ошибка в _getToken:', error);
        return null;
    }
};



export const _getSavedTrackUser = async (token: string | null): Promise<any> => {

    if (!token) {
        throw new Error("Необходим авторизационный токен.");
    }


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

    if (!isSameTracks(cachedItems, newItems)) {

        writeCache(newData);
        return newItems;
    }
    else {
        return cachedItems
    }
    // // console.log('Saved track:', data);
    // if (data.items && data.items.length > 0) {
    //     data.items.forEach((item: any) => {
    //         console.log('Track:', {
    //             addedAt: item.added_at,
    //             name: item.track.name,
    //             artist: item.track.artists.map((artist: any) => artist.name).join(', '),
    //             album: item.track.album.name,
    //             albumCover: item.track.album.images[0]?.url,
    //         });
    //     });
    // } else {
    //     console.log('No saved tracks found.');
    // }

};








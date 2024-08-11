"use server"
import { createClient } from '@/utils/supabase/server';
import fs from 'fs';
import path from 'path';
import { cacheFilePathAccess, cacheFilePathRefresh, readCache } from '../../cache/controller';
import { CurrentlyAlbum } from '@/types/SpotifyTypes/CurrentlyAlbum/type';
import { CurrentlyTrack } from '@/types/SpotifyTypes/CurrentlyTrack/type';
import { TrackArtist } from '@/types/SpotifyTypes/TrackArtist/type';
import { RecommendationsType } from '@/types/SpotifyTypes/RecommendationsType/type';

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
    const { access_token } = await test()
    console.log(await test())
    const response = await fetch(`https://api.spotify.com/v1/me/tracks?limit=20&offset=${count}`, {
        method: 'GET',
        headers: {
            // 'Authorization': `Bearer ${_refreshToken(readCache(cacheFilePathRefresh))}`,
            'Authorization': `Bearer ${access_token}`,
        },

        next: {
            revalidate: 200
        },
    });
    const newData = await response.json();

    return newData
}








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
    console.log('Success:', data);
}

export const _getAlbum = async (id: string): Promise<CurrentlyAlbum> => {

    const url = `https://api.spotify.com/v1/albums/${id}`
    const { access_token } = await test()
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${access_token}`,
        },
    });
    if (!response) {
        console.warn("AlbumErrorrrr")

    }

    const Data = await response.json();
    return Data
}
export const _getTrack = async (id: string): Promise<{ track: CurrentlyTrack, isSaved: Array<boolean>; }> => {

    const { access_token } = await test()
    const url = ` https://api.spotify.com/v1/tracks/${id}`
    const url2 = `https://api.spotify.com/v1/me/tracks/contains?ids=${id}`
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${access_token}`,
        },
    });
    if (!response) {
        console.warn("AlbumErrorrrr")

    }
    const IsSavedResponse = await fetch(url2, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${access_token}`,
        },
    });
    const Data = await response.json();
    const isSaved = await IsSavedResponse.json();
    return { track: Data, isSaved: isSaved }
}
export const _getArtist = async (ids: string[]): Promise<TrackArtist[]> => {

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

export const UnSaveTrack = async (ids: string) => {
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
export const SaveTrack = async (ids: string) => {
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

export const _getTopArtists = async (): Promise<Artist[]> => {
    // const url = "https://api.spotify.com/v1/recommendations/available-genre-seeds"
    const url = "https://api.spotify.com/v1/me/top/artists"
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
    const getTopsUserResult = await getTopsUser.json()
    return getTopsUserResult.items;

}
interface Artist {
    id: string;
    genres: string[];
}


export const getRecommendations = async (): Promise<RecommendationsType> => {
    const topArtists = await _getTopArtists();
    const seedArtists: string[] = topArtists.length > 0
        ? topArtists.map(artist => artist.id).filter(id => id !== undefined)
        : [];

    const seedGenres: string[] = topArtists.length > 0
        ? topArtists.flatMap(artist => artist.genres).filter(genre => genre !== undefined)
        : [];


    const selectedSeedArtists = seedArtists.slice(0, 3);
    const selectedSeedGenres = seedGenres.slice(0, 2);
    if (selectedSeedArtists.length === 0 && selectedSeedGenres.length === 0) {
        throw new Error('Не удалось получить достаточное количество данных для seed параметров');
    }


    const ArtistIDString = selectedSeedArtists.join(',');
    // const encodedArtist = encodeURIComponent(ArtistIDString);
    const GangreString = selectedSeedGenres.join(',');
    const encodedArtist = ArtistIDString.replace(/ /g, '+').replace(/,/g, '%2C');
    const encodedGangre = GangreString.replace(/ /g, '+').replace(/,/g, '%2C');



    const url = `https://api.spotify.com/v1/recommendations?limit=10&seed_artists=${encodedArtist}&seed_genres=${encodedGangre}`;

    const { access_token } = await test()
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${access_token}`,

        },
    });

    const data = await response.json()
    console.log(data);
    return data
}
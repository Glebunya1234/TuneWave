"use server"
import { createClient } from '@/utils/supabase/server';
import fs from 'fs';
import path from 'path';
import { cacheFilePathAccess, cacheFilePathRefresh, readCache } from '../../cache/controller';
import { CurrentlyAlbum } from '@/types/SpotifyTypes/CurrentlyAlbum/type';
import { CurrentlyTrack } from '@/types/SpotifyTypes/CurrentlyTrack/type';
import { FollowedArtist, TrackArtist } from '@/types/SpotifyTypes/TrackArtist/type';
import { RecommendationsType } from '@/types/SpotifyTypes/RecommendationsType/type';
import { TrackItem } from '@/types/SpotifyTypes/CurrentlyPlayingTrack/type';
import { SavedTrack, SpotifyTracksResponse } from '@/types/SpotifyTypes/TrackFavoriteType/type';
import { CurrentlyPlaylist, CurrentlyPlaylistTracksItem, ItemPlaylist, Playlist } from '@/types/SpotifyTypes/CurrentlyPlaylist/type';

// const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!;
// const client_secret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET!;


// const _refreshToken = async (refreshToken: string): Promise<string | null> => {
//     try {
//         const response = await fetch('https://accounts.spotify.com/api/token', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded'
//             },
//             body: new URLSearchParams({
//                 grant_type: 'refresh_token',
//                 refresh_token: refreshToken,
//                 client_id: client_id
//             }),
//         })
//         const result = await response.json();
//         return result


//     } catch (error) {
//         console.error('Ошибка обновления токена:', error);
//         return null;
//     }
// };

// export const _getToken = async (isRefresh?: boolean): Promise<string | null> => {
//     try {
//         const supabase = createClient();
//         const { data: session, error } = await supabase.auth.getSession();
//         if (error || !session) {
//             console.error('Ошибка получения сессии:', error);
//             return null;
//         }

//         // const token = session.session?.provider_token;
//         const token = readCache(cacheFilePathAccess);
//         const refreshToken = session.session?.provider_refresh_token;
//         if (isRefresh) {

//             const newToken = await _refreshToken(readCache(cacheFilePathRefresh));
//             return newToken
//         }



//         return token || null;
//     } catch (error) {
//         console.error('Ошибка в _getToken:', error);
//         return null;
//     }
// };
// const test = async () => {
//     let refresh_token = readCache(cacheFilePathRefresh);
//     let basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64')
//     let response = await fetch('https://accounts.spotify.com/api/token', {
//         method: 'POST',
//         headers: {
//             Authorization: `Basic ${basic}`,
//             'Content-Type': 'application/x-www-form-urlencoded',
//         },
//         body: new URLSearchParams({
//             grant_type: 'refresh_token',
//             refresh_token,
//         }),
//     })

//     return response.json()
// }

// export const _getSavedTrackUser = async (count: number): Promise<SpotifyTracksResponse> => {
//     const { access_token } = await test()

//     const response = await fetch(`https://api.spotify.com/v1/me/tracks?limit=20&offset=${count}`, {
//         method: 'GET',
//         headers: {
//             // 'Authorization': `Bearer ${_refreshToken(readCache(cacheFilePathRefresh))}`,
//             'Authorization': `Bearer ${access_token}`,
//         },

//     });
//     const newData: SpotifyTracksResponse = await response.json();

//     const trackIds = newData?.items?.map(track => track.track.id);
//     const isSavedArray = await _checkIfTracksAreSaved(trackIds);

//     const tracksWithSavedInfo: SavedTrack[] = newData.items.map((item, index) => ({
//         ...item,
//         track: {
//             ...item.track,
//             isSaved: isSavedArray[index],
//         }
//     }));
//     return { ...newData, items: tracksWithSavedInfo };
// }

// export const _getCurrentUserPlaylists = async (limit: number = 10): Promise<CurrentlyPlaylist> => {
//     const { access_token } = await test()
//     const url = `https://api.spotify.com/v1/me/playlists?limit=${limit}`
//     const response = await fetch(url, {
//         method: 'GET',
//         headers: {
//             'Authorization': `Bearer ${access_token}`,
//         },


//     });
//     const Data: CurrentlyPlaylist = await response.json();


//     return Data;
// }

// export const _getItemsCurrentPlaylist = async (url: string, id: string): Promise<CurrentlyPlaylistTracksItem> => {
//     const { access_token } = await test()
//     const response2 = await fetch(url, {
//         method: 'GET',
//         headers: {
//             'Authorization': `Bearer ${access_token}`,
//         },


//     });
//     const Data2: CurrentlyPlaylistTracksItem = await response2.json();

//     const trackIds = Data2?.items?.map(track => track.track.id);
//     const isSavedArray = await _checkIfTracksAreSaved(trackIds);
//     const InfoList = await _getPlaylist(id)

//     const tracksWithSavedInfo: ItemPlaylist[] = Data2.items.map((item, index) => ({
//         ...item,
//         track: {
//             ...item.track,
//             isSaved: isSavedArray[index],
//         }
//     }));

//     return { ...Data2, infoPlaylist: InfoList, items: tracksWithSavedInfo }
// }

// export const _getCurrentlyPlayingTrack = async (token?: string | null): Promise<any> => {
//     const url = "https://api.spotify.com/v1/me/player/currently-playing"

//     const { access_token } = await test()
//     const response = await fetch(url, {

//         method: 'GET',
//         headers: {
//             'Authorization': `Bearer ${access_token}`,
//         },
//     });

//     if (!response) {
//         console.warn("Errorrrr")

//     }

//     const Data = await response.json();



//     return Data

// }







// const _checkIfTracksAreSaved = async (trackIds: string[]): Promise<boolean[]> => {
//     const { access_token } = await test();
//     const idsString = trackIds.join(',');

//     const response = await fetch(`https://api.spotify.com/v1/me/tracks/contains?ids=${idsString}`, {
//         method: 'GET',
//         headers: {
//             'Authorization': `Bearer ${access_token}`,
//         },
//     });

//     if (!response.ok) {
//         console.log('Failed to check if tracks are saved')
//         return [false]

//     }
//     const data = await response.json()
//     return data
// };
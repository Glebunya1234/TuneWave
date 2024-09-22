"use server"
import { CurrentlyAlbum, SavedAlbums } from "@/types/SpotifyTypes/CurrentlyAlbum/type";

import { _checkIfTracksAreSaved } from "../SP-Tracks/API-SP-Tracks";

import { TrackItem } from "@/types/SpotifyTypes/CurrentlyPlayingTrack/type";
import { fetchWithRetry, fetchWithRetryForWriteMethods } from "../ApiSpotify";

export const _getAlbum = async (id: string): Promise<CurrentlyAlbum> => {

    const url = `https://api.spotify.com/v1/albums/${id}`

    const response = await fetchWithRetry(url);

    if (!response) {
        console.warn("AlbumErrorrrr")
    }

    const Data: CurrentlyAlbum = await response.json();
    const isSavedAlbumArray: boolean[] = await _checkIsAlbumAreSaved(id);
    const OneObj = isSavedAlbumArray[0]
    const isSavedTrackArray: boolean[] = await _checkIfTracksAreSaved(Data.tracks.items.map((it) => it.id))
    const DataWithTracksChecked: TrackItem[] = Data.tracks.items.map((it, inx) => ({
        ...it,
        isSaved: isSavedTrackArray[inx],
    }))

    return { ...Data, isSave: OneObj, tracks: { items: DataWithTracksChecked } }

}
export const _getSavedAlbums = async (): Promise<SavedAlbums> => {
    const url = 'https://api.spotify.com/v1/me/albums?limit=50'
    const response = await fetchWithRetry(url);

    if (!response.ok) {
        console.log('Error Get saved albums');
        const getTopsUserResult = await response.json()
        console.log('getTopsUserResult=', getTopsUserResult)
    }
    const getTopsUserResult = await response.json()
    return getTopsUserResult
}
export const _checkIsAlbumAreSaved = async (id: string[] | string): Promise<boolean[]> => {
    let idsString = id;
    if (typeof id !== "string")
        idsString = id?.join(',');


    const url = `https://api.spotify.com/v1/me/albums/contains?ids=${idsString}`

    const response = await fetchWithRetry(url);
    if (!response.ok) {
        console.warn("AlbumError Check is save")
        const result = await response.json();
        console.log('result= ', result)
    }

    const Data = await response.json();
    return Data
}
export const _UserFollowAlbum = async (ids: string) => {
    const url = `https://api.spotify.com/v1/me/albums?ids=${ids}`
    const options: RequestInit = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const response = await fetchWithRetryForWriteMethods(url, options);

    if (!response.ok) {
        const error = await response.json();
        console.error('Error:', error);
        return;
    }

    await response.json();
    return

}
export const _UserUnFollowAlbum = async (ids: string) => {

    const url = `https://api.spotify.com/v1/me/albums?ids=${ids}`
    const options: RequestInit = {
        method: 'Delete',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const response = await fetchWithRetryForWriteMethods(url, options);

    if (!response.ok) {
        const error = await response.json();
        console.error('Error:', error);
        return;
    }

    await response.json();
    return
}

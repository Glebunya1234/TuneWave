"use server"
import { CurrentlyPlaylist, CurrentlyPlaylistTracksItem, ItemPlaylist, Playlist } from "@/types/SpotifyTypes/CurrentlyPlaylist/type";
import { test } from "../SP-Tokens/API-SP-Tokens";
import { _checkIfTracksAreSaved } from "../SP-Tracks/API-SP-Tracks";
import { GetUserById } from "../SP-Users/API-SP-Users";
import { fetchWithRetry, fetchWithRetryForWriteMethods } from "../ApiSpotify";


export const _getPlaylist = async (id: string): Promise<Playlist> => {

    const url = `https://api.spotify.com/v1/playlists/${id}`;
    const response = await fetchWithRetry(url)
    if (!response.ok) {
        console.warn("Errorrrr")

    }
    const data: Playlist = await response.json();
    const isSaved = await _checkIfCurrentUserFollowsPlaylist(id)

    return { ...data, isSave: isSaved }
}


export const _getCurrentUserPlaylists = async (limit: number = 50): Promise<CurrentlyPlaylist> => {

    const url = `https://api.spotify.com/v1/me/playlists?limit=${limit}`
    const response = await fetchWithRetry(url)

    const Data: CurrentlyPlaylist = await response.json();
    return Data;
}
export const _checkIfCurrentUserFollowsPlaylist = async (id: string): Promise<boolean> => {

    const url = `https://api.spotify.com/v1/playlists/${id}/followers/contains`
    const response = await fetchWithRetry(url)

    const Data = await response.json();
    return Data[0]
}

export const _getItemsCurrentPlaylist = async (url: string, id: string): Promise<CurrentlyPlaylistTracksItem> => {


    const response = await fetchWithRetry(url)

    const Data2: CurrentlyPlaylistTracksItem = await response.json();

    const trackIds = Data2?.items?.map(track => track.track.id);
    const isSavedArray = await _checkIfTracksAreSaved(trackIds);
    const InfoList = await _getPlaylist(id)

    const OwnerFullInfo = await GetUserById(InfoList.owner?.id || "")
    const tracksWithSavedInfo: ItemPlaylist[] = Data2.items.map((item, index) => ({
        ...item,
        track: {
            ...item.track,
            isSaved: isSavedArray[index],
        }
    }));

    return { ...Data2, infoPlaylist: { ...InfoList, UserFullInfo: OwnerFullInfo }, items: tracksWithSavedInfo }
}
export const _UserFollowPlaylist = async (id: string) => {
    const url = `https://api.spotify.com/v1/playlists/${id}/followers`
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
        return null
    }


    return null

}
export const _UserUnFollowPlaylist = async (id: string) => {

    const url = `https://api.spotify.com/v1/playlists/${id}/followers`
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
        return null
    }

    return null
}

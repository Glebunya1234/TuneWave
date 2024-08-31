"use server"
import { CurrentlyPlaylist, CurrentlyPlaylistTracksItem, ItemPlaylist, Playlist } from "@/types/SpotifyTypes/CurrentlyPlaylist/type";
import { test } from "../SP-Tokens/API-SP-Tokens";
import { _checkIfTracksAreSaved } from "../SP-Tracks/API-SP-Tracks";
import { GetUserById } from "../SP-Users/API-SP-Users";
import { fetchWithRetry } from "../ApiSpotify";


export const _getPlaylist = async (id: string): Promise<Playlist> => {

    const url = `https://api.spotify.com/v1/playlists/${id}`;
    const response = await fetchWithRetry(url)
    if (!response.ok) {
        console.warn("Errorrrr")

    }
    const data = await response.json();
    return data
}


export const _getCurrentUserPlaylists = async (limit: number = 10): Promise<CurrentlyPlaylist> => {

    const url = `https://api.spotify.com/v1/me/playlists?limit=${limit}`
    const response = await fetchWithRetry(url)

    const Data: CurrentlyPlaylist = await response.json();
    return Data;
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
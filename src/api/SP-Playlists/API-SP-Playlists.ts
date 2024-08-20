"use server"
import { CurrentlyPlaylist, CurrentlyPlaylistTracksItem, ItemPlaylist, Playlist } from "@/types/SpotifyTypes/CurrentlyPlaylist/type";
import { test } from "../SP-Tokens/API-SP-Tokens";
import { _checkIfTracksAreSaved } from "../SP-Tracks/API-SP-Tracks";
import { GetUserById } from "../SP-Users/API-SP-Users";


export const _getPlaylist = async (id: string): Promise<Playlist> => {
    const { access_token } = await test()
    const response3 = await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${access_token}`,
        },


    });
    const data = await response3.json();
    return data
}


export const _getCurrentUserPlaylists = async (limit: number = 10): Promise<CurrentlyPlaylist> => {
    const { access_token } = await test()
    const url = `https://api.spotify.com/v1/me/playlists?limit=${limit}`
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${access_token}`,
        },


    });
    const Data: CurrentlyPlaylist = await response.json();
    return Data;
}

export const _getItemsCurrentPlaylist = async (url: string, id: string): Promise<CurrentlyPlaylistTracksItem> => {
    const { access_token } = await test()
    const response2 = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${access_token}`,
        },


    });
    const Data2: CurrentlyPlaylistTracksItem = await response2.json();

    const trackIds = Data2?.items?.map(track => track.track.id);
    // const isSavedArray = await _checkIfTracksAreSaved(trackIds);
    const InfoList = await _getPlaylist(id)
    const OwnerFullInfo = await GetUserById(InfoList.owner?.id || "")
    // const tracksWithSavedInfo: ItemPlaylist[] = Data2.items.map((item, index) => ({
    //     ...item,
    //     track: {
    //         ...item.track,
    //         isSaved: isSavedArray[index],
    //     }
    // }));

    // return { ...Data2, infoPlaylist: { ...InfoList, UserFullInfo: OwnerFullInfo }, items: tracksWithSavedInfo }
    return { ...Data2, infoPlaylist: { ...InfoList, UserFullInfo: OwnerFullInfo } }
}
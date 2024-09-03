"use server"
import { CurrentlyAlbum } from "@/types/SpotifyTypes/CurrentlyAlbum/type";
import { test } from "../SP-Tokens/API-SP-Tokens";
import { _checkIfTracksAreSaved } from "../SP-Tracks/API-SP-Tracks";
import { SavedTrack } from "@/types/SpotifyTypes/TrackFavoriteType/type";
import { TrackItem } from "@/types/SpotifyTypes/CurrentlyPlayingTrack/type";
import { fetchWithRetry } from "../ApiSpotify";

export const _getAlbum = async (id: string): Promise<CurrentlyAlbum> => {

    const url = `https://api.spotify.com/v1/albums/${id}`

    const response = await fetchWithRetry(url);

    if (!response) {
        console.warn("AlbumErrorrrr")
    }

    const Data: CurrentlyAlbum = await response.json();
    const isSavedArray: boolean = await _checkIsAlbumAreSaved(id);



    return { ...Data, isSave: isSavedArray };

}
export const _checkIsAlbumAreSaved = async (id: string): Promise<boolean> => {
    const url = `https://api.spotify.com/v1/me/albums/contains?ids=${id}`
    const response = await fetchWithRetry(url);
    if (!response.ok) {
        console.warn("AlbumError Check is save")
        const result = await response.json();
        console.log('result= ', result)
    }

    const Data = await response.json();
    return Data[0]
}

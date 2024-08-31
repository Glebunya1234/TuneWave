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
    const trackIds = Data?.tracks?.items?.map(track => track.id);
    const isSavedArray = await _checkIfTracksAreSaved(trackIds);

    const tracksWithSavedInfo: TrackItem[] = Data?.tracks?.items?.map((item, index) => ({
        ...item,
        isSaved: isSavedArray[index],
    }));

    return { ...Data, tracks: { items: tracksWithSavedInfo } };

}


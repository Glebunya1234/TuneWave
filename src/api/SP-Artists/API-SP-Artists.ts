"use server"
import { TrackArtist, FollowedArtistType } from "@/types/SpotifyTypes/TrackArtist/type";
import { _refreshToken } from "../SP-Tokens/API-SP-Tokens";
import { ItemsForArtistAlbums, TrackItem } from "@/types/SpotifyTypes/CurrentlyPlayingTrack/type";
import { _checkIfTracksAreSaved } from "../SP-Tracks/API-SP-Tracks";
import { CurrentlyPlaylistTracksItem } from "@/types/SpotifyTypes/CurrentlyAlbum/type";
import { _checkIsAlbumAreSaved, _getAlbum } from "../SP-Albums/API-SP-Albums";
import { fetchWithRetry } from "../ApiSpotify";

export const _getOneArtist = async (ids: string): Promise<TrackArtist | undefined> => {
    try {
        const url = ` https://api.spotify.com/v1/artists?ids=${ids}`

        const response = await fetchWithRetry(url)

        if (!response.ok) {
            console.warn("artistsTrackErrorrrr")

        }
        const Data = await response.json();

        return Data.artists[0]
    }
    catch (error) {
        console.warn("artistsTrackErrorrrr")
    }
}
export const _getArtists = async (ids: string[] | string): Promise<TrackArtist[]> => {
    let idsString = Array.isArray(ids) ? ids.join(',') : ids;
    const encodedIds = encodeURIComponent(idsString);
    const url = `https://api.spotify.com/v1/artists?ids=${encodedIds}`;

    try {
        const response = await fetchWithRetry(url)

        if (!response.ok) {
            const Data = await response.json();
            console.warn("artistsTrackError:", Data);
            return [];
        }

        const Data = await response.json();
        return Data.artists;
    } catch (error) {
        console.error("Ошибка при запросе артистов:", error);
        return [];
    }
}



export const _getTopArtists = async (): Promise<FollowedArtistType> => {
    const url = "https://api.spotify.com/v1/me/top/artists?limit=10"

    const getTopsUser = await fetchWithRetry(url);
    if (!getTopsUser.ok) {

        throw new Error('Ошибка получения топ артистов');
    }
    const getTopsUserResult = await getTopsUser.json()

    return getTopsUserResult;

}

export const _getFollowedArtists = async (): Promise<FollowedArtistType> => {
    const url = "https://api.spotify.com/v1/me/following?type=artist&limit=40"

    const getFollowedUser = await fetchWithRetry(url);

    if (!getFollowedUser.ok) {
        throw new Error('Ошибка получения топ артистов');
    }
    const getTopsUserResult = await getFollowedUser.json()
    return getTopsUserResult.artists;
}

export const _getArtistsTopTracks = async (id: string): Promise<TrackItem[]> => {
    const url1 = `https://api.spotify.com/v1/artists/${id}/top-tracks?market=US`;

    const getTopTrack = await fetchWithRetry(url1);

    if (!getTopTrack.ok) {
        throw new Error('Ошибка получения топ треков артиста');
    }


    const response = await getTopTrack.json();
    const getTopsUserResult: TrackItem[] = response.tracks;
    const isSaved = await _checkIfTracksAreSaved(getTopsUserResult.map((it) => it.id));
    const tracksWithSavedInfo: TrackItem[] = getTopsUserResult.map((item, index) => ({
        ...item,
        isSaved: isSaved[index],
    }));

    return tracksWithSavedInfo;
}
export const _getRelatedArtists = async (ids: string): Promise<TrackArtist[]> => {


    const url = `https://api.spotify.com/v1/artists/${encodeURIComponent(ids)}/related-artists`

    const response = await fetchWithRetry(url);

    if (!response) {
        console.warn("artistsTrackErrorrrr")

    }
    const Data = await response.json();
    return Data.artists
}

export const _getArtistsAlbums = async (id: string, include_groups: string, offset: number = 0): Promise<CurrentlyPlaylistTracksItem> => {

    const url3 = `https://api.spotify.com/v1/artists/${id}/albums?include_groups=${include_groups}&offset=${offset}`


    const getArtistsAlbums = await fetchWithRetry(url3);

    if (!getArtistsAlbums.ok) {
        throw new Error('Ошибка получения топ артистов');
    }

    const getArtistsAlbumsResult: CurrentlyPlaylistTracksItem = await getArtistsAlbums.json()
    const isSavedArray = await _checkIsAlbumAreSaved(getArtistsAlbumsResult.items.map((it) => it.id))
    const tracksWithSavedInfo: ItemsForArtistAlbums[] = await Promise.all(
        getArtistsAlbumsResult.items.map(async (item, index) => {
            const itemsAlbum = await _getAlbum(item.id);
            return {
                ...item,
                tracks: {
                    items: itemsAlbum.tracks.items,
                },
                isSaved: isSavedArray[index],
            };
        })
    );



    return { ...getArtistsAlbumsResult, items: tracksWithSavedInfo }
}


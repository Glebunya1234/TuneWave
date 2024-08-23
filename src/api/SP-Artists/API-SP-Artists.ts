"use server"
import { TrackArtist, FollowedArtistType } from "@/types/SpotifyTypes/TrackArtist/type";
import { test } from "../SP-Tokens/API-SP-Tokens";
import { ItemsForArtistAlbums, TrackItem } from "@/types/SpotifyTypes/CurrentlyPlayingTrack/type";
import { _checkIfTracksAreSaved } from "../SP-Tracks/API-SP-Tracks";
import { CurrentlyPlaylistTracksItem } from "@/types/SpotifyTypes/CurrentlyAlbum/type";
import { _getAlbum } from "../SP-Albums/API-SP-Albums";

export const _getOneArtist = async (ids: string): Promise<TrackArtist | undefined> => {
    try {
        const url = ` https://api.spotify.com/v1/artists?ids=${ids}`
        const { access_token } = await test()
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${access_token}`,
            },
        });
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

    let idsString;

    if (typeof ids === 'string') {
        idsString = ids
    }
    else {
        idsString = ids.join(',');
    }
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



export const _getTopArtists = async (): Promise<FollowedArtistType> => {
    const url = "https://api.spotify.com/v1/me/top/artists?limit=10"
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

    return getTopsUserResult;

}

export const _getFollowedArtists = async (): Promise<FollowedArtistType> => {
    const url = "https://api.spotify.com/v1/me/following?type=artist&limit=40"
    const { access_token } = await test()
    const getFollowedUser = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${access_token}`,
        },
    });
    if (!getFollowedUser.ok) {
        throw new Error('Ошибка получения топ артистов');
    }
    const getTopsUserResult = await getFollowedUser.json()

    return getTopsUserResult.artists;
}

export const _getArtistsTopTracks = async (id: string): Promise<TrackItem[]> => {
    const url1 = `https://api.spotify.com/v1/artists/${id}/top-tracks?market=US`;
    const { access_token } = await test();

    const getTopTrack = await fetch(url1, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${access_token}`,
        },
    });

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
export const _getArtistsAlbums = async (id: string): Promise<CurrentlyPlaylistTracksItem> => {
    // const url1 = `https://api.spotify.com/v1/artists/${id}/top-tracks`
    // const url2 = `https://api.spotify.com/v1/me/tracks/contains?ids=${id}`
    const url3 = `https://api.spotify.com/v1/artists/${id}/albums`
    // const url4 = `https://api.spotify.com/v1/artists/${id}/related-artists`
    const { access_token } = await test()
    const getArtistsAlbums = await fetch(url3, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${access_token}`,
        },
    });
    if (!getArtistsAlbums.ok) {
        throw new Error('Ошибка получения топ артистов');
    }

    const getArtistsAlbumsResult: CurrentlyPlaylistTracksItem = await getArtistsAlbums.json()
    const isSaved = await _checkIfTracksAreSaved(getArtistsAlbumsResult.items.map((it, id) => it.id))
    const tracksWithSavedInfo: ItemsForArtistAlbums[] = await Promise.all(
        getArtistsAlbumsResult.items.map(async (item, index) => {
            const itemsAlbum = await _getAlbum(item.id);
            return {
                ...item,
                tracks: {
                    items: itemsAlbum.tracks.items,
                },
                isSaved: isSaved[index],
            };
        })
    );


    return { ...getArtistsAlbumsResult, items: tracksWithSavedInfo }
}

// const getTopAlbums = await fetch(url1, {
//     method: 'GET',
//     headers: {
//         'Authorization': `Bearer ${access_token}`,
//     },
// });
// if (!getTopAlbums.ok) {
//     throw new Error('Ошибка получения топ артистов');
// }
// const getTopAlbumsResult: CurrentlyPlaylistTracksItem = await getTopTrack.json()
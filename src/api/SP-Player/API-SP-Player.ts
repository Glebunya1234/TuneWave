"use server"
import { CurrentlyPlayingTrack } from "@/types/SpotifyTypes/CurrentlyPlayingTrack/type";
import { test } from "../SP-Tokens/API-SP-Tokens";
import { _CheckIsFollowArtist } from "../SP-Users/API-SP-Users";
import { fetchWithRetry, fetchWithRetryForWriteMethods } from "../ApiSpotify";

export const _getCurrentlyPlayingTrack = async (token?: string | null): Promise<CurrentlyPlayingTrack> => {
    const url = "https://api.spotify.com/v1/me/player/currently-playing"


    const response = await fetchWithRetry(url)
    if (!response.ok) {
        console.warn("Errorrrr")

    }
    const Data: CurrentlyPlayingTrack = await response.json();
    const checkedFollow = await _CheckIsFollowArtist(Data.item.artists.map(id => id.id))




    const WithSavedInfo = Data.item.artists.map((artist, index) => ({
        ...artist,
        isFollow: checkedFollow[index],

    }));

    return { ...Data, item: { ...Data.item, artists: WithSavedInfo } }
}

export const _SkipToNext = async (deviceId: string) => {
    const url = `https://api.spotify.com/v1/me/player/next?device_id=${deviceId}`;
    const options: RequestInit = {
        method: 'POST',
    };
    const response1 = await fetchWithRetryForWriteMethods(url, options);
    if (!response1.ok) {
        const error = await response1.json();
        console.error('Error:', error);
        return;
    }
    return null;
}

export const _PausePlayback = async (deviceId: string) => {
    const url = `https://api.spotify.com/v1/me/player/pause?device_id=${deviceId}`
    const options: RequestInit = {
        method: 'PUT',
    };
    const response1 = await fetchWithRetryForWriteMethods(url, options);
    if (!response1.ok) {
        const error = await response1.json();
        console.error('Error:', error);
        return;
    }
    return null;
}
export const _SkipToBack = async (deviceId: string) => {
    const url = `https://api.spotify.com/v1/me/player/previous?device_id=${deviceId}`;
    const options: RequestInit = {
        method: 'POST',
    };
    const response1 = await fetchWithRetryForWriteMethods(url, options);
    if (!response1.ok) {
        const error = await response1.json();
        console.error('Error:', error);
        return;
    }
    return null;
}
export const _TransferPlayback = async (deviceId: string) => {
    const url1 = 'https://api.spotify.com/v1/me/player';

    const options1: RequestInit = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            device_ids: [deviceId],
        }),
    };

    try {
        const response1 = await fetchWithRetryForWriteMethods(url1, options1);

        if (!response1.ok) {
            const error = await response1.json();
            console.error('Error:', error);
            return false;
        }

        return true;
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
};
// export const _TransferPlayback = async (deviceId: string) => {


//     const url1 = 'https://api.spotify.com/v1/me/player';

//     const options1: RequestInit = {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({

//             device_ids: [
//                 deviceId
//             ]
//         }),
//     };
//     const response1 = await fetchWithRetryForWriteMethods(url1, options1);

//     if (!response1.ok) {
//         const error = await response1.json();
//         console.error('Error:', error);
//         return;
//     }

//     return null;
// }
export const _PlayTrackPlayback = async (deviceId: string) => {



    const url2 = 'https://api.spotify.com/v1/me/player/play';

    const options2: RequestInit = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const response2 = await fetchWithRetryForWriteMethods(url2, options2);
    if (!response2.ok) {
        const error = await response2.json();
        console.error('Error:', error);
        return;
    }
    return null;
}
export const _setPlayTrack = async (uri: string, deviceId: string) => {

    const url2 = 'https://api.spotify.com/v1/me/player/play';

    const options2: RequestInit = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({

            offset: {
                position: 0,
            },
            uris: [uri],
            position_ms: 0,
        }),
    };



    const response2 = await fetchWithRetryForWriteMethods(url2, options2);

    if (!response2.ok) {
        const error = await response2.json();
        console.error('Error:', error);
        return;
    }
    return null;
}

export const _UnSaveTrack = async (ids: string) => {
    const url = `https://api.spotify.com/v1/me/tracks?ids=${ids}`;
    const options: RequestInit = {
        method: 'DELETE',
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
    return null;
}
export const _SaveTrack = async (ids: string) => {
    const url = `https://api.spotify.com/v1/me/tracks?ids=${ids}`;
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

    const data = await response.json();
    return data;

}

export const setRepeatMode = async (state: "off" | "context" | "track") => {
    try {
        const url = `https://api.spotify.com/v1/me/player/repeat?state=${state}`
        const options: RequestInit = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetchWithRetryForWriteMethods(url, options);
        if (!response.ok) {
            throw new Error("error");
        }
        return
    } catch (error) {
        console.error(error);
    }
};
export const setPlaybackShuffle = async (state: boolean) => {
    try {
        const url = 'https://api.spotify.com/v1/me/player/shuffle?state=false'
        const url2 = 'https://api.spotify.com/v1/me/player/shuffle?state=true'


        const options1: RequestInit = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetchWithRetryForWriteMethods(state ? url : url2, options1);



        if (!response.ok) {
            throw new Error("Не удалось получить очередь воспроизведения");
        }
        return
    } catch (error) {
        console.error(error);
    }
};
export const getPlaybackQueue = async () => {
    try {
        const url = "https://api.spotify.com/v1/me/player/queue"
        const response = await fetchWithRetry(url)

        if (!response.ok) {
            throw new Error("Не удалось получить очередь воспроизведения");
        }

        const data = await response.json();


        return data;
    } catch (error) {
        console.error("Ошибка получения очереди воспроизведения:", error);
    }
};

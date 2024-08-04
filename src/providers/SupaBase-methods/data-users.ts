import { createClient } from '@/utils/supabase/server'; // Ваш путь к createClient

export const getUserToken = async (): Promise<string | null> => {
    try {
        const supabase = createClient();
        const { data: session, error } = await supabase.auth.getSession();
        if (error || !session) {
            console.error('Ошибка получения сессии:', error);
            return null;
        }
        return session.session?.provider_token || "";
    } catch (error) {
        console.error('Ошибка в getUserData:', error);
        return null;
    }
};

export const refreshToken = async (): Promise<string | null> => {
    const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
    const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!;
    const client_secret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET!;
    const supabase = createClient();

    // Получите текущую сессию
    const { data: session, error } = await supabase.auth.getSession();
    const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

    try {
        const response = await fetch(TOKEN_ENDPOINT, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${basic}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: session.session?.provider_refresh_token || "",
                client_id: client_id
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Ошибка обновления токена:', errorData);
            return null;
        }

        const data = await response.json();
        console.log(data)
        return data.access_token;
    } catch (error) {
        console.error('Ошибка в refreshToken:', error);
        return null;
    }
};

export const getUserSpotifyData = async (): Promise<any> => {
    try {

        const token = await getUserToken()

        const response = await fetch('https://api.spotify.com/v1/me', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();
        await getSavedTrackUser()

        return data;
    } catch (error) {
        console.error('Ошибка в getUserSavedAudiobooks:', error);
        return null;
    }
};

export const getSavedTrackUser = async (): Promise<any> => {
    const token = await getUserToken()

    const response = await fetch('https://api.spotify.com/v1/me/tracks', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    const data = await response.json();
    console.log('Saved track:', data);
    // Вывод треков
    if (data.items && data.items.length > 0) {
        data.items.forEach((item: any) => {
            console.log('Track:', {
                addedAt: item.added_at,
                name: item.track.name,
                artist: item.track.artists.map((artist: any) => artist.name).join(', '),
                album: item.track.album.name,
                albumCover: item.track.album.images[0]?.url, // URL обложки альбома
            });
        });
    } else {
        console.log('No saved tracks found.');
    }

    return data;
};
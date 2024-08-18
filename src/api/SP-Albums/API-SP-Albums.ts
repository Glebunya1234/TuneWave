"use server"
import { CurrentlyAlbum } from "@/types/SpotifyTypes/CurrentlyAlbum/type";
import { test } from "../SP-Tokens/API-SP-Tokens";

export const _getAlbum = async (id: string): Promise<CurrentlyAlbum> => {

    const url = `https://api.spotify.com/v1/albums/${id}`
    const { access_token } = await test()
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${access_token}`,
        },
    });
    if (!response) {
        console.warn("AlbumErrorrrr")

    }

    const Data = await response.json();
    return Data
}


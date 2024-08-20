"use server"
import { _getRecommendations, _getSimilarPlaylist } from "@/api/SP-Playlists/API-SP-MixPlaylist";
import { _getItemsCurrentPlaylist } from "@/api/SP-Playlists/API-SP-Playlists";

export const fetcher = async (
    id: string,
    genre: string | null,
    list: string | null,
    offset: number,
) => {
    if (id.includes("randomlist")) {
        return await _getRecommendations();
    } else if (id.includes("genre")) {
        return await _getSimilarPlaylist(
            genre!.replace(/%20/g, "+"),
            true,
            genre!.replace(/%20/g, " ")
        );
    } else if (id.includes("list")) {
        console.log('offset', offset)
        return await _getItemsCurrentPlaylist(
            `https://api.spotify.com/v1/playlists/${list}/tracks?limit=40&offset=${offset}`,
            list!
        );
    } else {
        return await _getSimilarPlaylist(id);
    }
};

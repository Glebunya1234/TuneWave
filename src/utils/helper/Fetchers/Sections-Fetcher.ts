"use server"

import { _getFollowedArtists, _getTopArtists } from "@/api/SP-Artists/API-SP-Artists";
import { _getRecommendations } from "@/api/SP-Playlists/API-SP-MixPlaylist";

export const SectionFetcher = async (
    id: string,

) => {
    console.log('id', id)
    if (id.includes("TopArtists")) {
        return await _getTopArtists()
    } else if (id.includes("FollowArtists")) {
        return await _getFollowedArtists();
    } else if (id.includes("ListenToThis")) {
        return await _getRecommendations();
    } else {
        return await _getTopArtists();
    }
};

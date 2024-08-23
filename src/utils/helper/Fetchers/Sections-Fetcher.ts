"use server"

import { _getFollowedArtists, _getTopArtists } from "@/api/SP-Artists/API-SP-Artists";
import { _getRecommendations } from "@/api/SP-Playlists/API-SP-MixPlaylist";
import { _getCurrentUserPlaylists } from "@/api/SP-Playlists/API-SP-Playlists";
import { fetcherGetCurrentUserPlaylist } from "@/components/Content/MediaPlaylist-Component/MediaPlaylist";

export const SectionFetcher = async (
    id: string,

) => {
    console.log('id', id)
    if (id.includes("TopArtists")) {
        return await _getTopArtists()
    } else if (id.includes("FollowedArtists")) {
        return await _getFollowedArtists();
    } else if (id.includes("ListenToThis")) {
        return await _getRecommendations();
    } else if (id.includes("FollowedPlaylists")) {
        return await _getCurrentUserPlaylists();
    }
    else {
        return await _getTopArtists();
    }
};

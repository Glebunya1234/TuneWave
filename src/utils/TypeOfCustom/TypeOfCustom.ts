import { CurrentlyPlaylistTracksItem } from "@/types/SpotifyTypes/CurrentlyPlaylist/type";
import { RecommendationsType } from "@/types/SpotifyTypes/RecommendationsType/type";

export const isTypeRecommendation = (data: any): data is RecommendationsType => {
    return (data as RecommendationsType).tracks !== undefined;
};

export const isCurrentlyPlaylistTracksItem = (
    data: any
): data is CurrentlyPlaylistTracksItem => {
    return (data as CurrentlyPlaylistTracksItem).items !== undefined;
};
import { CurrentlyPlaylist, CurrentlyPlaylistTracksItem } from "@/types/SpotifyTypes/CurrentlyPlaylist/type";
import { RecommendationsType } from "@/types/SpotifyTypes/RecommendationsType/type";
import { FollowedArtistType, TrackArtist } from "@/types/SpotifyTypes/TrackArtist/type";


export const _isTypeRecommendation = (data: any): data is RecommendationsType => {
    return (data as RecommendationsType)?.tracks !== undefined;
};

export const _isCurrentlyPlaylistTracksItem = (
    data: any
): data is CurrentlyPlaylistTracksItem => {
    return (data as CurrentlyPlaylistTracksItem).items !== undefined;
};
export const _isCurrentlyPlaylist = (
    data: any
): data is CurrentlyPlaylist => {
    return (data as CurrentlyPlaylist) !== undefined;
};

export const _isFollowedArtist = (
    data: any
): data is FollowedArtistType => {
    return (data as FollowedArtistType)?.items !== undefined;
};
export const _isTrackArtist = (
    data: any
): data is TrackArtist[] => {
    return (data as TrackArtist[]) !== undefined;
};
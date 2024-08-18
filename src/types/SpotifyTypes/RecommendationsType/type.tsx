import { TrackItem } from "../CurrentlyPlayingTrack/type";
import { Playlist } from "../CurrentlyPlaylist/type";

export type RecommendationsType = {
  artist: any;
  infoPlaylist: Playlist;
  tracks: TrackItem[];
};

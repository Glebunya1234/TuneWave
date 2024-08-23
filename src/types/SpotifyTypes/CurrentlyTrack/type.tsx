import { Album, Artist, TrackItem } from "../CurrentlyPlayingTrack/type";

export type tracks = {
  items: TrackItem[];
};
export type CurrentlyTrack = {
  album_type: string;
  total_tracks: string;
  artists: Artist[];
  album: Album;
  href: string;
  id: string;
  duration_ms: number;
  name: string;
  release_date: string;
  restrictions:{
    reason: "string"
  }
  type: string;
  uri: string;
};

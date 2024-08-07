import { Album, Artist, TrackItem } from "../CurrentlyPlayingTrack/type";

type tracks = {
  items: TrackItem[];
};
export type CurrentlyTrack = {
  album_type: string;
  total_tracks: string;
  artists: Artist[];
  album: Album;
  href: string;
  id: string;

  name: string;
  release_date: string;

  type: string;
  uri: string;
};

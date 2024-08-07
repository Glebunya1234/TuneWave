import { Artist, TrackItem } from "../CurrentlyPlayingTrack/type";

type tracks = {
  items: TrackItem[];
};
export type CurrentlyAlbum = {
  album_type: string;
  artists: Artist[];
  href: string;
  id: string;
  images: Array<{ url: string; height: number; width: number }>;
  label: string;
  name: string;
  release_date: string;
  tracks: tracks;
  type: string;
  uri: string;
};

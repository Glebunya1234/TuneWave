import { TrackItem } from "../CurrentlyPlayingTrack/type";

export type SavedTrack = {
  added_at: string;
  track: TrackItem;
};

export type SpotifyTracksResponse = {
  href: string;
  items: SavedTrack[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
};

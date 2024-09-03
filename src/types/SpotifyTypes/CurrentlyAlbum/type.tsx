import {
  Artist,
  ItemsForArtistAlbums,
  TrackItem,
} from "../CurrentlyPlayingTrack/type";
import { SpotifyTracksResponse } from "../TrackFavoriteType/type";

type tracks = {
  items: TrackItem[];
};
export type CurrentlyAlbum = {
  album_type: string;
  external_urls: {
    spotify: string;
  };
  artists: Artist[];
  href: string;
  id: string;
  images: Array<{ url: string; height: number; width: number }>;
  label: string;
  name: string;
  release_date: string;
  tracks: tracks;
  type: string;
  isSave: boolean;
  uri: string;
};

export type CurrentlyPlaylistTracksItem = Omit<
  SpotifyTracksResponse,
  "items"
> & {
  items: ItemsForArtistAlbums[];
};

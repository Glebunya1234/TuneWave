type Artist = {
  href: string;
  id: string;
  name: string;
};

type AlbumImage = {
  url: string;
};

type Album = {
  images: AlbumImage[];
  name: string;
  id: string;
};

type Track = {
  id: string;
  name: string;
  artists: Artist[];
  album: Album;
  uri: string;
  duration_ms: number;
};

export type SavedTrack = {
  added_at: string;
  track: Track;
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

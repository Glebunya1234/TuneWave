type Artist = {
  name: string;
};

type AlbumImage = {
  url: string;
};

type Album = {
  images: AlbumImage[];
  name: string;
};

type Track = {
  name: string;
  artists: Artist[];
  album: Album;
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

interface ExternalUrls {
  spotify: string;
}

export interface Artist {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
  isFollow: boolean;
}

export interface Album {
  album_type: string;
  artists: Artist[];
  available_markets: any[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Array<{ url: string; height: number; width: number }>;
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}

export interface TrackItem {
  album: Album;
  artists: Artist[];
  available_markets: any[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: { isrc: string };
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string | null;
  track_number: number;
  type: string;
  uri: string;
  isSaved: boolean;
}

export interface CurrentlyPlayingTrack {
  timestamp: number;

  context: {
    external_urls: ExternalUrls;
    href: string;
    type: string;
    uri: string;
  };
  progress_ms: number;
  item: TrackItem;
}

export type ItemsForArtistAlbums = {
  album_type: string;
  total_tracks: number;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: [
    {
      url: string;
    }
  ];
  name: string;
  release_date: string;
  release_date_precision: string;
  type: string;
  uri: string;
  artists: Artist[];
  album_group: string;
  isSaved: boolean;
  tracks: {
    items: TrackItem[];
  };
};

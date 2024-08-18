import { TrackItem } from "../CurrentlyPlayingTrack/type";
import { CurrentlyTrack } from "../CurrentlyTrack/type";
import { CurrentlyUserType } from "../CurrentlyUser/type";

export type CurrentlyPlaylist = {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: SimplifiedPlaylistObject[];
};

export type SimplifiedPlaylistObject = {
  collaborative: boolean;
  description: string;
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
  owner: {
    display_name: string;
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  primary_color: string;
  public: boolean;
  snapshot_id: string;
  tracks: {
    href: string;
    total: number;
  };
  type: string;
  uri: string;
};
export type Playlist = {
  description?: string;
  followers?: {
    href: string;
    total: number;
  };
  href?: string;
  id?: string;
  images: [
    {
      url: string;
    }
  ];
  name: string;
  owner?: {
    id: string;
  };
  UserFullInfo?: CurrentlyUserType;
  public?: boolean;
  type: string;
};

export type ItemPlaylist = {
  added_at: string;
  added_by: {
    external_urls: {
      spotify: string;
    };
    followers: {
      href: string;
      total: number;
    };
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  is_local: boolean;
  track: TrackItem;
};
export type CurrentlyPlaylistTracksItem = Omit<CurrentlyPlaylist, "items"> & {
  infoPlaylist: Playlist;
  items: ItemPlaylist[];
};

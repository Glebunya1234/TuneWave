type SpotifySearchResult = {
    albums: {
        href: string;
        items: Album[];
        limit: number;
        next: string | null;
        offset: number;
        previous: string | null;
        total: number;
    };
    artists: {
        href: string;
        items: Artist[];
        limit: number;
        next: string | null;
        offset: number;
        previous: string | null;
        total: number;
    };
    tracks: {
        href: string;
        items: Track[];
        limit: number;
        next: string | null;
        offset: number;
        previous: string | null;
        total: number;
    }; playlists: {
        href: string;
        items: Playlist[];
        limit: number;
        next: string | null;
        offset: number;
        previous: string | null;
        total: number;
    };
};

type Album = {
    album_type: string;
    artists: Artist[];
    available_markets: string[];
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    images: Image[];
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string;
};

type Artist = {
    external_urls: {
        spotify: string;
    };
    followers: {
        href: string | null;
        total: number;
    };
    genres: string[];
    href: string;
    id: string;
    images: Image[];
    name: string;
    popularity: number;
    type: string;
    uri: string;
};

type Track = {
    album: Album;
    artists: Artist[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    is_local: boolean;
    name: string;
    preview_url: string | null;
    track_number: number;
    type: string;
    uri: string;
};
type Playlist = {
    collaborative: boolean;
    description: string;
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    images: Image[];
    name: string;
    owner: Artist;
    public: boolean;
    snapshot_id: string;
    tracks: {
        href: string;
        total: number;
    };
    type: string;
    uri: string;
};
type Image = {
    height: number;
    url: string;
    width: number;
};

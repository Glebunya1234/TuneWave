export type TrackArtist = {
  external_urls: {
    spotify: "string";
  };
  followers: {
    href: "string";
    total: number;
  };
  genres: Array<string>;
  href: "string";
  id: "string";
  images: [
    {
      url: "string";
    }
  ];
  name: "string";
  popularity: number;
  type: "string";
  uri: "string";
};

export type FollowedArtistType = {
  href: "string";
  limit: number;
  next: "string";
  cursors: {
    after: "string";
    before: "string";
  };
  total: number;
  items: TrackArtist[];
};

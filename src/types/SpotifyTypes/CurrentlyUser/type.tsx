export type CurrentlyUserType = {
  display_name: string;
  country: string;
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string;
    total: number;
  };
  href: string;
  id: string;
  images: [
    {
      url: string;
    }
  ];
  type: string;
  product: string;
  uri: string;
};

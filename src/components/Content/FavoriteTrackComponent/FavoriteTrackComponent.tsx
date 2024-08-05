"use server";

import { _getSavedTrackUser, _getToken } from "@/api/ApiSpotify";
import React from "react";

interface Artist {
  name: string;
}

interface AlbumImage {
  url: string;
}

interface Album {
  images: AlbumImage[];
  name: string;
}

interface Track {
  name: string;
  artists: Artist[];
  album: Album;
  duration_ms: number;
}

interface SavedTrack {
  added_at: string;
  track: Track;
}

export interface SpotifyTracksResponse {
  href: string;
  items: SavedTrack[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
}

export const fetching = async (count: number): Promise<any> => {
  try {
    const token = await _getToken();
    const data: SpotifyTracksResponse = await _getSavedTrackUser(token, count);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return;
  }
};

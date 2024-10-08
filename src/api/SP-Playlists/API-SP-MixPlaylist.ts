"use server"
import { TrackItem } from "@/types/SpotifyTypes/CurrentlyPlayingTrack/type";
import { Playlist } from "@/types/SpotifyTypes/CurrentlyPlaylist/type";
import { RecommendationsType } from "@/types/SpotifyTypes/RecommendationsType/type";
import { test } from "../SP-Tokens/API-SP-Tokens";
import { _checkIfTracksAreSaved } from "../SP-Tracks/API-SP-Tracks";
import { _getOneArtist, _getTopArtists } from "../SP-Artists/API-SP-Artists";
import { fetchWithRetry } from "../ApiSpotify";

export const _getRecommendations = async (id?: string): Promise<RecommendationsType | string> => {
    try {

        const topArtists = await _getTopArtists();
        if (typeof topArtists === "string")
            throw new Error('Failed to obtain sufficient data to receive recommendations');

        const seedArtists: string[] = topArtists.items.length > 0
            ? topArtists.items.map(artist => artist.id).filter(id => id !== undefined)
            : [];

        const seedGenres: string[] = topArtists.items.length > 0
            ? topArtists.items.flatMap(artist => artist.genres).filter(genre => genre !== undefined)
            : [];


        const selectedSeedArtists = seedArtists.slice(0, 3);
        const selectedSeedGenres = seedGenres.slice(0, 2);
        if (selectedSeedArtists.length === 0 && selectedSeedGenres.length === 0) {
            throw new Error('Failed to obtain sufficient data to receive recommendations');
        }


        const ArtistIDString = selectedSeedArtists.join(',');
        const GangreString = selectedSeedGenres.join(',');
        const encodedArtist = ArtistIDString.replace(/ /g, '+').replace(/,/g, '%2C');
        const encodedGangre = GangreString.replace(/ /g, '+').replace(/,/g, '%2C');



        const url = `https://api.spotify.com/v1/recommendations?limit=10&seed_artists=${encodedArtist}&seed_genres=${encodedGangre}`;
        const response = await fetchWithRetry(url);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API Error: ${errorText}`);
        }

        const data: RecommendationsType = await response.json();

        const trackIds = data.tracks.map(track => track.id);
        const isSavedArray = await _checkIfTracksAreSaved(trackIds);

        const tracksWithSavedInfo: TrackItem[] = data.tracks.map((track, index) => ({
            ...track,
            isSaved: isSavedArray[index],
        }));

        return {
            ...data, infoPlaylist: {
                name: "Random playlist", images: [{
                    url: "/RandomPL.png"
                }],
                type: "Playlist",
                external_urls: {
                    spotify: ""
                },
                isSave: false
            }, tracks: tracksWithSavedInfo
        };
    }
    catch (error) {
        console.log('error :>> ', error);
        return `${error}`
    }
}
export const _getGengreRecommendations = async (): Promise<RecommendationsType | string> => {
    try {


        const topArtists = await _getTopArtists();
        if (typeof topArtists === "string")
            throw new Error('Failed to obtain sufficient data to receive recommendations');

        const seedGenres: string[] = topArtists.items.length > 0
            ? topArtists.items.flatMap(artist => artist.genres).filter(genre => genre !== undefined)
            : [];


        const selectedSeedGenres = seedGenres.slice(0, 5);
        if (selectedSeedGenres.length === 0) {
            throw new Error('Failed to obtain sufficient data to receive recommendations');
        }

        const GangreString = selectedSeedGenres.join(',');
        const encodedGangre = GangreString.replace(/ /g, '+').replace(/,/g, '%2C');
        const url = `https://api.spotify.com/v1/recommendations?limit=10&seed_genres=${encodedGangre}`;
        const response = await fetchWithRetry(url);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API Error: ${errorText}`);
        }


        const data: RecommendationsType = await response.json()
        const trackIds = data.tracks.map(track => track.id);
        const isSavedArray = await _checkIfTracksAreSaved(trackIds);

        const tracksWithSavedInfo: TrackItem[] = data.tracks.map((track, index) => ({
            ...track,
            isSaved: isSavedArray[index],
        }));

        return { ...data, tracks: tracksWithSavedInfo };
    }
    catch (error) {
        return `${error}`
    }
}

export const _getSimilarPlaylist = async (id: string, onlyGenre?: boolean, ganreName?: string): Promise<RecommendationsType> => {
    let url = `https://api.spotify.com/v1/recommendations?limit=10&seed_artists=${id}`;

    onlyGenre ? url = `https://api.spotify.com/v1/recommendations?limit=10&seed_genres=${id}` : url = `https://api.spotify.com/v1/recommendations?limit=10&seed_artists=${id}`
    const response = await fetchWithRetry(url);

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error: ${errorText}`);
    }


    if (!response.ok) {
        throw new Error('Failed to fetch recommendations');
    }

    const data: RecommendationsType = await response.json();

    const trackIds = data.tracks.map(track => track.id);
    const isSavedArray = await _checkIfTracksAreSaved(trackIds);
    const tracksWithSavedInfo: TrackItem[] = data.tracks.map((track, index) => ({
        ...track,
        isSaved: isSavedArray[index],
    }));
    let infoPlaylist: Playlist;
    if (!onlyGenre) {
        const artist = await _getOneArtist(id);
        infoPlaylist = {
            images: [
                {
                    url: artist?.images[0]?.url!
                }
            ],
            name: `Similar to: ${artist?.name}`,
            type: "Playlist",
        }
    } else {
        infoPlaylist = {

            name: `ganreName`,
            type: "Playlist",
            images: [
                {
                    url: "/DiscLogo2.png",
                }
            ],
        };
    }
    return { ...data, infoPlaylist: infoPlaylist, tracks: tracksWithSavedInfo };
};
// import { _getCurrentlyPlayingTrack, _getToken } from "@/api/ApiSpotify";
import { PlayingNowTrackArtistList } from "@/components/DataLists/PlayingNowTrackArtistList-Component/PlayingNowTrackArtistList";
import { InfoSideBar } from "./Right-side-bar";
import { ComponentPlayingTrack } from "@/components/Content/CurrentlyPlayingTrack-Component/ComponentPlayingTrack";

export const InfoBar = () => {
  return (
    <InfoSideBar>
      <ComponentPlayingTrack />
      <PlayingNowTrackArtistList />
      <p></p>
    </InfoSideBar>
  );
};

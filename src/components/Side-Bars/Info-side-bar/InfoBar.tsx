// import { _getCurrentlyPlayingTrack, _getToken } from "@/api/ApiSpotify";
import { _getCurrentlyPlayingTrack } from "@/api/ApiSpotify";
import { InfoSideBar } from "./Right-side-bar";
import { ComponentPlayingTrack } from "@/components/Content/CurrentlyPlayingTrack-Component/ComponentPlayingTrack";
import type { CurrentlyPlayingTrack } from "@/types/SpotifyTypes/CurrentlyPlayingTrack/type";
export const InfoBar = async () => {
  // const callback = async (): Promise<CurrentlyPlayingTrack> => {
  //   return
  // };

  return (
    <InfoSideBar>
      <ComponentPlayingTrack />
    </InfoSideBar>
  );
};

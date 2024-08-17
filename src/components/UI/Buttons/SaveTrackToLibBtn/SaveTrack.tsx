"use client";
import {
  _getCurrentlyPlayingTrack,
  _getTrack,
  _setPlayTrack,
  _SaveTrack,
  _UnSaveTrack,
} from "@/api/ApiSpotify";
import { useSWRConfig } from "swr";
import { useState } from "react";
import { TbMusicCheck, TbMusicPlus } from "react-icons/tb";
export const SaveTrackBtn = ({
  id,
  className,
  text,
  isSave,
}: {
  id: string;
  text?: any;
  isSave?: boolean;
  className?: string;
}) => {
  const { mutate } = useSWRConfig();
  const [state, setState] = useState(isSave);

  const OnClick = async (id: string) => {
    if (!state) {
      console.log("save");
      setState((prevState) => !prevState);

      mutate(`https://api.spotify.com/v1/me/tracks`, async () => {
        await _SaveTrack(id);
      });
    } else {
      console.log("delete");
      setState((prevState) => !prevState);
      await _UnSaveTrack(id);
    }
  };
  return (
    <button className={className} onClick={async () => await OnClick(id)}>
      <p>{state ? <TbMusicCheck /> : <TbMusicPlus />}</p>
    </button>
  );
};

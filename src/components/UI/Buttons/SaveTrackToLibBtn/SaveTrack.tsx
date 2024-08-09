"use client";
import {
  _getCurrentlyPlayingTrack,
  _setPlayTrack,
  SaveTrack,
  UnSaveTrack,
} from "@/api/ApiSpotify";
import { GlobalContext } from "@/Context";
import { useContext, useState } from "react";
import { TbMusicCheck, TbMusicPlus } from "react-icons/tb";
export const SaveTrackBtn = ({
  id,
  className,
  text,
  isSave,
}: {
  id: string;
  text?: any;
  isSave: boolean;
  className?: string;
}) => {
  const [state, setState] = useState(isSave);

  const OnClick = async (id: string) => {
    if (!state) {
      console.log("save");
      setState((prevState) => !prevState);
      await SaveTrack(id);
    } else {
      console.log("delete");
      setState((prevState) => !prevState);
      await UnSaveTrack(id);
    }
  };
  return (
    <button className={className} onClick={async () => await OnClick(id)}>
      <p>{state ? <TbMusicCheck /> : <TbMusicPlus />}</p>
    </button>
  );
};

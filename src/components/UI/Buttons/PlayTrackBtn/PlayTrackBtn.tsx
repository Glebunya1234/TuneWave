"use client";
import { _getCurrentlyPlayingTrack, _setPlayTrack } from "@/api/ApiSpotify";
import { GlobalContext } from "@/Context";
import { useContext } from "react";
export const PlayTrackBtn = ({
  id,
  className,
  text,
}: {
  id: string;
  text: any;
  className: string;
}) => {
  const dataContext = useContext(GlobalContext);
  const OnClick = async (id: string) => {
    await _setPlayTrack(id)
    const track = await _getCurrentlyPlayingTrack();
    dataContext.setStatePlaying(track);
  };
  return (
    <button className={className} onClick={async () => await OnClick(id) }>
      <p>{text}</p>
    </button>
  );
};

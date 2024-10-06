"use client";
import {
  _setPlayTrack,
  _getCurrentlyPlayingTrack,
} from "@/api/SP-Player/API-SP-Player";
import { GlobalContext } from "@/Context";
import { useContext, useState } from "react";
import { BsFillPlayFill } from "react-icons/bs";

type PlayTrackBtnType = {
  id: string;
  text: any;
  uriArray?: string[];
  onHover: { isTrue: boolean; content?: any };
  className: string;
};

export const PlayTrackBtn = ({
  id,
  className,
  text,
  uriArray,
  onHover,
}: PlayTrackBtnType) => {
  const dataContext = useContext(GlobalContext);
  const [hoverStates, setHoverStates] = useState(false);

  const OnClick = async (id: string) => {
    // const track = await _getCurrentlyPlayingTrack();
    // dataContext.setStatePlaying(track);
    if (uriArray?.length === 0)
      await _setPlayTrack(id, dataContext?.getDeviceID);
    else await _setPlayTrack(id, dataContext?.getDeviceID, uriArray);
  };

  const handleMouseEnter = (index?: boolean) => {
    if (index !== undefined) {
      setHoverStates((prev) => {
        return !prev;
      });
    }
  };

  const handleMouseLeave = (index?: boolean) => {
    if (index !== undefined) {
      setHoverStates((prev) => {
        return !prev;
      });
    }
  };

  return (
    <button
      className={className}
      onMouseEnter={() => handleMouseEnter(hoverStates)}
      onMouseLeave={() => handleMouseLeave(hoverStates)}
      onClick={async () => await OnClick(id)}
    >
      {onHover.isTrue ? (
        hoverStates ? (
          <BsFillPlayFill className="pl-[3px] text-xl text-center" />
        ) : (
          <p>{text}</p>
        )
      ) : (
        <p>{text}</p>
      )}
    </button>
  );
};

"use client";
import { _getCurrentlyPlayingTrack, _setPlayTrack } from "@/api/ApiSpotify";
import { GlobalContext } from "@/Context";
import { useContext, useState } from "react";
import { BsFillPlayFill } from "react-icons/bs";
export const PlayTrackBtn = ({
  id,
  className,
  text,
  onHover,
}: {
  id: string;
  text: any;
  onHover: { isTrue: boolean; content?: any };
  className: string;
}) => {
  const dataContext = useContext(GlobalContext);
  const [hoverStates, setHoverStates] = useState(false);

  const OnClick = async (id: string) => {
    await _setPlayTrack(id);
    const track = await _getCurrentlyPlayingTrack();
    dataContext.setStatePlaying(track);
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

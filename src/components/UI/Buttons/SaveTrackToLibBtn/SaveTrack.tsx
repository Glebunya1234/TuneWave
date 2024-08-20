"use client";

import { useSWRConfig } from "swr";
import { useState } from "react";
import { TbMusicCheck, TbMusicPlus } from "react-icons/tb";
import { _SaveTrack, _UnSaveTrack } from "@/api/SP-Player/API-SP-Player";

type SaveTrackBtnType = {
  id: string;
  text?: any;
  isSave?: boolean;
  className?: string;
};
export const SaveTrackBtn = ({
  id,
  className,
  text,
  isSave,
}: SaveTrackBtnType) => {
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
      <p>{state ? <TbMusicCheck className="text-[#886b98]"/> : <TbMusicPlus />}</p>
    </button>
  );
};

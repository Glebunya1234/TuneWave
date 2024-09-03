"use client";

import { useSWRConfig } from "swr";
import { useEffect, useState } from "react";
import { TbMusicCheck, TbMusicPlus } from "react-icons/tb";
import { _SaveTrack, _UnSaveTrack } from "@/api/SP-Player/API-SP-Player";

type SaveTrackBtnType = {
  id: string;
  isSave?: boolean;
  className?: string;
  isPage?: boolean;
};
export const SaveTrackBtn = ({
  id,
  className,
  isPage,
  isSave,
}: SaveTrackBtnType) => {
  const { mutate } = useSWRConfig();
  const [state, setState] = useState(isSave);

  const OnClick = async (id: string) => {
    if (!state) {
      setState(true);

      mutate(`https://api.spotify.com/v1/me/tracks`, async () => {
        await _SaveTrack(id);
      });
    } else {
      if (isPage) setState(false);
      mutate(`https://api.spotify.com/v1/me/tracks`, async () => {
        await _UnSaveTrack(id);
      });
    }
  };
  return (
    <button className={className} onClick={async () => await OnClick(id)}>
      <p>
        {state ? <TbMusicCheck className="text-[#886b98]" /> : <TbMusicPlus />}
      </p>
    </button>
  );
};

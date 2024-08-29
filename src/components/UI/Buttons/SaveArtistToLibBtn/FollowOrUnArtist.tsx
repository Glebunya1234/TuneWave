"use client";

import { useSWRConfig } from "swr";
import { useState } from "react";
import { _SaveTrack, _UnSaveTrack } from "@/api/SP-Player/API-SP-Player";
import {
  _CheckIsFollowArtist,
  _UserFollowArtist,
  _UserUnFollowArtist,
} from "@/api/SP-Users/API-SP-Users";

type SaveTrackBtnType = {
  id: string;
  isSave?: boolean;
  className?: string;
};
export const FollowBtn = ({ id, className, isSave }: SaveTrackBtnType) => {
  const { mutate } = useSWRConfig();
  const [state, setState] = useState(isSave);
  const OnClick = async (id: string) => {
    if (!state) {
      setState((prevState) => !prevState);
      mutate(`FollowedArtists`, async () => {
        await _UserFollowArtist(id);
      });
    } else {
      setState((prevState) => !prevState);
      await _UserUnFollowArtist(id);
    }
  };
  return (
    <button className={className} onClick={async () => await OnClick(id)}>
      {state ? "Unfollow" : "Follow"}
    </button>
  );
};

"use client";

import { useSWRConfig } from "swr";
import { useState } from "react";

import { _SaveTrack, _UnSaveTrack } from "@/api/SP-Player/API-SP-Player";
import { CgPlayListAdd, CgPlayListCheck } from "react-icons/cg";
import {
  _UserFollowPlaylist,
  _UserUnFollowPlaylist,
} from "@/api/SP-Playlists/API-SP-Playlists";
import {
  _UserFollowAlbum,
  _UserUnFollowAlbum,
} from "@/api/SP-Albums/API-SP-Albums";

type SaveTrackBtnType = {
  id: string;
  className?: string;
  type: "playlist" | "album";
  isSave?: boolean;
};
export const FollowOrUnPlaylist = ({
  id,
  className,
  type,
  isSave,
}: SaveTrackBtnType) => {
  const { mutate } = useSWRConfig();
  const [state, setState] = useState(isSave);

  const OnClick = async (id: string) => {
    if (!state) {
      setState(true);
      mutate(
        `${type === "playlist" ? "FollowedPlaylists" : "FollowedAlbum"}`,
        async () => {
          type === "playlist"
            ? await _UserFollowPlaylist(id)
            : await _UserFollowAlbum(id);
        }
      );
    } else {
      setState(false);
      mutate(
        `${type === "playlist" ? "FollowedPlaylists" : "FollowedAlbum"}`,
        async () => {
          type === "playlist"
            ? await _UserUnFollowPlaylist(id)
            : await _UserUnFollowAlbum(id);
        }
      );
    }
  };
  return (
    <button className={className} onClick={async () => await OnClick(id)}>
      {state ? (
        <>
          <p>Unfollow</p>
          <CgPlayListCheck className="text-[30px]" />
        </>
      ) : (
        <>
          <p>Follow</p>
          <CgPlayListAdd />
        </>
      )}
    </button>
  );
};

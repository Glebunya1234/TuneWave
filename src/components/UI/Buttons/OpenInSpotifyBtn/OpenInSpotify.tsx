"use client";
import {
  _setPlayTrack,
  _getCurrentlyPlayingTrack,
} from "@/api/SP-Player/API-SP-Player";
import Link from "next/link";
import { MdOpenInNew } from "react-icons/md";

type PlayTrackBtnType = {
  href: string;
  text?: string;
  className: string;
};

export const OpenInSpotify = ({ href, text, className }: PlayTrackBtnType) => {
  return (
    <Link href={href} target="_blank" className={className}>
      {text}
      <MdOpenInNew />
    </Link>
  );
};

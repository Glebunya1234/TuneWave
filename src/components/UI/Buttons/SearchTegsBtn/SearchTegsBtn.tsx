"use client";
import style from "./SearchTegsBtn.module.scss";
import { BtnRouting } from "../RoutingButton/RoutingBt";
import { MdClearAll, MdMusicNote, MdPerson } from "react-icons/md";
import { CgMusicSpeaker } from "react-icons/cg";
import { HiViewList } from "react-icons/hi";

type SearchTegsType = {
  id: string;
  page: "All"|"Tracks"|"Album"|"Artist"|"Playlist";
};
const buttons = [
  { text: "All", segment: "", icon: <MdClearAll /> },
  { text: "Tracks", segment: "tracks", icon: <MdMusicNote /> },
  { text: "Album", segment: "album", icon: <CgMusicSpeaker /> },
  { text: "Artist", segment: "artist", icon: <MdPerson /> },
  { text: "Playlist", segment: "playlist", icon: <HiViewList /> },
];

export const SearchTegsBtn: React.FC<SearchTegsType> = ({ id, page }) => {
  return (
    <ul className={style.Ul_SearchTegsBtn}>
      {buttons.map(({ text, segment, icon }) => (
        <li key={segment || "all"} className={style.Li_SearchTegsBtn}>
          <BtnRouting
            text={text}
            path={`/search/${id}${segment ? `/${segment}` : ""}`}
            changeBackground={false}
            className={`${style.TegButton} ${
              text === page ? style.Active : ""
            }`}
          >
            <div className={style.TegButton__Icon}>{icon}</div>
          </BtnRouting>
        </li>
      ))}
    </ul>
  );
};

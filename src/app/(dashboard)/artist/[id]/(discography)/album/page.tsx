"use client";

import style from "./album.module.scss";
import { PanelTarget } from "@/components/UI/Target/PanelTarget";

const DiscographyAlbum = () => {
  return (
    <div className={style.Album }>
      <PanelTarget side="Top" />

      <div className={style.dash}></div>
      <div className={style.squarDash}></div>
      <PanelTarget side="Bottom" />
    </div>
  );
};

export default DiscographyAlbum;

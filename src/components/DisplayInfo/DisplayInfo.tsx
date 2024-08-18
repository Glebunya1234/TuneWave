import Image from "next/image";
import style from "./DisplayInfo.module.scss";
import { ReactElement } from "react";

type InfoType = {
  children: ReactElement;
  idForScroll: string;
  ImageSrc: string;
  Type: string;
  Name: string;
};
export const DisplayInfo = ({
  children,
  ImageSrc,
  Name,
  idForScroll,
  Type,
}: InfoType) => {
  // PlaylistPage
  return (
    <aside className={style.DisplayInfo__Content} id={`${idForScroll}`}>
      <section className={style.DisplayInfo__Preview}>
        <div className={style.Preview__image}>
          <div className={style.Images}>
            <Image
              src={ImageSrc}
              layout="fill"
              objectFit="cover"
              className={style.mark}
              alt="PlaylistImage"
            />
          </div>
        </div>
        <div className={style.Preview__Info}>
          <h3 className={style.Info__PlaylistType}>{Type}</h3>
          <h1 className={style.Info__PlaylistName}>{Name}</h1>
        </div>
      </section>
      {children}
    </aside>
  );
};

import Link from "next/link";
import style from "./PanelPGAT.module.scss";
import { BorderMarquee } from "../../Marquee/Border-Marquee/BorderMarquee";
import Image from "next/image";
type PGAT = {
  Href: string;
  FirstText: string;
  SecondText: string;
  ImageSRC: string;
};

export const PanelPGAT = ({ Href, FirstText, SecondText, ImageSRC }: PGAT) => {
  return (
    <Link href={Href} className={style.ForUserMix__Item}>
      <BorderMarquee shape="square" text={`${SecondText}`}>
        <aside className={style.Item__Conteiner}>
          <Image
            src={ImageSRC || "/FavoriteTrack.png"}
            layout="fill"
            objectFit="cover"
            alt={`${FirstText}`}
          />
          <span className={style.Item__Span}>{FirstText}</span>
        </aside>
      </BorderMarquee>
    </Link>
  );
};

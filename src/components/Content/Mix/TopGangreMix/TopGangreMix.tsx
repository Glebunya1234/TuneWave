"use server";

import Link from "next/link";
import Image from "next/image";
import style from "../For-user-Mix/ForUserMix.module.scss";

import { _getTopArtists } from "@/api/SP-Artists/API-SP-Artists";
import { PanelPGAT } from "@/components/UI/Buttons/Panel-PlayList-Genre-Artist-Track/PanelPGAT";

export const TopGangreMix = async () => {
  const topArtist = await _getTopArtists();

  let items;
  if (typeof topArtist !== "string") {
    const uniqueGenres = new Set(
      topArtist.items
        .filter((data) => data.genres[0] !== undefined)
        .slice(0, 6)
        .map((data) => data.genres[0])
    );

    items = Array.from(uniqueGenres).map((data, index) => (
      <PanelPGAT
        key={index}
        Href={`/playlist/genre?genre=${data}`}
        FirstText={data}
        SecondText={`${data}`}
        ImageSRC={"/DiscLogo.png"}
      />
    ));
  } else items;
  return (
    <section className={style.ForUserMix}>
      <div className={style.ForUserMix_Div}>
        <span className={style.Div__Span}>Similar to your genres:</span>
        <Link href={`/section/TopGenre`} className={style.Div__link}>
          Show all
        </Link>
      </div>
      <nav className={style.ForUserMix__Conteiner}>{items}</nav>
    </section>
  );
};

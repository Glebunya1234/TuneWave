"use client";

import style from "../For-user-Mix/ForUserMix.module.scss";
import Link from "next/link";
import Image from "next/image";

import { BorderMarquee } from "@/components/UI/Marquee/Border-Marquee/BorderMarquee";
import { _getFollowedArtists } from "@/api/SP-Artists/API-SP-Artists";
import { FollowedArtistType } from "@/types/SpotifyTypes/TrackArtist/type";
import useSWR from "swr";

export const FollowedArtist = () => {
  const { data, isLoading } = useSWR<FollowedArtistType>(
    `FollowedArtists`,
    async () => await _getFollowedArtists(),
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );
  const divs = Array.from({ length: 6 });
  const items = data?.items?.slice(0, 6).map((data, index) => (
    <Link
      href={`/artist/${data.id}`}
      className={style.ForUserMix__Item}
      key={index}
    >
      <BorderMarquee shape="square" text={`${data.name}`}>
        <aside className={style.Item__Conteiner}>
          <Image
            src={data.images[0].url || "/FavoriteTrack.png"}
            layout="fill"
            objectFit="cover"
            alt={`Image for Mix user #${index + 1}`}
          />
          <span>{data.name}</span>
        </aside>
      </BorderMarquee>
    </Link>
  ));
  return (
    <section className={style.ForUserMix}>
      <div className={style.ForUserMix_Div}>
        <span className={style.Div__Span}>Followed artists:</span>
        <Link href={`/section/FollowedArtists`} className={style.Div__link}>
          Show all
        </Link>
      </div>

      <nav className={style.ForUserMix__Conteiner}>
        {isLoading
          ? divs.map((_, id) => (
              <div key={id} className={style.ForUserMix__Item}>
                <div className="w-full h-full p-4 animate-pulse bg-[#00000094]">
                  <div className="w-full h-full bg-[#4e4e4e91]"></div>
                </div>
              </div>
            ))
          : items}
      </nav>
    </section>
  );
};

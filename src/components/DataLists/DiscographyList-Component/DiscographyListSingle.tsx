"use client";

import useSWR from "swr";
import style from "./DiscographyListSingle.module.scss";
import { _getArtistsAlbums } from "@/api/SP-Artists/API-SP-Artists";
import { CurrentlyPlaylistTracksItem } from "@/types/SpotifyTypes/CurrentlyAlbum/type";
import { PlaylistComponent } from "../PlayLists-Component/PlayListComponent";
import Image from "next/image";
import { AlbumInformation } from "../AlbumList-Component/AlbumInformation";
import Link from "next/link";
import { FaTh, FaThList } from "react-icons/fa";
import { HiViewGrid } from "react-icons/hi";

export const DiscographyListSingle = ({ id }: { id: string }) => {
  const { data, isLoading } = useSWR<CurrentlyPlaylistTracksItem>(
    `artistDiscography/single/${id}`,
    async () => await _getArtistsAlbums(id, "single"),
    {
      keepPreviousData: true,
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );
  console.log("artistDiscography/single", data);
  return (
    <div className={style.DiscographySingle}>
      <span className={`${style.DiscographySingle__Span}`}>
        <Link href={`/artist/${id}`} className={style.Span__Link}>
          {data?.items[0].artists[0].name}
        </Link>
        <nav className={style.Span__View}>
          <FaThList />
          <FaTh />
        </nav>
      </span>

      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center"></div>
      ) : (
        <aside className={style.DiscographySingle__Content}>
          {data?.items.map((it, inx) => (
            <section key={inx} className={style.Content__items}>
              <div className={style.items}>
                <div className={style.Preview__image}>
                  <Image
                    src={it?.images[0]?.url || ""}
                    layout="fill"
                    objectFit="cover"
                    alt=""
                  />
                </div>
                <div className={style.items__info}>
                  <Link href={`/album/${it.id}`} className={style.info__Link}>
                    {it.name}
                  </Link>
                  <aside>
                    {it.album_type} <span className="mx-[5px]">•</span>
                    {it.release_date}
                    <span className="mx-[5px]">•</span>
                    {it.total_tracks} tracks
                  </aside>
                  <nav></nav>
                </div>
              </div>
              <AlbumInformation data={it.tracks.items} />
            </section>
          ))}
        </aside>
      )}
    </div>
  );
};

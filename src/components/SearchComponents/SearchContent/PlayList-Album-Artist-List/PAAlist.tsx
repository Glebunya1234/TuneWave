"use client";
import { _Search } from "@/api/SP-Search/API-SP-Search";
import { GridPanelPGAT } from "@/components/UI/Buttons/Panel-PlayList-Genre-Artist-Track/GridPanelPGAT";
import { SpotifySearchResult } from "@/types/SpotifyTypes/SearchType/SearchType";
import { useEffect, useState } from "react";
import useSWR from "swr";

import style from "@/app/(dashboard)/search/search.module.scss";
import { Spinner } from "@/components/UI/Spinner/spinner";

export const PAAlist = ({
  Search,
  Offset,
  idForScroll,
  TypeFetchdata,
}: {
  Offset?: number;
  idForScroll: string;
  Search: string;
  TypeFetchdata: "playlists" | "artists" | "albums";
}) => {
  const [offset, setOffset] = useState(Offset || 0);
  const [fetching, setFetching] = useState(false);
  const [hasMore, setHasMore] = useState<string | null>("");

  const { data: initialData, isLoading } = useSWR<SpotifySearchResult | null>(
    `api/search/${Search}`,
    async () => {
      return await _Search(Search);
    },
    { keepPreviousData: true, revalidateOnFocus: false }
  );

  const { data: playlistData, mutate } = useSWR<SpotifySearchResult | null>(
    `api/search/${Search}/${TypeFetchdata}`,
    null,
    {
      keepPreviousData: true,
      revalidateOnFocus: false,
    }
  );

  useEffect(() => {
    if (initialData?.[TypeFetchdata] && !playlistData) {
      mutate(initialData, false);
    }
  }, [initialData, TypeFetchdata]);
  useEffect(() => {
    const fetchMoreData = async () => {
      if (fetching && hasMore !== null) {
        const newOffset = offset + 20;
        const singularType = TypeFetchdata.endsWith("s")
          ? TypeFetchdata.slice(0, -1)
          : TypeFetchdata;
        const newData = await _Search(Search, singularType, newOffset);

        mutate(
          (currentData: any) => ({
            ...currentData,
            [TypeFetchdata]: {
              ...currentData?.[TypeFetchdata],
              items: [
                ...(currentData?.[TypeFetchdata]?.items || []),
                ...(newData?.[TypeFetchdata]?.items || []),
              ],
              offset: newData?.[TypeFetchdata]?.offset,
              next: newData?.[TypeFetchdata]?.next,
            },
          }),
          false
        );
        setOffset(newOffset);
        setHasMore(newData?.[TypeFetchdata]?.next!);
        setFetching(false);
      }
    };

    fetchMoreData();
  }, [fetching]);

  useEffect(() => {
    const myDiv = document.getElementById(`${idForScroll}`);

    const scrollHandler = () => {
      if (myDiv) {
        if (myDiv.scrollHeight - (myDiv.scrollTop + myDiv.clientHeight) < 50) {
          setFetching(true);
        }
      }
    };

    if (myDiv) {
      myDiv.addEventListener("scroll", scrollHandler);
      return () => {
        myDiv.removeEventListener("scroll", scrollHandler);
      };
    }
  }, []);

  if (isLoading) return <Spinner />;
  return (
    <section className={style.Search__Content__Playlist} id={idForScroll}>
      {playlistData?.[TypeFetchdata]?.items.map((it: any, id) => (
          <GridPanelPGAT
            key={id}
            Href={
              TypeFetchdata === "albums"
                ? `/album/${it?.id}`
                : TypeFetchdata === "playlists"
                ? `/playlist/list${it?.id}?id=${it?.id}`
                : `/artist/${it?.id}`
            }
            FirstText={it?.name}
            SecondText={
              TypeFetchdata === "albums"
                ? it?.artists[0]?.name
                : TypeFetchdata === "playlists"
                ? it?.name
                : it?.name
            }
            ImageSRC={
              it?.images[0]?.url === undefined
                ? "/FavoriteTrack.png"
                : it?.images[0]?.url
            }
          />
        ))}
    </section>
  );
};

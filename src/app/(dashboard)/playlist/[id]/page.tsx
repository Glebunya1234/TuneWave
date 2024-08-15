"use client";
import style from "./playlist.module.scss";
import Image from "next/image";
import {
  _getOneArtist,
  _getSavedTrackUser,
  _getToken,
  _getRecommendations,
  _getSimilarPlaylist,
} from "@/api/ApiSpotify";
import { PanelTarget } from "@/components/UI/Target/PanelTarget";

import { RandomPlaylistComponent } from "@/components/Content/Mix/RandomPlaylist-Component/RandomPlaylist";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { RecommendationsType } from "@/types/SpotifyTypes/RecommendationsType/type";
import useSWR from "swr";
import { TrackArtist } from "@/types/SpotifyTypes/TrackArtist/type";

const fetcher = async (id: string, genre: string | null) => {
  if (id.includes("randomlist")) {
    return await _getRecommendations();
  } else if (id.includes("genre")) {
    return await _getSimilarPlaylist(genre!.replace(/%20/g, "+"), true);
  } else {
    return await _getSimilarPlaylist(id);
  }
};
const fetcher2 = async (id: string) => {
  return await _getOneArtist(id);
};
const PlaylistPage = () => {
  const searchParams = useSearchParams();
  const params = useParams<{ id: string }>();
  const genre = searchParams.get("genre") || "";
  const {
    data: data,
    error: error,
    isLoading: isLoading,
  } = useSWR<RecommendationsType>(
    `playlist/${params.id}`,
    () => fetcher(params.id, genre),
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );
  const { data: dataArtist } = useSWR<TrackArtist | undefined>(
    `artist/${params.id}`,
    () => fetcher2(params.id),
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );

  // const [userAllRecs, setUserAllRecs] = useState<RecommendationsType>();
  const [namePlaylist, setNamePlaylist] = useState("");
  const [src, setSrc] = useState("/FavoriteTrack.png");

  useEffect(() => {
    const fetchData = async () => {
      if (params.id.includes("randomlist")) {
        setNamePlaylist("random playlist");
        setSrc("/DiscLogo2.png");
      } else if (params.id.includes("genre")) {
        setNamePlaylist(genre.replace(/%20/g, " "));
        setSrc("/DiscLogo2.png");
      } else {
        setNamePlaylist("Similar to: " + dataArtist?.name);
        setSrc(dataArtist?.images[0]?.url || "/FavoriteTrack.png");
      }
    };

    fetchData();
  }, [params.id, searchParams]);

  return (
    <div className={style.Playlist}>
      <PanelTarget side="Top" />
      <aside className={style.Playlist__Content} id="PlaylistPage">
        <section className={style.Content__Preview}>
          <div className={style.Preview__image}>
            <div className={style.Images}>
              <Image
                src={src}
                layout="fill"
                objectFit="cover"
                className={style.mark}
                alt="PlaylistImage"
              />
            </div>
          </div>
          <div className={style.Preview__Info}>
            <h3 className={style.Info__PlaylistType}>Playlist</h3>
            <h1 className={style.Info__PlaylistName}>{namePlaylist}</h1>
          </div>
        </section>
        <RandomPlaylistComponent data={data} />
      </aside>
      <div className={style.dash}></div>
      <div className={style.squarDash}></div>
      <PanelTarget side="Bottom" />
    </div>
  );
};

export default PlaylistPage;

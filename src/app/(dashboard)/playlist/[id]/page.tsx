"use client";
import style from "./playlist.module.scss";
import Image from "next/image";
import useSWR from "swr/immutable";
import { PanelTarget } from "@/components/UI/Target/PanelTarget";

import { PlaylistComponent } from "@/components/DataLists/PlayLists-Component/PlayListComponent";
import { useParams, useSearchParams } from "next/navigation";
import { RecommendationsType } from "@/types/SpotifyTypes/RecommendationsType/type";
import { Spinner } from "@/components/UI/Spinner/spinner";
import { CurrentlyPlaylistTracksItem } from "@/types/SpotifyTypes/CurrentlyPlaylist/type";
import { DisplayInfo } from "@/components/DisplayInfo/DisplayInfo";
import {
  _getRecommendations,
  _getSimilarPlaylist,
} from "@/api/SP-Playlists/API-SP-MixPlaylist";
import { _getItemsCurrentPlaylist } from "@/api/SP-Playlists/API-SP-Playlists";
import { fetcher } from "@/utils/helper/Fetchers/PlayList-Fetcher";
import {
  isCurrentlyPlaylistTracksItem,
  isTypeRecommendation,
} from "@/utils/TypeOfCustom/TypeOfCustom";

const PlaylistPage = () => {
  const searchParams = useSearchParams();
  const params = useParams<{ id: string }>();
  const genre = searchParams.get("genre") || "";
  const list = searchParams.get("id") || "";

  const { data: data, isValidating } = useSWR<
    RecommendationsType | CurrentlyPlaylistTracksItem
  >(`playlist/${params.id}`, () => fetcher(params.id, genre, list, 0), {
    revalidateOnFocus: false,
    dedupingInterval: 60000,
  });

  return (
    <div className={style.Playlist}>
      <PanelTarget side="Top" />
      <>
        {isValidating && (
          <div className="w-full h-full flex justify-center items-center">
            <Spinner />
          </div>
        )}
        {data !== undefined ? (
          <DisplayInfo
            idForScroll={"PlaylistPage"}
            ImageSrc={
              data?.infoPlaylist?.images[0].url === undefined
                ? "/FavoriteTrack.png"
                : data?.infoPlaylist.images[0].url
            }
            Type={data?.infoPlaylist?.type! || ""}
            Owner={
              isCurrentlyPlaylistTracksItem(data)
                ? data.infoPlaylist
                : isTypeRecommendation(data)
                ? data.infoPlaylist
                : undefined
            }
            FollowersTotal={
              isCurrentlyPlaylistTracksItem(data)
                ? data.infoPlaylist.followers?.total
                : undefined
            }
            Total={
              isCurrentlyPlaylistTracksItem(data)
                ? data.total
                : isTypeRecommendation(data)
                ? data.tracks.length
                : undefined
            }
            Name={
              data?.infoPlaylist?.name === undefined
                ? ""
                : data?.infoPlaylist.name
            }
          >
            <PlaylistComponent
              Offset={isCurrentlyPlaylistTracksItem(data) ? data.offset : 0}
              PrivatePlaylist={isCurrentlyPlaylistTracksItem(data)}
              SrcKey={`playlist/${params.id}`}
              Params={{ id: params.id, list: list, genre: genre }}
              data={
                isTypeRecommendation(data)
                  ? data.tracks
                  : isCurrentlyPlaylistTracksItem(data)
                  ? data.items.map((it) => it.track)
                  : []
              }
            />
          </DisplayInfo>
        ) : (
          <></>
        )}
      </>

      <div className={style.dash}></div>
      <div className={style.squarDash}></div>
      <PanelTarget side="Bottom" />
    </div>
  );
};

export default PlaylistPage;

"use client";
import style from "./playlist.module.scss";
import useSWR from "swr/immutable";
import { useParams, useSearchParams } from "next/navigation";

import { PanelTarget } from "@/components/UI/Target/PanelTarget";
import { PlaylistComponent } from "@/components/DataLists/PlayLists-Component/PlayListComponent";
import { Spinner } from "@/components/UI/Spinner/spinner";
import { RecommendationsType } from "@/types/SpotifyTypes/RecommendationsType/type";
import { DisplayInfo } from "@/components/DisplayInfo/DisplayInfo";
import { FollowOrUnPlaylist } from "@/components/UI/Buttons/SavePlaylistToLibBtn/FollowOrUnPlaylist";
import { OpenInSpotify } from "@/components/UI/Buttons/OpenInSpotifyBtn/OpenInSpotify";
import { fetcher } from "@/utils/helper/Fetchers/PlayList-Fetcher";
import {
  _isCurrentlyPlaylistTracksItem,
  _isTypeRecommendation,
} from "@/utils/TypeOfCustom/TypeOfCustom";
import { CurrentlyPlaylistTracksItem } from "@/types/SpotifyTypes/CurrentlyPlaylist/type";

const PlaylistPage = () => {
  const searchParams = useSearchParams();
  const params = useParams<{ id: string }>();
  const genre = searchParams.get("genre") || "";
  const list = searchParams.get("id") || "";

  const { data: data, isLoading } = useSWR<
    RecommendationsType | CurrentlyPlaylistTracksItem
  >(`playlist/${params.id}`, () => fetcher(params.id, genre, list, 0), {
    revalidateOnFocus: false,
    dedupingInterval: 60000,
  });

  return (
    <div className={style.Playlist}>
      <PanelTarget side="Top" />
      <>
        {isLoading && (
          <div className="w-full h-full flex justify-center items-center">
            <Spinner />
          </div>
        )}
        {data !== undefined ? (
          <DisplayInfo
            idForScroll={"PlaylistPage"}
            ImageSrc={
              data?.infoPlaylist?.images[0].url === undefined
                ? "/RandomPL.png"
                : data?.infoPlaylist.images[0].url
            }
            Type={data?.infoPlaylist?.type! || ""}
            Owner={
              _isCurrentlyPlaylistTracksItem(data)
                ? data.infoPlaylist
                : _isTypeRecommendation(data)
                ? data.infoPlaylist
                : undefined
            }
            FollowersTotal={
              _isCurrentlyPlaylistTracksItem(data)
                ? data.infoPlaylist.followers?.total
                : undefined
            }
            FollowersText="Saves"
            Total={
              _isCurrentlyPlaylistTracksItem(data)
                ? data.total
                : _isTypeRecommendation(data)
                ? data.tracks.length
                : undefined
            }
            hrefSpotify={
              _isCurrentlyPlaylistTracksItem(data)
                ? data?.infoPlaylist?.external_urls?.spotify
                : undefined
            }
            Name={
              data?.infoPlaylist?.name === undefined
                ? ""
                : data?.infoPlaylist.name
            }
          >
            {_isCurrentlyPlaylistTracksItem(data) && (
              <nav className={`${style.TrackComponent__NavPanel} `}>
                <FollowOrUnPlaylist
                  type="playlist"
                  id={data?.infoPlaylist?.id!}
                  className={style.NavPanel__PlayTrackBtn}
                  isSave={data.infoPlaylist.isSave}
                />
                <OpenInSpotify
                  className={style.NavPanel__SaveTrackBtn}
                  href={data.infoPlaylist.external_urls.spotify}
                />
              </nav>
            )}
            <PlaylistComponent
              Offset={_isCurrentlyPlaylistTracksItem(data) ? data.offset : 0}
              PrivatePlaylist={_isCurrentlyPlaylistTracksItem(data)}
              SWRKey={`playlist/${params.id}`}
              Params={{ id: params.id, list: list, genre: genre }}
              data={
                _isTypeRecommendation(data)
                  ? data.tracks
                  : _isCurrentlyPlaylistTracksItem(data)
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

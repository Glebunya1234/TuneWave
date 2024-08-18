"use client";
import style from "./playlist.module.scss";
import Image from "next/image";
import useSWR from "swr/immutable";
import { PanelTarget } from "@/components/UI/Target/PanelTarget";

import { PlaylistComponent } from "@/components/Content/Mix/RandomPlaylist-Component/RandomPlaylist";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { RecommendationsType } from "@/types/SpotifyTypes/RecommendationsType/type";
import { Spinner } from "@/components/UI/Spinner/spinner";
import { CurrentlyPlaylistTracksItem } from "@/types/SpotifyTypes/CurrentlyPlaylist/type";
import { DisplayInfo } from "@/components/DisplayInfo/DisplayInfo";
import {
  _getRecommendations,
  _getSimilarPlaylist,
} from "@/api/SP-Playlists/API-SP-MixPlaylist";
import { _getItemsCurrentPlaylist } from "@/api/SP-Playlists/API-SP-Playlists";

const fetcher = async (
  id: string,
  genre: string | null,
  list: string | null
) => {
  if (id.includes("randomlist")) {
    return await _getRecommendations();
  } else if (id.includes("genre")) {
    return await _getSimilarPlaylist(
      genre!.replace(/%20/g, "+"),
      true,
      genre!.replace(/%20/g, " ")
    );
  } else if (id.includes("list")) {
    return await _getItemsCurrentPlaylist(
      `https://api.spotify.com/v1/playlists/${list}/tracks`,
      list!
    );
  } else {
    return await _getSimilarPlaylist(id);
  }
};

const PlaylistPage = () => {
  const searchParams = useSearchParams();
  const params = useParams<{ id: string }>();
  const genre = searchParams.get("genre") || "";
  const list = searchParams.get("id") || "";
  const { data: data, isValidating } = useSWR<
    RecommendationsType | CurrentlyPlaylistTracksItem
  >(`playlist/${params.id}`, () => fetcher(params.id, genre, list), {
    revalidateOnFocus: false,
    dedupingInterval: 60000,
  });

  // const [namePlaylist, setNamePlaylist] = useState("");
  // const [src, setSrc] = useState("/FavoriteTrack.png");

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (params.id.includes("randomlist")) {
  //       setNamePlaylist("random playlist");
  //       setSrc("/DiscLogo2.png");
  //     } else if (params.id.includes("genre")) {
  //       setNamePlaylist(genre.replace(/%20/g, " "));
  //       setSrc("/DiscLogo2.png");
  //     } else if (params.id.includes("list")) {
  //       // const InfoPlaylist = await _getPlaylist(list);
  //       // setNamePlaylist(InfoPlaylist.name);
  //       // setSrc(InfoPlaylist.images[0].url);
  //     } else {
  //       // const dataArtist = await _getOneArtist(params.id);
  //       // setNamePlaylist("Similar to: " + dataArtist?.name);
  //       // setSrc(dataArtist?.images[0]?.url || "/FavoriteTrack.png");
  //     }
  //   };

  //   fetchData();
  // }, [params.id, searchParams]);

  const isTypeRecommendation = (data: any): data is RecommendationsType => {
    return (data as RecommendationsType).tracks !== undefined;
  };

  const isCurrentlyPlaylistTracksItem = (
    data: any
  ): data is CurrentlyPlaylistTracksItem => {
    return (data as CurrentlyPlaylistTracksItem).items !== undefined;
  };

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
            Name={
              data?.infoPlaylist?.name === undefined
                ? ""
                : data?.infoPlaylist.name
            }
          >
            <PlaylistComponent
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
      {/* <aside className={style.Playlist__Content} id="PlaylistPage">
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
        {isValidating && (
          <div className="w-full h-full flex justify-center items-center">
            <Spinner />
          </div>
        )}
      </aside> */}
      <div className={style.dash}></div>
      <div className={style.squarDash}></div>
      <PanelTarget side="Bottom" />
    </div>
  );
};

export default PlaylistPage;

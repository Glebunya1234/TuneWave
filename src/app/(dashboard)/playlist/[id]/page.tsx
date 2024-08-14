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
import { TrackArtist } from "@/types/SpotifyTypes/TrackArtist/type";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { RecommendationsType } from "@/types/SpotifyTypes/RecommendationsType/type";

const PlaylistPage = () => {
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();

  const [userAllRecs, setUserAllRecs] = useState<RecommendationsType>();
  const [namePlaylist, setNamePlaylist] = useState("");
  const [src, setSrc] = useState("/FavoriteTrack.png");

  useEffect(() => {
    const fetchData = async () => {
      let data: RecommendationsType;
      if (params.id.includes("randomlist")) {
        setNamePlaylist("random playlist");
        console.log("randomlist", params.id);
        console.log("searchParams", searchParams.get("randomlist"));
        data = await _getRecommendations();

        setSrc("/DiscLogo2.png");
      } else if (params.id.includes("genre")) {
        console.log("genre", params.id);
        const genre = searchParams.get("genre") || "";
        setNamePlaylist(genre.replace(/%20/g, " "));
        data = await _getSimilarPlaylist(genre.replace(/%20/g, "+"), true);
        setSrc("/DiscLogo2.png");

        // const parts = .split("%2B");
        // const genre = parts[1];
      } else {
        console.log("params", params.id);
        const artist = await _getOneArtist(params.id);
        setNamePlaylist("Similar to: " + artist.name);
        data = await _getSimilarPlaylist(params.id);
        setSrc(artist?.images[0]?.url || "/FavoriteTrack.png");
      }
      setUserAllRecs(data);
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
        <RandomPlaylistComponent data={userAllRecs} />
      </aside>
      <div className={style.dash}></div>
      <div className={style.squarDash}></div>
      <PanelTarget side="Bottom" />
    </div>
  );
};

export default PlaylistPage;

// const playlistPage = async ({ params }: { params: { id: string } }) => {
//   let UserAllRecs;
//   let NamePlayList: string | TrackArtist;
//   let Src = "/FavoriteTrack.png";
//   if (params.id.includes("randomlist")) {
//     NamePlayList = "random playlist";
//     UserAllRecs = await _getRecommendations();
//   } else if (params.id.includes("genre")) {
//     const parts = params.id.split("%2B");
//     const genre = parts[1];
//     Src = "/DiscLogo2.png";

//     NamePlayList = genre.replace(/%20/g, " ");
//     UserAllRecs = await _getSimilarPlaylist(genre.replace(/%20/g, "+"), true);
//   } else {
//     const artist = await _getOneArtist(params.id);
//     NamePlayList = "Similar to: " + artist.name;
//     UserAllRecs = await _getSimilarPlaylist(params.id);
//     Src = artist?.images[0]?.url || "/FavoriteTrack.png";
//   }

//   return (
//     <div className={style.Playlist}>
//       <PanelTarget side="Top" />
//       <aside className={style.Playlist__Content} id="PlaylistPage">
//         <section className={style.Content__Preview}>
//           <div className={style.Preview__image}>
//             <div className={style.Images}>
//               <Image
//                 src={Src}
//                 layout="fill"
//                 objectFit="cover"
//                 className={style.mark}
//                 alt="PlaylistImage"
//               />
//             </div>
//           </div>
//           <div className={style.Preview__Info}>
//             <h3 className={style.Info__PlaylistType}>Playlist</h3>
//             <h1 className={style.Info__PlaylistName}>{NamePlayList}</h1>
//           </div>
//         </section>
//         <RandomPlaylistComponent data={UserAllRecs} />
//       </aside>
//       <div className={style.dash}></div>
//       <div className={style.squarDash}></div>
//       <PanelTarget side="Bottom" />
//     </div>
//   );
// };

// export default playlistPage;

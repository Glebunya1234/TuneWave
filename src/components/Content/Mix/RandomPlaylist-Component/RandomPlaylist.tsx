"use server";
import style from "@components/Content/FavoriteTrackComponent/FavoriteTrackComponent.module.scss";
import Image from "next/image";
import { _setPlayTrack, _getSavedTrackUser, _getToken } from "@/api/ApiSpotify";
import { formatDuration } from "@/utils/DurationFormatFunc";
import { Suspense } from "react";

import { IoTimerSharp } from "react-icons/io5";
import { RecommendationsType } from "@/types/SpotifyTypes/RecommendationsType/type";
import Link from "next/link";
import { PlayTrackBtn } from "@/components/UI/Buttons/PlayTrackBtn/PlayTrackBtn";
import { BsFillPlayFill } from "react-icons/bs";

export const RandomPlaylistComponent = async ({
  data,
}: {
  data?: RecommendationsType;
}) => {
  //   const [hoverStates, setHoverStates] = useState<{ [key: number]: boolean }>(
  //     {}
  //   );
  //   useEffect(() => {
  //     console.log(data);
  //   }, []);
  //   const dataContext = useContext(GlobalContext);

  //   const handleMouseEnter = (index: number) => {
  //     setHoverStates((prev) => ({ ...prev, [index]: true }));
  //   };

  //   const handleMouseLeave = (index: number) => {
  //     setHoverStates((prev) => ({ ...prev, [index]: false }));
  //   };

  //   const Play = (uri: string) => {
  //     _setPlayTrack(uri);
  //     dataContext?.setStatePlaying((prevState) => !prevState);
  //   };

  return (
    <Suspense fallback={<h2>🌀 Loading...</h2>}>
      <section className={`${style.Content__playlist}`}>
        <aside
          className={`${style.Playlist__Track} border-[#c1c0c5]  border-b-[1px]`}
        >
          <span className={style.TrackIndex}>#</span>
          <span></span>
          <span className={style.TrackInfo}>Name</span>
          <span className={style.TrackAlbum}>Album</span>
          <span>
            <IoTimerSharp className="mr-[11px]" />
          </span>
        </aside>
        {data?.tracks.map((item, index) => {
          const albumImageUrl =
            item.album.images.length > 0 ? item.album.images[0].url : "";

          return (
            <div key={index} className={style.Playlist__Track}>
              <PlayTrackBtn
                id={item.uri}
                onHover={{
                  isTrue: true,
                  content: (
                    <BsFillPlayFill className="pl-[3px] text-xl text-center" />
                  ),
                }}
                text={index + 1}
                className={style.TrackIndex}
              />
              <div className={style.TrackImage}>
                {albumImageUrl && (
                  <Image
                    src={albumImageUrl}
                    alt={item.album.name}
                    layout="fill"
                    className={style.AlbumImage}
                  />
                )}
              </div>
              <div className={style.TrackInfo}>
                <div className={style.TrackName}>
                  <Link href={`/track/${item.id}`}>
                    <p>{item.name}</p>
                  </Link>
                </div>
                <div className={style.TrackArtist}>
                  {item.artists.map((artist, index) => (
                    <Link key={index} href={`/artist/${artist.id}`}>
                      <p key={artist.name}>{artist.name}</p>
                    </Link>
                  ))}
                </div>
              </div>
              <Link
                href={`/album/${item.album.id}`}
                className={style.TrackAlbum}
              >
                <p>{item.album.name}</p>
              </Link>
              <div className={style.TrackDuration}>
                {formatDuration(item.duration_ms)}
              </div>
            </div>
          );
        })}
      </section>
    </Suspense>
  );
};

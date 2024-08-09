"use server";
import style from "./tracks.module.scss";
import Image from "next/image";
import {
  _getArtist,
  _getSavedTrackUser,
  _getToken,
  _getTrack,
} from "@/api/ApiSpotify";
import { PanelTarget } from "@/components/UI/Target/PanelTarget";
import Link from "next/link";
import { formatDuration } from "@/utils/DurationFormatFunc";
import { TrackComponent } from "@/components/Content/TrackContent-Component/TrackContent";
import { TrackArtist } from "@/types/SpotifyTypes/TrackArtist/type";

const Track = async ({ params }: { params: { id: string } }) => {
  const { track, isSaved } = await _getTrack(params.id);

  const dataArtist: TrackArtist[] = await _getArtist(
    track?.artists?.map((artist) => {
      return artist.id;
    })
  );

  return (
    <div className={style.Tracks}>
      <PanelTarget side="Top" />
      <aside className={style.Tracks__Content} id="pageTrack">
        <section className={style.Content__Preview}>
          <div className={style.Preview__image}>
            <div className={style.Images}>
              <Image
                src={
                  track.album?.images[0].url !== undefined
                    ? track.album.images[0].url
                    : "/FavoriteTrack.png"
                }
                layout="fill"
                objectFit="cover"
                className={style.mark}
                alt="AlbumImage"
              />
            </div>
          </div>
          <div className={style.Preview__Info}>
            <h3 className={style.Info__TrackType}>{track.type}</h3>
            <h1 className={style.Info__TrackName}>{track.name}</h1>
            <span className={style.Info__Track}>
              {track.artists !== undefined ? (
                track.artists.map((item, index) => {
                  return (
                    <>
                      <Link href={`/artist/${item.id}`} key={index}>
                        <p> {item.name}</p>
                      </Link>
                      <span className="mr-[5px]">•</span>
                    </>
                  );
                })
              ) : (
                <></>
              )}
              <span className="mr-[5px]">{track.album.release_date}</span>
              <span className="mr-[5px]">•</span>
              <span className="mr-[5px]">
                {formatDuration(track.duration_ms)}
              </span>
            </span>
          </div>
        </section>
        <TrackComponent data={track} isSaved={isSaved[0]} artist={dataArtist} />
      </aside>
      <div className={style.dash}></div>
      <div className={style.squarDash}></div>
      <PanelTarget side="Bottom" />
    </div>
  );
};

export default Track;

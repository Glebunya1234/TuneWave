"use server";
import style from "./tracks.module.scss";
import Image from "next/image";
import { _getSavedTrackUser, _getToken, _getTrack } from "@/api/ApiSpotify";
import { PanelTarget } from "@/components/UI/Target/PanelTarget";
import Link from "next/link";

const Track = async ({ params }: { params: { id: string } }) => {
  const data = await _getTrack(params.id);
  console.log("data", data);
  return (
    <div className={style.Tracks}>
      <PanelTarget side="Top" />
      <aside className={style.Tracks__Content} id="pageTrack">
        <section className={style.Content__Preview}>
          <div className={style.Preview__image}>
            <div className={style.Images}>
              <Image
                src={data.album.images[0].url || "/FavoriteTrack.png"}
                layout="fill"
                objectFit="cover"
                className={style.mark}
                alt="AlbumImage"
              />
            </div>
          </div>
          <div className={style.Preview__Info}>
            <h3 className={style.Info__TrackType}>{data.type}</h3>
            <h1 className={style.Info__TrackName}>{data.name}</h1>
            <span className={style.Info__Track}>
              {data.artists !== undefined ? (
                data.artists.map((item, index) => {
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
              <span>{data.release_date}</span>
            </span>
          </div>
        </section>
      </aside>
      <div className={style.dash}></div>
      <div className={style.squarDash}></div>
      <PanelTarget side="Bottom" />
    </div>
  );
};

export default Track;

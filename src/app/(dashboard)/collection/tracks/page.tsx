"use server";
import style from "./tracks.module.scss";
import Image from "next/image";
import { PanelTarget } from "@/components/UI/Target/PanelTarget";
import { FavoriteTrackComponent } from "@/components/DataLists/FavoriteTracksList-Component/FavoriteTrackConteiner";
import { GetDataProfileUser } from "@/providers/SupaBase-methods/user-action";
import Link from "next/link";

const CollectionTracks = async () => {
  // const data = await _getSavedTrackUser("token", 0);
  const userData = await GetDataProfileUser();
  return (
    <div className={style.Tracks}>
      <PanelTarget side="Top" />
      <aside className={style.Tracks__Content} id="FavoriteContent">
        <section className={style.Content__Preview}>
          <div className={style.Preview__image}>
            <Image
              src="/FavoriteTrack.png"
              layout="fill"
              objectFit="cover"
              className={style.mark}
              alt="alt"
            />
          </div>
          {/* <h1>Favorite tracks</h1> */}
          <div className={style.Preview__Info}>
            <h3 className={style.Info__TrackType}>Playlist</h3>
            <h1>FAVORITE TRACKS</h1>
            <span className={style.Info__Track}>
              <Image
                src={userData.user?.user_metadata.avatar_url}
                width={25}
                height={25}
                alt="Arrow2"
                className={`${style.mask} ${style["mask-parallelogram"]}`}
              />
              <Link href={`/artist/`}>
                <p> {userData.user?.user_metadata?.full_name}</p>
              </Link>
              <span className="mr-[5px]">•</span>
              {/* <span className="mr-[5px]">{data.total} tracks</span> */}
            </span>
          </div>
        </section>

        {/* <FavoriteTrackComponent startData={data} Offset={20} /> */}
        <FavoriteTrackComponent />
      </aside>
      <div className={style.dash}></div>
      <div className={style.squarDash}></div>
      <PanelTarget side="Bottom" />
    </div>
  );
};

export default CollectionTracks;

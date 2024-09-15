"use server";
import style from "./tracks.module.scss";
import Image from "next/image";
import { PanelTarget } from "@/components/UI/Target/PanelTarget";
import { FavoriteTrackComponent } from "@/components/DataLists/FavoriteTracksList-Component/FavoriteTrackConteiner";
import { GetDataProfileUser } from "@/providers/SupaBase-methods/user-action";
import Link from "next/link";

const CollectionTracks = async () => {
  const userData = await GetDataProfileUser();

  return (
    <aside className={style.Tracks} id="FavoriteContent">
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
          </span>
        </div>
      </section>

      <FavoriteTrackComponent />
    </aside>
  );
};

export default CollectionTracks;

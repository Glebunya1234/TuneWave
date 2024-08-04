"use server";
import { GetDataProfileUser } from "@/providers/SupaBase-methods/user-action";
 
import style from "./headerUser.module.scss";
import Image from "next/image";
import { FaCircle } from "react-icons/fa";
import { getUserSpotifyData } from "@/providers/SupaBase-methods/data-users";
export const UserDataHeader = async () => {
  const userData = await GetDataProfileUser();
  // const lib = await getUserSpotifyData();
  // console.log("lib", lib);

  return userData !== null || undefined ? (
    <nav className={style.UserDataHeader}>
      <h1>Welcome to TuneWave</h1>
      <aside>
        <Image
          src={userData.user?.user_metadata.avatar_url}
          width={55}
          height={55}
          alt="Arrow2"
          className={`${style.mask} ${style["mask-parallelogram"]}`}
        />
        <h2>{userData.user?.user_metadata?.full_name}</h2>
        <h3>
          <FaCircle className="ml-3 mr-1 text-green-400 " />
          Online
        </h3>
      </aside>
    </nav>
  ) : (
    <></>
  );
};

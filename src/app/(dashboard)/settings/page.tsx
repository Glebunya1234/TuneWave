"use server";
import style from "./Settings.module.scss";
import { SignOutBTN } from "@/components/UI/Buttons/AuthBtn/SignOut-button/SignOutBtn";
import { OpenInSpotify } from "@/components/UI/Buttons/OpenInSpotifyBtn/OpenInSpotify";
import { GetDataProfileUser } from "@/providers/SupaBase-methods/user-action";
import { getDataCacheUser } from "@/utils/helper/CacheHelper/cacheHLP";
import Image from "next/image";
import { FaCircle } from "react-icons/fa";
const Settings = async () => {
  const userData = await getDataCacheUser();
  const userDataSupabase = await GetDataProfileUser();
  return (
    <div className={style.Settings}>
      <aside className={style.Settings_Content}>
        <section className={style.Content__SectionImage}>
          <div className={style.ImageStyles}>
            <Image
              src={
                userData?.images[1].url === undefined
                  ? ""
                  : userData?.images[1].url
              }
              layout="fill"
              objectFit="cover"
              className={` ${style.mark}`}
              alt=""
            />
          </div>
          <span>
            <h2>Status</h2>
            <h3>
              <FaCircle className="ml-3 mr-1 text-green-400 " />
              Online
            </h3>
          </span>
        </section>
        <section className={style.Content__SectionUserData}>
          <div className={style.UserData__DataConteiner}>
            <p>Username</p>
            <h2>{userData?.display_name}</h2>
            <div className="mt-[8px] w-full border-[#ffffffaf] border-[1px] " />
            <p>Email</p>
            <h2>{userDataSupabase.user?.email}</h2>
            <div className="mt-[8px] w-full border-[#ffffffaf] border-[1px] " />
            <p>Open a profile in the Spotify app</p>
            <OpenInSpotify
              href={`${userData.external_urls.spotify}`}
              text="Open in Spotify"
              className={style.OpenSpotifyBtn}
            />
            <div className="mt-[8px] w-full border-[#ffffffaf] border-[1px] " />
            <p>Log out of your account</p>
            <SignOutBTN />
          </div>
        </section>
      </aside>
    </div>
  );
};

export default Settings;

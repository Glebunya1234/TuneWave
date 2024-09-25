"use server";

import style from "./headerUser.module.scss";
import Image from "next/image";
import { FaCircle } from "react-icons/fa";
import { GetDataProfileUser } from "@/providers/SupaBase-methods/user-action";
import { SearchComponent } from "@/components/SearchComponents/SearchInput/SearchInput";

import { OpenPhoneSideBarBT } from "../../Buttons/OpenPhoneSideBarBT/OpenPhoneSideBarBT";

export const UserDataHeader = async () => {
  const userData = await GetDataProfileUser();

  return userData !== null || undefined ? (
    <nav className={style.UserDataHeader}>
      <OpenPhoneSideBarBT />
      <h1>Welcome to TuneWave</h1>
      <SearchComponent />
      <aside className={style.Info__User}>
        <Image
          src={userData.user?.user_metadata.avatar_url}
          width={55}
          height={55}
          alt="Arrow2"
          className={`${style.mask}`}
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

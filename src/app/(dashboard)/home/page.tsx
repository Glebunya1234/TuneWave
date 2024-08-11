"use server";
import style from "./profile.module.scss";
import React from "react";
import { PanelTarget } from "@/components/UI/Target/PanelTarget";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { FavoriteBanner } from "@/components/Banner/FavoriteBanner/FavoriteBanner";
import { getRecommendations } from "@/api/ApiSpotify";
import { ForUserMix } from "@/components/Content/Mix/For-user-Mix/ForUserMix";

const Profile = async () => {
  // const UserAllRecs = await getRecommendations();
  return (
    <main className={style.profile}>
      <section className={style.profile__Dashboard}>
        <PanelTarget side="Top" />
        <aside className={style.profile__Content}>
          <div className={style.dash}></div>
          <div className={style.squarDash}></div>
          <aside className={style.Content__Conteiner}>
            <FavoriteBanner />
            <ForUserMix />
          </aside>
        </aside>
        <PanelTarget side="Bottom" />
      </section>
    </main>
  );
};

export default Profile;

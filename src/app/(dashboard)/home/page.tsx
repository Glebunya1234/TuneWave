"use server";
import style from "./profile.module.scss";
import React from "react";
import { PanelTarget } from "@/components/UI/Target/PanelTarget";
import { FavoriteBanner } from "@/components/Banner/FavoriteBanner/FavoriteBanner";
import { _getTopArtists } from "@/api/ApiSpotify";
import { ForUserMix } from "@/components/Content/Mix/For-user-Mix/ForUserMix";
import { TopArtistMix } from "@/components/Content/Mix/TopArtistMix/TopArtistMix";
import { TopGangreMix } from "@/components/Content/Mix/TopGangreMix/TopGangreMix";

const Profile = async () => {
  // const UserAllRecs = await getRecommendations();
  // console.log(await _getTopArtists());
  return (
    <main className={style.profile}>
      <section className={style.profile__Dashboard}>
        <PanelTarget side="Top" />
        <aside className={style.profile__Content}>
          <div className={style.dash}></div>
          <div className={style.squarDash}></div>
          <aside className={style.Content__Conteiner}>
            <FavoriteBanner />
            <TopArtistMix />
            <TopGangreMix />
            <ForUserMix />
          </aside>
        </aside>
        <PanelTarget side="Bottom" />
      </section>
    </main>
  );
};

export default Profile;

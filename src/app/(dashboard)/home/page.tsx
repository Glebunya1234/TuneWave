"use server";
import style from "./profile.module.scss";
import React from "react";
import { PanelTarget } from "@/components/UI/Target/PanelTarget";
import { FavoriteBanner } from "@/components/Banner/FavoriteBanner/FavoriteBanner";
import { TopArtistMix } from "@/components/Content/Mix/TopArtistMix/TopArtistMix";
import { TopGangreMix } from "@/components/Content/Mix/TopGangreMix/TopGangreMix";
import { FollowedArtist } from "@/components/Content/Mix/FollowedArtist/FollowedArtist";
import { RandomMix } from "@/components/Content/Mix/For-user-Mix/RandomMix";
import { ListenToThisCmp } from "@/components/Content/Mix/ListenToThis-Component/RandomMix";

const Profile = async () => {
  return (
    <main className={style.profile}>
      <section className={style.profile__Dashboard}>
        <PanelTarget side="Top" />
        <aside className={style.profile__Content}>
          <div className={style.dash}></div>
          <div className={style.squarDash}></div>
          <aside className={style.Content__Conteiner}>
            <FavoriteBanner />
            <RandomMix />
            {/* <TopArtistMix /> */}
            {/* <FollowedArtist /> */}
            {/* <ListenToThisCmp /> */}
            {/* <TopGangreMix /> */}
          </aside>
        </aside>
        <PanelTarget side="Bottom" />
      </section>
    </main>
  );
};

export default Profile;

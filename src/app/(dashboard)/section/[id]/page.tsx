"use server";
import style from "./section.module.scss";
import React from "react";
import { PanelTarget } from "@/components/UI/Target/PanelTarget";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { FavoriteBanner } from "@/components/Banner/FavoriteBanner/FavoriteBanner";
import Image from "next/image";
import Link from "next/link";

const Section = async () => {
  // const UserAllRecs = await getRecommendations();
  return (
    <div className={style.Section}>
      <PanelTarget side="Top" />
      <aside className={style.Section__Content} id="SectionPage">
        <section className={style.Content__Preview}>
          <div className={style.Preview__image}>
            <div className={style.Images}>
              <Image
                src={"/FavoriteTrack.png"}
                layout="fill"
                objectFit="cover"
                className={style.mark}
                alt="SectionImage"
              />
            </div>
          </div>
          <div className={style.Preview__Info}>
            <h3 className={style.Info__SectionType}>type</h3>
            <h1 className={style.Info__SectionName}>name</h1>
            <span className={style.Info__Section}>
              <>
                <Link href={`/artist/`}>
                  <p> link</p>
                </Link>
                <span className="mr-[5px]">•</span>
              </>
              <span>release</span>
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

export default Section;

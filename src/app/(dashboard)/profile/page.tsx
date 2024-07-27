import style from "./profile.module.scss";
import React from "react";
import { PanelTarget } from "@/components/UI/Target/PanelTarget";

const Profile = () => {
  return (
    <div className={style.profile}>
      <section className={style.profile__Dashboard}>
        <PanelTarget side="Top" />
        <aside className={style.profile__Content}>
          <div className={style.dash}></div>
          <div className={style.squarDash}></div>
        </aside>
        <PanelTarget side="Bottom" />
      </section>
    </div>
  );
};

export default Profile;

import { PanelTarget } from "@/components/UI/Target/PanelTarget";
import style from "./Settings.module.scss";
import { SignOutBTN } from "@/components/UI/Buttons/AuthBtn/SignOut-button/SignOutBtn";

const Settings = () => {
  return (
    <div className={style.Settings}>
      <section className={style.Settings__Dashboard}>
        <PanelTarget side="Top" />
        <aside className={style.Settings__Content}>
          <div className={style.dash}></div>
          <div className={style.squarDash}></div>
          <SignOutBTN />
          <div>Settings</div>
        </aside>
        <PanelTarget side="Bottom" />
      </section>
    </div>
  );
};

export default Settings;

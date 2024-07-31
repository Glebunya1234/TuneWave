import { PanelTarget } from "@/components/UI/Target/PanelTarget";
import style from "./Settings.module.scss";
import { SingOutBTN } from "@/components/UI/Buttons/AuthBtn/SignOut-button/SignOutBtn";

const Settings = () => {
  return (
    <div className={style.Settings}>
      <section className={style.Settings__Dashboard}>
        <PanelTarget side="Top" />
        <aside className={style.Settings__Content}>
          <div className={style.dash}></div>
          <div className={style.squarDash}></div>
          <SingOutBTN />
          <div className={style.ss}>Settings</div>
        </aside>
        <PanelTarget side="Bottom" />
      </section>
    </div>
  );
};

export default Settings;

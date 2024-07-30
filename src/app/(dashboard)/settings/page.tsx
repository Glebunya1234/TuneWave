import { PanelTarget } from "@/components/UI/Target/PanelTarget";
import style from "./Settings.module.scss";
import SingOut from "@/components/UI/Buttons/out";

const Settings = () => {
  return (
    <div className={style.Settings}>
      <section className={style.Settings__Dashboard}>
        <PanelTarget side="Top" />
        <aside className={style.Settings__Content}>
          <div className={style.dash}></div>
          <div className={style.squarDash}></div>
          <SingOut />
          <h1>Settings</h1>
        </aside>
        <PanelTarget side="Bottom" />
      </section>
    </div>
  );
};

export default Settings;

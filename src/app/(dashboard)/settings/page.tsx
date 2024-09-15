import { PanelTarget } from "@/components/UI/Target/PanelTarget";
import style from "./Settings.module.scss";
import { SignOutBTN } from "@/components/UI/Buttons/AuthBtn/SignOut-button/SignOutBtn";

const Settings = () => {
  return (
    <div className={style.Settings}>
      <section className={style.Settings__Dashboard}>
        <aside className={style.Settings__Content}>
          <SignOutBTN />
          <div>Settings</div>
        </aside>
      </section>
    </div>
  );
};

export default Settings;

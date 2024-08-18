import style from "./header.module.scss";
import { PanelBurger } from "../../Panel_HideShow-Burger/Panel_Burger";
import { UserDataHeader } from "../header-user-data/headerUser";
export const Header = () => {
  return (
    <header className={style.header}>
      <div className={style.header__content}>
        <PanelBurger side="Left" />
        <aside className={style.content__data}>
          <UserDataHeader />
        </aside>
        <PanelBurger side="Right" />
      </div>
    </header>
  );
};

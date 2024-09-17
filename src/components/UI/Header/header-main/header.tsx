
import style from "./header.module.scss";
import { PanelBurger } from "../../Panel_HideShow-Burger/Panel_Burger";
import { UserDataHeader } from "../header-user-data/headerUser";
export const Header = () => {
  return (
    <header className={style.header}>
      <PanelBurger side="Left" />
      <UserDataHeader />
      <PanelBurger side="Right" />
    </header>
  );
};

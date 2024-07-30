import { CloseBarBtn } from "../Buttons/CloseSideBarBT/CloseBarBT";
import { PanelBurger } from "../Panel_HideShow-Burger/Panel_Burger";
import style from "./header.module.scss";
export const Header = () => {
  return (
    <header className={style.header}>
      <div className={style.header__content}>
        <PanelBurger side="Left"/>
        <aside>TuneWave</aside>
        <PanelBurger side="Right"/>
      </div>
    </header>
  );
};

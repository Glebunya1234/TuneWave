import { Target } from "./target";
import style from "./target.module.scss";

type Side = {
  side: "Top" | "Bottom";
};
export const PanelTarget: React.FC<Side> = ({ side }) => {
  if (side == "Top")
    return (
      <aside className={style.Target}>
        <Target angle="LeftUp" />
        <Target angle="RightUp" />
      </aside>
    );
  else
    return (
      <aside className={style.Target}>
        <Target angle="LeftDown" />
        <Target angle="RightDown" />
      </aside>
    );
};

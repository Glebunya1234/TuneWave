import { BtnRouting } from "@/components/UI/Buttons/RoutingButton/RoutingBt";
import style from "./Left-side-bar.module.scss";
import  "../../../app/globals.css";
export const MediaLibraryBar = () => {
  return (
    <section className={style.MediaLibrary}>
      <BtnRouting text="home" path={"../../../profile"} />
    </section>
  );
};

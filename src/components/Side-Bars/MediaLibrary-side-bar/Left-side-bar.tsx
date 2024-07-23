import { BtnRouting } from "@/components/UI/Buttons/RoutingButton/RoutingBt";
import style from "./Left-side-bar.module.scss";
export const MediaLibraryBar = () => {

  const holder ={
    Home: "go to home page",
    Search: "new music search page",
    Settigs: "profile customization",
  }
  return (
    <section className={style.MediaLibrary}>
      <nav className={style.MediaLibrary__Navigation}>
        <BtnRouting helpHolder={holder.Home} text="Home" path={"../../../profile"} />
        <BtnRouting helpHolder={holder.Search} text="Seartch" path={"../../../profile"} />
        <BtnRouting helpHolder={holder.Settigs} text="Settings" path={"../../../settings"} />
      </nav>
    </section>
  );
};

"use server";
import style from "./dashboard.module.scss";
import { Context } from "@components/Context-component/Context";
import { MarqueeContainer } from "@UI/Marquee/Marquee-Conteiner/MarqueeConteiner";
import { MarqueeUpdater } from "@UI/Marquee/Marquee-Updater/MarqueeUpdater";
import { Header } from "@/components/UI/Header/header-main/header";
import { MediaLibrary } from "@sidebars/MediaLibrary-side-bar/MediaLibrary";
import { InfoBar } from "@sidebars/Info-side-bar/InfoBar";
import { IsAuthorized } from "@/providers/SupaBase-methods/user-action";
import { SoundBar } from "../Side-Bars/Sound-side-bar/Bottom-side-bar";
import { MediaLibraryPhone } from "../Side-Bars/MediaLibrary-side-bar-phone/MediaLibrary-phone";
export const Dashboard = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  await IsAuthorized();
  return (
    <main className={`${style.dashboard}`}>
      <Context>
        <MarqueeUpdater />
        <MediaLibraryPhone />
        <div className={style.dashboard__content}>
          <MediaLibrary />
          <aside className={style.content__child}>
            <Header />
            <main className={style.child__Main}>{children}</main>
          </aside>
          <InfoBar />
        </div>
        <SoundBar />
        <section className={style.backgroundMarq}>
          <MarqueeContainer />
        </section>
      </Context>
    </main>
  );
};

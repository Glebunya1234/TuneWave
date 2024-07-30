import style from "./dashboard.module.scss";

import { NavigationBar } from "@components/Side-Bars/NavigationTrack-side-bar/Bottom-side-bar";
import { Context } from "@components/Context-component/Context";
import { MarqueeContainer } from "@UI/Marquee/Marquee-Conteiner/MarqueeConteiner";
import { MarqueeUpdater } from "@UI/Marquee/Marquee-Updater/MarqueeUpdater";
import { Header } from "@UI/Header/header";
import { MediaLibrary } from "@sidebars/MediaLibrary-side-bar/MediaLibrary";
import { InfoBar } from "@sidebars/Info-side-bar/InfoBar";
export const Dashboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className={`${style.dashboard}`}>
      <Context>
        <MarqueeUpdater />
        <div className={style.dashboard__content}>
          <MediaLibrary />
          <aside>
            <Header />

            {children}
          </aside>
          <InfoBar />
        </div>
        <NavigationBar />
        <section className={style.backgroundMarq}>
          <MarqueeContainer />
        </section>
      </Context>
    </main>
  );
};

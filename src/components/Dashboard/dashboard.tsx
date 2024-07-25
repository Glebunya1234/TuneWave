import style from "./dashboard.module.scss";

// import {MediaLibraryBar} from "@components/Side-Bars/MediaLibrary-side-bar/Left-side-bar";

import { MediaLibraryBar } from "@components/Side-Bars/MediaLibrary-side-bar/Left-side-bar";
import { InfoBar } from "@components/Side-Bars/Info-side-bar/Right-side-bar";
import { NavigationBar } from "@components/Side-Bars/NavigationTrack-side-bar/Bottom-side-bar";
import { Context } from "@components/Context-component/Context";
import { MarqueeContainer } from "@UI/Marquee/Marquee-Conteiner/MarqueeConteiner";
import { MarqueeUpdater } from "@UI/Marquee/Marquee-Updater/MarqueeUpdater";
import { Header } from "@UI/Header/header";
export const Dashboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className={`${style.dashboard}`}>
      <Context>
        <MarqueeUpdater />
        <section className={style.backgroundMarq}>
          <MarqueeContainer />
        </section>
        <div className={style.dashboard__content}>
          <MediaLibraryBar />
          <aside>
            <Header />

            {children}
          </aside>
          <InfoBar />
        </div>
        <NavigationBar />
      </Context>
    </main>
  );
};

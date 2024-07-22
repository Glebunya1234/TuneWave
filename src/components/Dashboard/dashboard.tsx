import style from "./dashboard.module.scss";

// import {MediaLibraryBar} from "@components/Side-Bars/MediaLibrary-side-bar/Left-side-bar";

import { MediaLibraryBar } from "@components/Side-Bars/MediaLibrary-side-bar/Left-side-bar";
import { InfoBar } from "@components/Side-Bars/Info-side-bar/Right-side-bar";
import { NavigationBar } from "../Side-Bars/NavigationTrack-side-bar/Bottom-side-bar";
import { Header } from "../UI/Header/header";
import {MarqueeContainer} from "../UI/Marquee/Background-Marquee/BGmarquee";
export const Dashboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className={`${style.dashboard}`}>
      <section className= {style.backgroundMarq}>
       <MarqueeContainer/>
      </section>
      <div>
        <MediaLibraryBar />
        <aside>
          <Header />
          {children}
        </aside>
        <InfoBar />
      </div>
      <NavigationBar />
    </main>
  );
};

"use server"
import style from "./dashboard.module.scss";
import { NavigationBar } from "@components/Side-Bars/NavigationTrack-side-bar/Bottom-side-bar";
import { Context } from "@components/Context-component/Context";
import { MarqueeContainer } from "@UI/Marquee/Marquee-Conteiner/MarqueeConteiner";
import { MarqueeUpdater } from "@UI/Marquee/Marquee-Updater/MarqueeUpdater";
import { Header } from "@/components/UI/Header/header-main/header";
import { MediaLibrary } from "@sidebars/MediaLibrary-side-bar/MediaLibrary";
import { InfoBar } from "@sidebars/Info-side-bar/InfoBar";
import { IsAuthorized } from "@/providers/SupaBase-methods/user-action";
import { redirect } from "next/navigation";
export const Dashboard = async ({ children }: { children: React.ReactNode }) => {
  await IsAuthorized()
  // redirect("/?messange=You must log in")
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

import style from "./page.module.scss";
import { PanelTarget } from "@/components/UI/Target/PanelTarget";
import { MarqueeContainer } from "@/components/UI/Marquee/Marquee-Conteiner/MarqueeConteiner";
import { WeclomeBanner } from "@/components/Banner/WelcomeBanner/welcomeBanner";
import Image from "next/image";
import src1 from "../../public/pngegg2.png";
import src2 from "../../public/arrow2.png";
import src3 from "../../public/pngegg3.png";
import { SignInBanner } from "@/components/Banner/SignInBanner/SignIn-Banner";
import { Context } from "@/components/Context-component/Context";

export default function Home() {
  return (
    <main className={style.Home}>
      <Context>
        <section className={style.Home__Dashboard}>
          <PanelTarget side="Top" />
          <aside className={style.Home__Content}>
            <div className={style.dash}></div>
            <div className={style.squarDash}></div>
            <WeclomeBanner />
            <div className={style.Content__ImageConteiner}>
              <Image
                src={src1}
                width={200}
                height={200}
                className={style.Arrow1}
                alt="Arrow"
              />
              <Image
                src={src2}
                width={200}
                height={200}
                className={style.Arrow2}
                alt="Arrow2"
              />
              <Image
                src={src3}
                width={200}
                height={200}
                className={style.Arrow3}
                alt="Arrow3"
              />
            </div>
            <nav className={style.Home__Nav}>
              <SignInBanner />
            </nav>
          </aside>
          <PanelTarget side="Bottom" />
        </section>
        <section className={style.backgroundMarq}>
          <MarqueeContainer />
        </section>
      </Context>
    </main>
  );
}

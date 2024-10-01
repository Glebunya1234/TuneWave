
import style from "./BGmarquee.module.scss";
import { Marquee } from "@devnomic/marquee";
import { BorderText } from "../../Fonts/Border-svg-versus";
import { FillText } from "../../Fonts/Fill-svg-versus";
import type { MarqueeProps } from "@/types/TypeSetSstateForUseState/type";
import "@devnomic/marquee/dist/index.css";



export const BackgroundMarquee: React.FC<MarqueeProps> = ({
  text,
  className,
  isReverse,
}) => {
  return (
    <Marquee
      className={`${style.marqueeContainer} ${className}`}
      fade={true}
      reverse={isReverse}
    >
      {Array(2)
        .fill(null)
        .map((_, index) => (
          <aside
            className={style.marqueeContainer__textConteiner}
            style={
              {
                "--lengthText": `${
                  text.length <= 3 ? text.length + text.length : text.length
                }`,
              } as React.CSSProperties
            }
            key={index}
          >
            <BorderText text={text} />
            <FillText text={text} />
          </aside>
        ))}

    </Marquee>
  );
};
 
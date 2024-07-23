"use client";
import { Marquee } from "@devnomic/marquee";
import "@devnomic/marquee/dist/index.css";
import style from "./BGmarquee.module.scss";
import { useState, useEffect, useContext } from "react";
import { usePathname } from "next/navigation";
import { HoverTextContext } from "@/Context";
interface MarqueeProps {
  text: string;
  className?: string;
  isReverse?: boolean;
}

export const MarqueeContainer = () => {
  const dataContext = useContext(HoverTextContext);
  const [duration, setDuration] = useState(style.duration1s);
  const pathname = usePathname();

  dataContext?.setDefaultText(pathname?.split("/").pop() || "");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDuration("duration40s");
    }, 1450);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer2 = setTimeout(() => {
      setDuration("filter: invert(100%);");
    }, 100);

    return () => clearTimeout(timer2);
  }, []);
  useEffect(() => {}, [dataContext.getTemporaryText]);
  return (
    <>
      <BackgroundMarquee
        text={dataContext?.getTemporaryText + " "}
        className={duration}
      />
      <BackgroundMarquee
        text={dataContext?.getTemporaryText + " "}
        isReverse={true}
        className={`${duration}`}
      />
      <BackgroundMarquee
        text={dataContext?.getTemporaryText + " "}
        className={duration}
      />
      <BackgroundMarquee
        text={dataContext?.getTemporaryText + " "}
        isReverse={true}
        className={duration}
      />
      <BackgroundMarquee
        text={dataContext?.getTemporaryText + " "}
        className={duration}
      />
      <BackgroundMarquee
        text={dataContext?.getTemporaryText + " "}
        isReverse={true}
        className={duration}
      />
      <BackgroundMarquee
        text={dataContext?.getTemporaryText + " "}
        className={duration}
      />
    </>
  );
};

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

      {/* {text.length < 6 ? (
        Array(2)
          .fill(null)
          .map((index) => (
            <aside
              className={style.marqueeContainer__textConteiner}
              style={{ "--lengthText": `${text.length}` } as React.CSSProperties}
              key={index}
            >
              <BorderText text={text} />
              <FillText text={text} />
            </aside>
          ))
      ) : (
        <aside
          className={style.marqueeContainer__textBigContainer}
          style={{ "--lengthText": `${text.length}` } as React.CSSProperties}
        >
          <BorderText text={text} />
          <FillText text={text} />
        </aside>
      )} */}
    </Marquee>
  );
};
export const FillText: React.FC<MarqueeProps> = ({ text }) => {
  return (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <text
        x="50%"
        y="63.5%"
        // fill="#b8c9e1"
        // stroke="#b8c9e1"
        fill="white"
        stroke="white"
        strokeWidth="1"
        dominant-baseline="middle"
        textAnchor="middle"
      >
        {text}
      </text>
    </svg>
  );
};
export const BorderText: React.FC<MarqueeProps> = ({ text }) => {
  return (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <text
        x="50%"
        y="63.5%"
        // fill="none"
        // stroke="#b8c9e1"
        fill="none"
        stroke="white"
        strokeWidth="1"
        textAnchor="middle"
        dominant-baseline="middle"
      >
        {text}
      </text>
    </svg>
  );
};

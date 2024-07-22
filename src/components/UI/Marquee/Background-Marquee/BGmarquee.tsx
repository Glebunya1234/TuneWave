"use client";
import { Marquee } from "@devnomic/marquee";
import "@devnomic/marquee/dist/index.css";
import style from "./BGmarquee.module.scss";
import { useState, useEffect } from "react";
import { usePathname } from 'next/navigation';
interface MarqueeProps {
  text: string;
  className?: string;
  isReverse?: boolean;
}

export const MarqueeContainer = () => {
  const [duration, setDuration] = useState(style.duration1s);
  const pathname = usePathname();
   // Получаем текущий путь, например '/профиль'
  
  // Извлекаем часть пути после '/'
  const text = pathname?.split('/').pop() || '';// 'default' если нет пути
  useEffect(() => {
    const timer = setTimeout(() => {
      setDuration("duration40s");
    }, 1450); // Измените на нужное время

    return () => clearTimeout(timer); // Очистите таймер при размонтировании
  }, []);
  return (
    <>
      <BackgroundMarquee text={text} className={duration} />
      <BackgroundMarquee
        text={text}
        isReverse={true}
        className={`${duration}`}
      />
      <BackgroundMarquee text={text} className={duration} />
      <BackgroundMarquee text={text} isReverse={true} className={duration} />
      <BackgroundMarquee text={text} className={duration} />
      <BackgroundMarquee text={text} isReverse={true} className={duration} />
      <BackgroundMarquee text={text} className={duration} />
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
      <BorderText text={text} />
      <FillText text={text} />
    </Marquee>
  );
};
export const FillText: React.FC<MarqueeProps> = ({ text }) => {
  return (
    <svg>
      <text
        x="10"
        y="80"
        className="custom-font"
        fontSize="100"
        fill="#b8c9e1"
        stroke="#b8c9e1"
        strokeWidth="1"
      >
        {text}
      </text>
    </svg>
  );
};
export const BorderText: React.FC<MarqueeProps> = ({ text }) => {
  return (
    <svg>
      <text
        x="10"
        y="80"
        className="custom-font"
        fontSize="100"
        fill="none"
        stroke="#b8c9e1"
        strokeWidth="1"
      >
        {text}
      </text>
    </svg>
  );
};

import style from "./marquee.module.scss";
import React, { useRef, useEffect, useState } from "react";

interface MarqueeProps {
  text: string;
  PGAT?: boolean;
  move?: boolean;
}

const Marquee: React.FC<MarqueeProps> = ({ text, PGAT, move }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [Move, setMove] = useState<boolean | undefined>(false);

  useEffect(() => {
    setMove(move);
  }, [move]);

  useEffect(() => {
    const updateContainerWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };

    updateContainerWidth();
    window.addEventListener("resize", updateContainerWidth);
    return () => window.removeEventListener("resize", updateContainerWidth);
  }, [text]);

  const createTextArray = () => {
    const textWithSeparator = `${text} / `;
    const numDuplicates = Math.ceil(containerWidth / text.length);
    return Array(numDuplicates).fill(textWithSeparator).join("");
  };

  return (
    <>
      {!PGAT ? (
        <div className={style.marqueeContainer} ref={containerRef}>
          <div>
            <p>{createTextArray()}</p>
          </div>
          <div>
            <p>{createTextArray()}</p>
          </div>
        </div>
      ) : (
        <div
          className={`${style.MovePGAT} ${Move ? style.MovePGAT__Move : ""}`}
          ref={containerRef}
        >
          <div>
            <p>{createTextArray()}</p>
          </div>
          <div>
            <p>{createTextArray()}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Marquee;

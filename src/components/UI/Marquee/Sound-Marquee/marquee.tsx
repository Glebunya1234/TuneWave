import style from "./marquee.module.scss";
import React, { useRef, useEffect, useState } from "react";

interface MarqueeProps {
  text: string;
}

const Marquee: React.FC<MarqueeProps> = ({ text }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);

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
    <div className={style.marqueeContainer} ref={containerRef}>
      <div>
        <p>{createTextArray()}</p>
      </div>
      <div>
        <p>{createTextArray()}</p>
      </div>
    </div>
  );
};

export default Marquee;

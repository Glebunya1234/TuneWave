"use client"
import React, { useEffect, useState, useRef } from 'react';
import style from "./Bottom-side-bar.tsx.module.scss";
import { Marquee } from "@devnomic/marquee";
import "@devnomic/marquee/dist/index.css";

export const NavigationBar2 = () => {
  const [textToShow, setTextToShow] = useState('');
  const textRef = useRef<HTMLParagraphElement>(null);
  
  const baseText = "Snakes (from the series Arcane League of Legends) - MIYAVI, PVRIS, Arcane, League of Legends";
  const separator = "  /  ";
  useEffect(() => {
    const updateText = () => {
      if (textRef.current) {
        const textWidth = textRef.current.scrollWidth;
        const containerWidth = window.innerWidth;

        const maxRepeatCount = 60; // Ограничение повторений
        const repeatCount = Math.min(Math.ceil(containerWidth / textWidth), maxRepeatCount);

        const repeatedText = Array(repeatCount).fill(baseText).join(separator);
        setTextToShow(repeatedText);
      }
    };

    updateText(); // Initial calculation
    window.addEventListener('resize', updateText);

    return () => window.removeEventListener('resize', updateText);
  }, []);

  return (
    // <section className={style.NavigationBar}>
    //   <div className={style.container}>
    //     <Marquee direction="left" fade={true}>
    //       <p ref={textRef}>{textToShow}</p>
    //     </Marquee>
    //   </div>
    //   <nav>nav</nav>
    // </section>
    <section className={style.NavigationBar}>
      <div className={style.container}>
        <Marquee direction="left" fade={true}>
          <p ref={textRef}>{textToShow}</p>
        </Marquee>
      </div>
      <nav>nav</nav>
    </section>
  );
};
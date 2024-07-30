"use client";
import React, { useEffect, useState, useRef } from "react";
import style from "./Bottom-side-bar.module.scss";
import Marquee from "@/components/UI/Marquee/Sound-Marquee/marquee";

export const NavigationBar = () => {
  return (
    <section className={style.NavigationBar}>
      <div className={style.bbb}>
        <Marquee text="tunewave" />
      </div>
      <nav>nav</nav>
    </section>
  );
};

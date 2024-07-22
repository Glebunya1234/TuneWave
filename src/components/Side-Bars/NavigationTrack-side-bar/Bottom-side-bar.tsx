"use client"
import React, { useEffect, useState, useRef } from 'react';
import style from "./Bottom-side-bar.module.scss";
import Marquee  from '@/components/UI/Marquee/Sound-Marquee/marquee';


export const NavigationBar = () => {


  return (
    <section className={style.NavigationBar}>
      <div>      
        <Marquee text="tunewave" />
        {/* <Marquee text="BROKENUSYOU - ROMES" /> */}
      </div>
      <nav>nav</nav>
    </section>
    
  );
};
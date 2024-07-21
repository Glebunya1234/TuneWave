"use client"
import React, { useEffect, useState, useRef } from 'react';
import style from "./Bottom-side-bar.tsx.module.scss";
import Marquee  from '@/components/UI/Marquee/marquee';


export const NavigationBar = () => {


  return (
    <section className={style.NavigationBar}>
      <div>      
        <Marquee text="Zero - Anna tsuchiya" />
        {/* <Marquee text="BROKENUSYOU - ROMES" /> */}
      </div>
      <nav>nav</nav>
    </section>
    
  );
};
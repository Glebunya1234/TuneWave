"use client"
import SpotifyAuthButton from "@/components/UI/Buttons/SpotAuthButton/SpotifyAuthButton";
import { BorderMarquee } from "@/components/UI/Marquee/Border-Marquee/BorderMarquee";
import style from "./SignInBanner.module.scss";
import { useState, useEffect } from "react";
export const SignInBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  return (
    isVisible && (
      <nav className={style.SignInBanner}>
        <BorderMarquee text="SingIn">
          <SpotifyAuthButton />
        </BorderMarquee>
      </nav>
    )
  );
};

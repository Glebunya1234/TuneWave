"use client";
import style from "./SignInBanner.module.scss";
import { useState, useEffect } from "react";
import SpotifyAuthButton from "@/components/UI/Buttons/AuthBtn/SignIn-button/SignInBtn";
import { BorderMarquee } from "@/components/UI/Marquee/Border-Marquee/BorderMarquee";

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
        <BorderMarquee shape="rectangle" text="SingIn">
          <SpotifyAuthButton />
        </BorderMarquee>
      </nav>
    )
  );
};

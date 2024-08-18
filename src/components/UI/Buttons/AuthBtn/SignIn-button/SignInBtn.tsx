"use client";

import style from "./SignInBtn.module.scss";
import { GlobalContext } from "@/Context";
import { useContext } from "react";
import { oAuthSignIn } from "@/providers/SupaBase-methods/user-action";

const SpotifyAuthButton: React.FC = () => {
  const dataContext = useContext(GlobalContext);

  const handleMouseEnter = () => {
    dataContext?.setTemporaryText("Sign In");
    dataContext?.setDefaultText("tunewave");

    document.documentElement.style.setProperty("--invertFilter", "1");

    const timer = setTimeout(() => {
      document.documentElement.style.setProperty("--invertFilter", "0");
    }, 250);

    return () => clearTimeout(timer);
  };

  const handleMouseLeave = () => {
    dataContext?.setTemporaryText(dataContext.getDefaultText);
    document.documentElement.style.setProperty("--invertFilter", "1");
    const timer = setTimeout(() => {
      document.documentElement.style.setProperty("--invertFilter", "0");
    }, 250);

    return () => clearTimeout(timer);
  };

  return (
    <button
      onClick={async () => {
        await oAuthSignIn("spotify");
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={style.SpotifyAuthButton__Button}
    >
      Sign in with Spotify
    </button>
  );
};

export default SpotifyAuthButton;

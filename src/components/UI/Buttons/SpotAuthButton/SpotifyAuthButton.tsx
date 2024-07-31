"use client";

import { GlobalContext } from "@/Context";
import style from "./SpotifyAuthButton.module.scss";
import { oAuthSignIn } from "@/app/login/action";
import { useContext, useEffect } from "react";

const SpotifyAuthButton: React.FC = () => {
  // const router = useRouter();
  // useEffect(() => {
  //   const Fetxg = async () => {
  //     // const {
  //     //   data: { session },
  //     // } = await supabase.auth.getSession();
  //     // console.log(session);

  //     supabase.auth.onAuthStateChange(async (event) => {
  //       console.log(event);
  //       // await supabase.auth.signOut().then(() => {
  //       //   console.log(event);
  //       // });
  //       if (event === "INITIAL_SESSION") {
  //         router.push("/profile");
  //       } else if (event === "SIGNED_OUT") {
  //         router.push("/");
  //       }
  //     });
  //   };
  //   Fetxg();
  //   // supabase.auth.onAuthStateChange(async (event) => {
  //   //   // if (event === "SIGNED_IN") {
  //   //   //   router.push("/profile");
  //   //   // } else if (event === "SIGNED_OUT") {
  //   //   //   router.push("/");
  //   //   // }
  //   // });
  // }, []);
  // const handleClick = async () => {
  //   try {
  //     await supabase.auth.signInWithOAuth({
  //       provider: "spotify",
  //     });
  //     router.push("/profile");
  //   } catch (error) {
  //     console.error("Error during sign in:", error);
  //   }
  //   router.push("/profile");
  // };

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

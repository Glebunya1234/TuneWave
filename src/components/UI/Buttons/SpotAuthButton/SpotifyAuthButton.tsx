"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import style from "./SpotifyAuthButton.module.scss";
import { oAuthSignIn } from "@/app/login/action";

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

  return (
    // <button onClick={handleClick} className={style.SpotifyAuthButton__Button}>
    <button
      onClick={async () => {
        await oAuthSignIn("spotify");
      }}
      className={style.SpotifyAuthButton__Button}
    >
      Sign in with Spotify
    </button>
  );
};

export default SpotifyAuthButton;

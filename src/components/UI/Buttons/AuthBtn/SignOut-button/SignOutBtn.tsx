"use client";

import React from "react";
import { SignOut } from "@/providers/SupaBase-methods/user-action";
import style from "./SignOutBtn.module.scss"
export const SignOutBTN = () => {
  return (
    <button
      className={style.SignOutBTN}
      onClick={async () => {
        await SignOut();
      }}
    >
      Quit
    </button>
  );
};

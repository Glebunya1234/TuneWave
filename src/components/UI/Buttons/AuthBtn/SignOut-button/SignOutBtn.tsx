"use client";

import React from "react";

import { SignOut } from "@/providers/SupaBase-methods/user-action";

export const SingOutBTN = () => {
  return (
    <button
      onClick={async () => {
        await SignOut();
      }}
    >
      Quit
    </button>
  );
};

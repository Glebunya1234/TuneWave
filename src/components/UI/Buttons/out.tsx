"use client";
import { supabase } from "@/providers/supabaseClient";
import React from "react";
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";

const SingOut: React.FC = () => {
  const router = useRouter();
  const singout = async () => {
    await supabase.auth.signOut().then(() => {
      router.push("../");
    });
    
  };

  return (
    <button
      onClick={() => {
        singout();
      }}
    >
      Exit
    </button>
  );
};

export default SingOut;

"use client";
import { GlobalContext} from "@/Context";
import { usePathname } from "next/navigation";
import { useContext, useEffect } from "react";

export const MarqueeUpdater = () => {
  const dataContext = useContext(GlobalContext);
  const pathname = usePathname();

  useEffect(() => {
    const UF = () => {
      dataContext?.setTemporaryText(pathname?.split("/").pop() || "");
      dataContext?.setDefaultText(pathname?.split("/").pop() || "");
    };
    UF();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
  // useEffect(() => {}, [dataContext?.getDefaultText]);
  return <></>;
};

"use server";

import { DiscographyListSingle } from "@/components/DataLists/DiscographyList-Component/DiscographyListSingle";
import style from "./single.module.scss";
import { PanelTarget } from "@/components/UI/Target/PanelTarget";

const DiscographySingle = async ({ params }: { params: { id: string } }) => {
  console.log("params", params);
  return (
    <div className={style.Single}>
      <PanelTarget side="Top" />
      <DiscographyListSingle id={params.id} />
      <div className={style.dash}></div>
      <div className={style.squarDash}></div>
      <PanelTarget side="Bottom" />
    </div>
  );
};

export default DiscographySingle;

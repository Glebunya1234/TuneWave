"use client";
import style from "./spinner.module.scss";
export const Spinner = () => {
  return (
    <aside className="w-full h-full flex justify-center items-center relative">
      {/* <div className={style.spinner}>
        <p className={style.Section1}>
          <p className={style.Text}>T</p>
        </p>
        <p className={style.Section2}>
          <p className={style.Text}>W</p>
        </p>
      </div> */}
      <div className={style.spinner}>
        <p className="relative mr-[17px]">
          <p className={style.Text}>T</p>
        </p>
        <p className="relative mr-[17px]">
          <p className={style.Text2}>W</p>
        </p>
      </div>
    </aside>
  );
};

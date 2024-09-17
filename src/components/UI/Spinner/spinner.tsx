"use client";
import style from "./spinner.module.scss";
export const Spinner = () => {
  return (
    <aside className="w-full h-full flex justify-center items-center">
      <div className={style.spinner}>
        <p className={style.Section1}>
          <p>T</p>
        </p>
        <p className={style.Section2}>
          <p>W</p>
        </p>
      </div>
    </aside>
  );
};

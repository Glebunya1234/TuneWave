"use client"
import style from "./spinner.module.scss";
export const Spinner = () => {
  return (
    <div className={style.spinner}>
      <p className={style.Section1}>
        <p>T</p>
      </p>
      <p className={style.Section2}>
        <p>W</p>
      </p>
    </div>
  );
};

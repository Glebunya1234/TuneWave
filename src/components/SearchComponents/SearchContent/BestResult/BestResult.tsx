import Link from "next/link";
import style from "./BestResult.module.scss";
import Image from "next/image";
type BestResultType = {
  ImageSrc?: string;
  Name?: string;
  Artist?: string;
  Album?: string;
  Url?: string;
  Type?: string;
};
export const BestResult = ({
  ImageSrc,
  Name,
  Artist,
  Album,
  Url,
  Type,
}: BestResultType) => {
  return (
    <Link href={`/track/${Url}` || ""} className={style.BestResult}>
      <section className={style.BestResult__BasicInfo}>
        <aside className={style.TrackImage}>
          <Image
            src={ImageSrc || "/FavoriteTrack.png"}
            alt={Name || "Name"}
            layout="fill"
            className={style.AlbumImage}
          />
        </aside>

        <aside className={style.BasicInfo__NamesSpan}>
          <h1>{Name}</h1>
          <p>{Artist}</p>
        </aside>
      </section>
      <section className={style.BestResult__SecondInfo}>
        <p>Albym</p>
        <p>•</p>
        <p>{Album}</p>
      </section>
    </Link>
  );
};

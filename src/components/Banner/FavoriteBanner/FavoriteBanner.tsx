import Image from "next/image";
import style from "./FavoriteBanner.module.scss";
export const FavoriteBanner = () => {
  return (
    <aside className={style.FavoriteBanner}>
      <nav className={style.FavoriteBanner__Nav}>
        <button className={style.Btn__Left}>
          <Image
            src="https://i.scdn.co/image/ab6761610000e5eb7ff08b2df89c415997a91aff"
            width={40}
            height={40}
            alt="alt"
          />
          <h1>Favorite tracks</h1>
        </button>
        <button className={style.Btn__Center}>
          <Image
            src="https://i.scdn.co/image/ab6761610000e5eb7ff08b2df89c415997a91aff"
            width={40}
            height={40}
            alt="alt"
            className={`${style.mask} ${style["mask-parallelogram"]}`}
          />
          <h1>ROMES</h1>
        </button>

        <button className={style.Btn__Right}>
          <Image
            src="https://i.scdn.co/image/ab6761610000e5eb7ff08b2df89c415997a91aff"
            width={40}
            height={40}
            alt="alt"
            className={`${style.mask} ${style["mask-parallelogram"]}`}
          />
          <h1> Snakes (from the series Arcane League of Legends)</h1>
        </button>
        <button className={style.Btn__Left}>
          <Image
            src="https://i.scdn.co/image/ab6761610000e5eb7ff08b2df89c415997a91aff"
            width={40}
            height={40}
            alt="alt"
          />
          <h1>The Days Grace - Pain</h1>
        </button>
        <button className={style.Btn__Center}>
          <Image
            src="https://i.scdn.co/image/ab6761610000e5eb7ff08b2df89c415997a91aff"
            width={40}
            height={40}
            alt="alt"
            className={`${style.mask} ${style["mask-parallelogram"]}`}
          />
          <h1>Need for Speed Unbound</h1>
        </button>

        <button className={style.Btn__Right}>
          <Image
            src="https://i.scdn.co/image/ab6761610000e5eb7ff08b2df89c415997a91aff"
            width={40}
            height={40}
            alt="alt"
            className={`${style.mask} ${style["mask-parallelogram"]}`}
          />
          <h1>Need for Speed Unbound</h1>
        </button>
      </nav>
    </aside>
  );
};

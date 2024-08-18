"use server";
import style from "./album.module.scss";
import Image from "next/image";
import { PanelTarget } from "@/components/UI/Target/PanelTarget";
import { AlbumInformation } from "@/components/Content/AlbumInformation-Component/AlbumInformation";
import Link from "next/link";
import { _getAlbum } from "@/api/SP-Albums/API-SP-Albums";

const albumPage = async ({ params }: { params: { id: string } }) => {
  const data = await _getAlbum(params.id);
  console.log(data);
  return (
    <div className={style.Album}>
      <PanelTarget side="Top" />
      <aside className={style.Album__Content} id="AlbumPage">
        <section className={style.Content__Preview}>
          <div className={style.Preview__image}>
            <div className={style.Images}>
              <Image
                src={data.images[0].url || "/FavoriteTrack.png"}
                layout="fill"
                objectFit="cover"
                className={style.mark}
                alt="AlbumImage"
              />
            </div>
          </div>
          <div className={style.Preview__Info}>
            <h3 className={style.Info__AlbumType}>{data.album_type}</h3>
            <h1 className={style.Info__AlbumName}>{data.name}</h1>
            <span className={style.Info__Artist}>
              {data.artists !== undefined ? (
                data.artists.map((item, index) => {
                  return (
                    <>
                      <Link href={`/artist/${item.id}`} key={index}>
                        <p> {item.name}</p>
                      </Link>
                      <span className="mr-[5px]">•</span>
                    </>
                  );
                })
              ) : (
                <></>
              )}
              <span>{data.release_date}</span>
            </span>
          </div>
        </section>
        <AlbumInformation data={data} />
      </aside>
      <div className={style.dash}></div>
      <div className={style.squarDash}></div>
      <PanelTarget side="Bottom" />
    </div>
  );
};

export default albumPage;

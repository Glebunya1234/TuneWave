import Image from "next/image";
import style from "./Tracknfo.module.scss";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SaveTrackBtn } from "../../Buttons/SaveTrackToLibBtn/SaveTrack";
import { getArtistId } from "@/utils/CutedIdArtist";
import { _checkIsAlbumAreSaved } from "@/api/SP-Albums/API-SP-Albums";
import { _checkIfTracksAreSaved } from "@/api/SP-Tracks/API-SP-Tracks";
import { GlobalContext } from "@/Context";
export const CurrentTrackSideInfo = ({
  is_successTranfser,
  isOpenSound,
}: {
  is_successTranfser: boolean;
  isOpenSound: boolean;
}) => {
  const dataContext = useContext(GlobalContext);
  const [getCurrentTrack, setCurrentTrack] = useState<Spotify.Track>();
  const [IsPause, setIsPause] = useState<Spotify.Track>();
  const [IsSave, setIsSave] = useState<boolean>(false);
  const [OpenSound, setIsOpenSound] = useState<boolean>(true);
  const router = useRouter();
  useEffect(() => {
    setIsPause(dataContext.getCurrentPlaying?.isPlay);
  }, [dataContext.getCurrentPlaying?.isPlay]);
  useEffect(() => {
    setCurrentTrack(dataContext.getCurrentPlaying?.current_track);
  }, [dataContext.getCurrentPlaying?.current_track]);
  useEffect(() => {
    setIsOpenSound(isOpenSound);
  }, [isOpenSound]);
  useEffect(() => {
    if (!is_successTranfser) return;
    const fetch = async () => {
      const result = await _checkIfTracksAreSaved(
        dataContext.getCurrentPlaying?.current_track?.id
      );
      setIsSave(result[0]);
    };

    fetch();
  }, [dataContext.getCurrentPlaying?.current_track?.name]);

  return (
    <aside
      className={`${style.CurrentTrackSideInfo} ${
        OpenSound ? style.CurrentTrackSideInfo__Single : ""
      }`}
    >
      <section className={style.CurrentTrackSideInfo__ImageConteiner}>
        <div
          className={style.Images}
          style={{ animationPlayState: !IsPause ? "paused" : "running" }}
        >
          <Image
            src={getCurrentTrack?.album?.images[0]?.url || "/FavoriteTrack.png"}
            layout="fill"
            objectFit="cover"
            className={style.mark}
            alt="alt"
          />
        </div>
      </section>
      <section
        className={`${style.CurrentTrackSideInfo__Info} ${
          !is_successTranfser ? "max-750:mr-[10px]" : ""
        }`}
      >
        <h1
          onClick={() => {
            is_successTranfser
              ? router.push(`/track/${getCurrentTrack?.id}
                `)
              : "";
          }}
        >
          {getCurrentTrack?.name || "TuneWave"}
        </h1>
        <div>
          {getCurrentTrack?.artists.map((it, inx) => (
            <p
              key={inx}
              onClick={() => {
                is_successTranfser
                  ? router.push(`/artist/${getArtistId(it.url)}`)
                  : "";
              }}
            >
              {it.name}
              {getCurrentTrack?.artists.length === inx + 1 ? (
                <></>
              ) : (
                <p className="pr-[5px]">,</p>
              )}
            </p>
          )) || <p>By Glebunya</p>}
        </div>
      </section>
      {is_successTranfser && (
        <section className={style.CurrentTrackSideInfo__FollowBtn}>
          <SaveTrackBtn
            id={getCurrentTrack?.id!}
            isPage={true}
            isSave={IsSave}
          />
        </section>
      )}
    </aside>
  );
};

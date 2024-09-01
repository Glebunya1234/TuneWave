import style from "../ArtistData.module.scss";
import useSWR from "swr";
import { FollowBtn } from "@/components/UI/Buttons/SaveArtistToLibBtn/FollowOrUnArtist";
import { _CheckIsFollowArtist } from "@/api/SP-Users/API-SP-Users";
import { OpenInSpotify } from "@/components/UI/Buttons/OpenInSpotifyBtn/OpenInSpotify";

export const FollowUnFollow = ({ id }: { id: string }) => {
  const { data, isLoading } = useSWR(
    `https://api.spotify.com/v1/me/following/contains?type=artist&ids=${id}`,
    async () => await _CheckIsFollowArtist(id),
    {
      revalidateOnFocus: false,
    }
  );

  return (
    <nav className={style.FollowUnFollow}>
      {isLoading ? (
        <p></p>
      ) : (
        <nav className="flex flex-row items-center">
          <FollowBtn
            id={id}
            className={style.NavPanel__PlayTrackBtn}
            isSave={data !== undefined ? data[0] : false}
          />
          <OpenInSpotify
            href={`https://open.spotify.com/artist/${id}`}
            className={style.OpenSpotifyBtn}
          />
        </nav>
      )}
    </nav>
  );
};

import style from "../ArtistData.module.scss";
import useSWR from "swr";
import { useState } from "react";
import { Spinner } from "@/components/UI/Spinner/spinner";
import { PlaylistComponent } from "../../PlayLists-Component/PlayListComponent";
import { _getArtistsTopTracks } from "@/api/SP-Artists/API-SP-Artists";
import { TrackItem } from "@/types/SpotifyTypes/CurrentlyPlayingTrack/type";
import { ButtonSkeleton } from "@/components/UI/Skeleton/Button-Skeleton/ButtonSkeleton";
import { TrackListSkeleton } from "@/components/UI/Skeleton/TrackList-Skeleton/TrackListSkeleton";

export const ArtistTopTrack = ({ id }: { id: string }) => {
  const [state, setState] = useState(false);

  const { data: TopTracks, isLoading: LoadingTopTracks } = useSWR<
    TrackItem[] | string
  >(`artistTopTracks/${id}`, async () => await _getArtistsTopTracks(id), {
    keepPreviousData: true,
    revalidateOnFocus: false,
    dedupingInterval: 60000,
  });

  const handleClick = () => {
    if (state) {
      document.documentElement.style.setProperty("--HiddenList", "250px");
    } else document.documentElement.style.setProperty("--HiddenList", "500px");
    setState((prevState) => !prevState);
  };
  return LoadingTopTracks ? (
    <>
      <span className={`${style.ArtistData__Span}`}>Popular tracks</span>
      <div className={style.ArtistTopTrack}>
        <TrackListSkeleton />
      </div>
    </>
  ) : (
    TopTracks && typeof TopTracks !== "string" && TopTracks.length !== 0 && (
      <>
        <span className={`${style.ArtistData__Span}`}>Popular tracks</span>

        <div className={style.ArtistTopTrack}>
          <PlaylistComponent
            HiddenHeader={true}
            Offset={0}
            SWRKey={`artistTopTracks/${id}`}
            Params={{ id: id, list: "", genre: "" }}
            data={TopTracks}
          />
        </div>
        <button
          className="hover:bg-[#a0a0a025] w-full text-center"
          onClick={() => {
            handleClick();
          }}
        >
          More...
        </button>
      </>
    )
  );
};

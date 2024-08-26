import style from "../ArtistData.module.scss";
import useSWR from "swr";
import { useState } from "react";
import { Spinner } from "@/components/UI/Spinner/spinner";
import { PlaylistComponent } from "../../PlayLists-Component/PlayListComponent";
import { _getArtistsTopTracks } from "@/api/SP-Artists/API-SP-Artists";
import { TrackItem } from "@/types/SpotifyTypes/CurrentlyPlayingTrack/type";

export const ArtistTopTrack = ({ id }: { id: string }) => {
  const [state, setState] = useState(false);

  const { data: TopTracks, isLoading: LoadingTopTracks } = useSWR<TrackItem[]>(
    `artistTopTracks/${id}`,
    async () => await _getArtistsTopTracks(id),
    {
      keepPreviousData: true,
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );
  const handleClick = () => {
    if (state) {
      document.documentElement.style.setProperty("--HiddenList", "250px");
    } else document.documentElement.style.setProperty("--HiddenList", "500px");
    setState((prevState) => !prevState);
  };
  return LoadingTopTracks ? (
    <div className="w-full h-full flex justify-center items-center">
      <Spinner />
    </div>
  ) : (
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
        onClick={() => {
          handleClick();
        }}
      >
        Еще...
      </button>
    </>
  );
};

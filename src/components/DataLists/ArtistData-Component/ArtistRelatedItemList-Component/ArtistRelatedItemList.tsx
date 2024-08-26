import style from "../ArtistData.module.scss";
import useSWR from "swr";
import Link from "next/link";
import { PanelPGAT } from "@/components/UI/Buttons/Panel-PlayList-Genre-Artist-Track/PanelPGAT";
import { PanelSkeleton } from "@/components/UI/Skeleton/Panel-Skeleton/PanelSkeleton";
import { _getRelatedArtists } from "@/api/SP-Artists/API-SP-Artists";
import { TrackArtist } from "@/types/SpotifyTypes/TrackArtist/type";

export const ArtistRelatedItemList = ({ id }: { id: string }) => {
  const { data: RelatedArtists, isLoading: LoadingRelatedArtists } = useSWR<
    TrackArtist[]
  >(`artistRelatedArtists/${id}`, async () => await _getRelatedArtists(id), {
    keepPreviousData: true,
    revalidateOnFocus: false,
    dedupingInterval: 60000,
  });
  const Relateditems = RelatedArtists?.slice(0, 6).map((data, index) => (
    <PanelPGAT
      key={index}
      Href={`/artist/${data.id}`}
      FirstText={data.name}
      SecondText={data.name}
      ImageSRC={data.images[0]?.url || "/FavoriteTrack.png"}
    />
  ));
  return (
    <>
      <span className={`${style.ArtistData__Span} `}>
        <h1>Related Artists</h1>
        <Link href={`/section/related`} className={style.Div__link}>
          Show all
        </Link>
      </span>
      <nav className={style.ArtistData__Discography}>
        {LoadingRelatedArtists ? (
          <PanelSkeleton className={style.Discography__Item} />
        ) : (
          Relateditems
        )}
      </nav>
    </>
  );
};

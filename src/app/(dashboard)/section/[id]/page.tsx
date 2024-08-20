"use client";
import style from "./section.module.scss";
import React from "react";
import useSWR from "swr";
import { PanelTarget } from "@/components/UI/Target/PanelTarget";
import { PanelPGAT } from "@/components/UI/Buttons/Panel-PlayList-Genre-Artist-Track/PanelPGAT";
import { _getRecommendations } from "@/api/SP-Playlists/API-SP-MixPlaylist";
import { SectionFetcher } from "@/utils/helper/Fetchers/Sections-Fetcher";
import { RecommendationsType } from "@/types/SpotifyTypes/RecommendationsType/type";
import { FollowedArtistType } from "@/types/SpotifyTypes/TrackArtist/type";
import {
  _isFollowedArtist,
  _isTrackArtist,
  _isTypeRecommendation,
} from "@/utils/TypeOfCustom/TypeOfCustom";
import { Spinner } from "@/components/UI/Spinner/spinner";

const Section = ({ params }: { params: { id: string } }) => {
  console.log("patams.id", params.id);
  const { data, isLoading } = useSWR<RecommendationsType | FollowedArtistType>(
    `${params.id}`,
    async () => await SectionFetcher(params.id),
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );

  return (
    <div className={style.Section}>
      <PanelTarget side="Top" />
      {isLoading && (
        <div className="w-full h-full flex justify-center items-center">
          <Spinner />
        </div>
      )}
      {data !== undefined ? (
        <>
          <div className={style.ForUserMix_Div}>
            {_isFollowedArtist(data)
              ? params.id === "TopArtists"
                ? "Similar to:"
                : params.id === "FollowArtists"
                ? "Followed artists:"
                : "Similar to your genres:"
              : "Listen to this:"}
          </div>
          <aside className={style.Section__Content} id="SectionPage">
            {_isFollowedArtist(data) ? (
              data.items.map((it, id) =>
                params.id === "TopArtists" ? (
                  <PanelPGAT
                    key={id}
                    Href={`/playlist/${it.id}`}
                    FirstText={it.name}
                    SecondText={it.name}
                    ImageSRC={it?.images[0]?.url || "/RandomPL.png"}
                  />
                ) : params.id === "FollowArtists" ? (
                  <PanelPGAT
                    key={id}
                    Href={`/artist/${it.id}`}
                    FirstText={it.name}
                    SecondText={it.name}
                    ImageSRC={it?.images[0]?.url || "/RandomPL.png"}
                  />
                ) : params.id === "TopGenre" ? (
                  <PanelPGAT
                    key={id}
                    Href={`/playlist/genre?genre=${it}`}
                    FirstText={it.name}
                    SecondText={it.name}
                    ImageSRC={it?.images[0]?.url || "/RandomPL.png"}
                  />
                ) : (
                  <></>
                )
              )
            ) : _isTypeRecommendation(data) ? (
              data.tracks.map((it, id) => (
                <PanelPGAT
                  key={id}
                  Href={`/track/${it.id}`}
                  FirstText={it.name}
                  SecondText={it.artists[0].name}
                  ImageSRC={it?.album?.images[0]?.url || "/RandomPL.png"}
                />
              ))
            ) : (
              <></>
            )}
          </aside>
        </>
      ) : (
        <></>
      )}
      <div className={style.dash}></div>
      <div className={style.squarDash}></div>
      <PanelTarget side="Bottom" />
    </div>
  );
};

export default Section;

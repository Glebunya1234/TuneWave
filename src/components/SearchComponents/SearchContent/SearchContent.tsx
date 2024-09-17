"use client";
import { _Search } from "@/api/SP-Search/API-SP-Search";
import { SpotifySearchResult } from "@/types/SpotifyTypes/SearchType/SearchType";

import useSWR from "swr";

export const SearchContent = ({ id }: { id: string }) => {
  const { data, isLoading } = useSWR<SpotifySearchResult | null>(
    `api/search/${id}`,
    async () => await _Search(id),
    {
      revalidateOnFocus: false,
    }
  );
  if (isLoading) return <p>Loading...</p>;
  console.log("object :>> ", data);
  if (!data || !data.tracks) {
    return <p>No data available</p>;
  }
  return (
    <section>
      {data?.tracks.items.map((it, inx) => (
        <p key={inx} className="flex flex-col">
          {it.name}
        </p>
      ))}
    </section>
  );
};

"use client";

import { useEffect, useState } from "react";
import style from "./SearchInput.module.scss";
import { IoSearchSharp } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";

export const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [Loading, setLoading] = useState(true);
  const { results } = useSpotifySearch(searchQuery, Loading);
  const pathname = usePathname();
  const router = useRouter();
  const handleClickInput = () => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments[0] === "search") return;
    router.push("/search");
  };
  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <div className={style.SearchComponent}>
      <nav className={style.SearchInput}>
        <div className={style.SearchInput_Div} />
        <input
          type="text"
          placeholder="Search for track..."
          value={searchQuery}
          onClick={handleClickInput}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={style.SearchInput__Input}
        />
        <FaSearch className="text-[#808080;]" />
        <div className={style.SearchInput_Div2} />
      </nav>
    </div>
  );
};

//=========================================================================
const useSpotifySearch = (query: string, Loading: boolean) => {
  const [results, setResults] = useState<any>();
  const router = useRouter();
  useEffect(() => {
    if (Loading) return;
    const fetchSpotifySearchResults = () => {
      try {
        if (!query.trim()) {
          router.push(`/search`);
          return;
        }
        setResults(query);
        router.push(`/search/${query}`);
      } catch (error) {
        console.error("Ошибка при запросе к Spotify API:", error);
      }
    };

    const debounce = setTimeout(() => {
      fetchSpotifySearchResults();
    }, 500);

    return () => clearTimeout(debounce);
  }, [query]);

  return { results };
};

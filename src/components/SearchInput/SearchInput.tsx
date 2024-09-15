"use client";

import { useEffect, useState } from "react";
import style from "./SearchInput.module.scss";
import { IoSearchSharp } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";

export const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { results } = useSpotifySearch(searchQuery);

  return (
    <div className={style.SearchComponent}>
      <nav className={style.SearchInput}>
        <div className={style.SearchInput_Div} />
        <input
          type="text"
          placeholder="Search for track..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={style.SearchInput__Input}
        />
        <FaSearch className="text-[#808080;]" />
      </nav>
    </div>
  );
};

//=========================================================================
const useSpotifySearch = (query: string) => {
  const [results, setResults] = useState<any>();

  useEffect(() => {
    const fetchSpotifySearchResults = async () => {
      if (!query) return;

      try {
        setResults(query);
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

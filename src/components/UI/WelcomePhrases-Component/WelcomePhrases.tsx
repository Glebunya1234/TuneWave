"use client";
import { useState, useEffect } from "react";

const phrases = [
  "Enter the name of a song, album, or artist and start discovering your music.",
  "Start searching for music to see your favorite tracks and albums.",
  "Search for music that inspires you, and it will appear here.",
  "Enter a query, and we'll show you a selection of the best tracks and artists.",
  "Find music that suits your taste — enter the name of a song or artist.",
  "Start searching and dive into a world of music recommendations.",
  "Search for your favorite tracks, albums, and artists — the music is waiting for you.",
];

export const RandomPhrase = () => {
  const [phrase, setPhrase] = useState<string>("");

  useEffect(() => {
    const getRandomPhrase = () => {
      const randomIndex = Math.floor(Math.random() * phrases.length);
      return phrases[randomIndex];
    };

    setPhrase(getRandomPhrase());
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center ">
      <h1 className="xl:text-xl md:text-base overflow-hidden text-nowrap text-ellipsis">{phrase}</h1>
      <h1 className="text-sm overflow-hidden text-nowrap text-ellipsis opacity-20">TUNEWAVE by Glebunya with love</h1>
    </div>
  );
};

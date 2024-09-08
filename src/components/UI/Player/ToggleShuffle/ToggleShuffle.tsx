import { useState } from "react";
import { PiShuffleAngularBold } from "react-icons/pi";
import { setPlaybackShuffle } from "@/api/SP-Player/API-SP-Player";

export const ToggleShuffle = ({
  is_successTranfser,
}: {
  is_successTranfser: boolean;
}) => {
  const [Shuffle, setShuffle] = useState(false);
  return (
    <button
      className={`mx-3 hover:scale-[1.2] active:text-[#00fd00] ${
        !is_successTranfser
          ? "disabled:scale-100 disabled:active:text-gray-400 disabled:text-gray-400"
          : ""
      }`}
      disabled={!is_successTranfser ? true : false}
      onClick={async () => {
        setShuffle((prevState) => !prevState);
        await setPlaybackShuffle(Shuffle);
      }}
    >
      <PiShuffleAngularBold
        className={`active:text-[#00fd00] ${
          !is_successTranfser
            ? "disabled:scale-100 disabled:active:text-gray-400 disabled:text-gray-400"
            : ""
        }${Shuffle ? "text-[#00fd00]" : "text-white"}`}
      />
    </button>
  );
};

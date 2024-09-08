import { useState } from "react";
import { RiRepeat2Fill, RiRepeatOneFill } from "react-icons/ri";
import { setRepeatMode } from "@/api/SP-Player/API-SP-Player";

export const ToggleRepeat = ({
  is_successTranfser,
}: {
  is_successTranfser: boolean;
}) => {
  const [repeatState, setRepeatState] = useState<"off" | "context" | "track">(
    "off"
  );
  const toggleRepeat = () => {
    setRepeatState((prevState) => {
      if (prevState === "off") {
        setRepeatMode("context");
        return "context";
      }
      if (prevState === "context") {
        setRepeatMode("track");
        return "track";
      }

      setRepeatMode("off");
      return "off";
    });
  };
  return (
    <button
      className={`mx-3 hover:scale-[1.2] active:text-[#00fd00] ${
        !is_successTranfser
          ? "disabled:scale-100 disabled:active:text-gray-400 disabled:text-gray-400"
          : ""
      }`}
      disabled={!is_successTranfser ? true : false}
      onClick={toggleRepeat}
    >
      {repeatState === "off" && <RiRepeat2Fill />}
      {repeatState === "context" && (
        <RiRepeat2Fill className="text-[#00fd00]" />
      )}
      {repeatState === "track" && (
        <RiRepeatOneFill className="text-[#00fd00]" />
      )}
    </button>
  );
};

import { IoPlaySkipBack } from "react-icons/io5";

export const PrevTrack = ({
  is_successTranfser,
  player,
}: {
  is_successTranfser: boolean;
  player: Spotify.Player;
}) => {
  return (
    <button
      className={`mx-3 hover:scale-[1.2] active:text-[#00fd00] ${
        !is_successTranfser
          ? "disabled:scale-100 disabled:active:text-gray-400 disabled:text-gray-400"
          : ""
      }`}
      disabled={!is_successTranfser ? true : false}
      onClick={() => {
        player!?.previousTrack();
      }}
    >
      <IoPlaySkipBack />
    </button>
  );
};

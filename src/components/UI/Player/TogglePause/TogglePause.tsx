import { IoPauseCircleOutline, IoPlayCircleOutline } from "react-icons/io5";

export const TogglePause = ({
  is_successTranfser,
  player,
  is_paused,
}: {
  is_successTranfser: boolean;
  player: Spotify.Player;
  is_paused: boolean;
}) => {
  return (
    <button
      className={`text-3xl hover:scale-[1.2] active:text-[#00fd00] ${
        !is_successTranfser
          ? "disabled:scale-100 disabled:active:text-gray-400 disabled:text-gray-400"
          : ""
      }`}
      disabled={!is_successTranfser ? true : false}
      onClick={() => {
        console.log("is_successTranfser :>> ", is_successTranfser);
        player!?.togglePlay();
      }}
    >
      {!is_paused ? <IoPauseCircleOutline /> : <IoPlayCircleOutline />}
    </button>
  );
};

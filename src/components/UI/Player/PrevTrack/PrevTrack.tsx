import { IoPlaySkipBack } from "react-icons/io5";

export const PrevTrack = ({
  is_successTranfser,
  player,
}: {
  is_successTranfser: boolean;
  player: Spotify.Player;
}) => {
  const handleClick = async () => {
    const state = await player?.getCurrentState();

    if (state) {
      const currentPosition = state.position;

      if (currentPosition < 5000) {
        player?.previousTrack();
      } else {
        player?.seek(0);
      }
    }
  };
  return (
    <button
      className={`mx-3 hover:scale-[1.2] active:text-[#00fd00] ${
        !is_successTranfser
          ? "disabled:scale-100 disabled:active:text-gray-400 disabled:text-gray-400"
          : ""
      }`}
      disabled={!is_successTranfser ? true : false}
      onClick={handleClick}
    >
      <IoPlaySkipBack />
    </button>
  );
};

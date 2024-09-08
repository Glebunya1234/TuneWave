import style from "../player.module.scss";
import { GlobalContext } from "@/Context";

import { useContext, useEffect, useState } from "react";
import {
  PiSpeakerXFill,
  PiSpeakerNoneFill,
  PiSpeakerLowFill,
  PiSpeakerHighFill,
} from "react-icons/pi";

export const SoundValue = ({
  player,
  is_successTranfser,
}: {
  is_successTranfser: boolean;
  player: Spotify.Player;
}) => {
  const [position, setPosition] = useState<number>(0);
  const [Oldposition, setOldPosition] = useState<number>(0);
  const [XSound, setXSound] = useState<boolean>(false);
  const dataContext = useContext(GlobalContext);

  useEffect(() => {
    if (dataContext?.getCurrentPlaying) {
      player.getVolume().then((volume) => {
        setPosition(volume);
      });
    }
  }, [player]);

  const handlePositionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPosition = parseFloat(e.target.value);
    setPosition(newPosition);
    setXSound(false);
    player!?.setVolume(position);
  };

  const handleSoundClick = () => {
    if (!XSound) {
      setXSound(true);
      setOldPosition(position);
      setPosition(0);
      player.setVolume(0);
      return;
    }
    setXSound(false);
    setPosition(Oldposition);
    player.setVolume(Oldposition);
  };

  return (
    <div
      className={
        !is_successTranfser
          ? style.trackContainerSoundDisabled
          : style.trackContainerSound
      }
    >
      <button onClick={handleSoundClick}>
        {XSound ? (
          <PiSpeakerXFill className="text-lg" />
        ) : position >= 0 && position <= 0.26 ? (
          <PiSpeakerNoneFill className="text-lg" />
        ) : position > 0.26 && position <= 0.66 ? (
          <PiSpeakerLowFill className="text-lg" />
        ) : (
          <PiSpeakerHighFill className="text-lg" />
        )}
      </button>

      <div className={style.sliderWrapper}>
        <input
          id="position"
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={position}
          onChange={handlePositionChange}
          disabled={!is_successTranfser ? true : false}
        />
        <div
          className={style.progress}
          style={{ width: `${(position / 1) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

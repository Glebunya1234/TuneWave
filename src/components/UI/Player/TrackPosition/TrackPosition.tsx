import style from "../player.module.scss";
import { GlobalContext } from "@/Context";
import { formatDuration } from "@/utils/DurationFormatFunc";
import { useContext, useEffect, useState } from "react";

export const TrackPosition = ({
  player,
  is_successTranfser,
}: {
  is_successTranfser: boolean;
  player: Spotify.Player;
}) => {
  const [position, setPosition] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [lastUpdateTime, setLastUpdateTime] = useState<number>(Date.now());
  const dataContext = useContext(GlobalContext);

  useEffect(() => {
    if (dataContext?.getCurrentPlaying) {
      setPosition(dataContext.getCurrentPlaying.position);
      setDuration(dataContext.getCurrentPlaying.duration);
      if (dataContext.getCurrentPlaying?.current_track?.is_playable) {
        setLastUpdateTime(Date.now());
      }
    }
  }, [dataContext?.getCurrentPlaying]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (dataContext?.getCurrentPlaying?.isPlay && !isDragging) {
      interval = setInterval(() => {
        const now = Date.now();
        const elapsed = now - lastUpdateTime;

        setPosition((prevPosition) => {
          const newPosition = Math.min(prevPosition + elapsed, duration);
          return newPosition;
        });

        setLastUpdateTime(now);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [
    dataContext?.getCurrentPlaying?.isPlay,
    isDragging,
    lastUpdateTime,
    duration,
  ]);

  const handlePositionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPosition = parseInt(e.target.value, 10);
    setPosition(newPosition);
  };

  const handleMouseUp = async () => {
    if (!isDragging) return;
    player!?.seek(position);

    setIsDragging(false);
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  return (
    <div
      className={
        !is_successTranfser
          ? style.trackContainerDisabled
          : style.trackContainer
      }
      // className={style.trackContainer}
    >
      <span>{formatDuration(position)}</span>
      <div className={style.sliderWrapper}>
        <input
          id="position"
          type="range"
          min="0"
          max={duration}
          step="1000"
          value={position}
          onChange={handlePositionChange}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        />
        <div
          className={style.progress}
          style={{ width: `${(position / duration) * 100}%` }}
        ></div>
      </div>
      <span>{formatDuration(duration)}</span>
    </div>
  );
};
// import {
//   _PausePlayback,
//   _PlayTrackPlayback,
//   _SeekToPosition,
//   _setPlayTrack,
//   _SkipToBack,
//   _SkipToNext,
// } from "@/api/SP-Player/API-SP-Player";
// import style from "../player.module.scss";
// import { GlobalContext } from "@/Context";
// import { formatDuration } from "@/utils/DurationFormatFunc";
// import { useContext, useEffect, useState } from "react";

// export const TrackPosition = () => {
//   const [position, setPosition] = useState<number>(0);
//   const [duration, setDuration] = useState<number>(0);
//   const [isDragging, setIsDragging] = useState<boolean>(false);
//   const [lastUpdateTime, setLastUpdateTime] = useState<number>(Date.now());
//   const dataContext = useContext(GlobalContext);

//   useEffect(() => {
//     const {
//       progress_ms = 0,
//       duration_ms = 0,
//       is_playing = false,
//     } = dataContext?.getStatePlaying || {};
//     setPosition(progress_ms);
//     setDuration(duration_ms);
//     if (is_playing) {
//       setLastUpdateTime(Date.now());
//     }
//   }, [dataContext.getStatePlaying]);

//   useEffect(() => {
//     let interval: NodeJS.Timeout;

//     if (dataContext?.getStatePlaying.is_playing && !isDragging) {
//       interval = setInterval(() => {
//         const now = Date.now();
//         const elapsed = now - lastUpdateTime;
//         setPosition((prevPosition) => {
//           const newPosition = Math.min(prevPosition + elapsed, duration);
//           if (newPosition === duration) {
//             return 0;
//           }
//           return newPosition;
//         });
//         setLastUpdateTime(now);
//       }, 1000);
//     } else if (!dataContext?.getStatePlaying?.is_playing) {
//       setLastUpdateTime(Date.now());
//     }

//     return () => clearInterval(interval);
//   }, [
//     dataContext.getStatePlaying?.is_playing,
//     isDragging,
//     lastUpdateTime,
//     duration,
//   ]);

//   useEffect(() => {
//     if (!isDragging) {
//       dataContext?.setStatePlaying((prevState) => ({
//         ...prevState,
//         progress_ms: position,
//       }));
//     }
//   }, [position]);

//   const handlePositionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newPosition = parseInt(e.target.value, 10);
//     setPosition(newPosition);
//   };

//   const handleMouseUp = async () => {
//     if (!isDragging) return;
//     await _SeekToPosition(position, dataContext?.getDeviceID);
//     setIsDragging(false);
//   };

//   const handleMouseDown = () => {
//     setIsDragging(true);
//   };

//   return (
//     <div className={style.trackContainer}>
//       <span>{formatDuration(position)}</span>
//       <div className={style.sliderWrapper}>
//         <input
//           id="position"
//           type="range"
//           min="0"
//           max={duration}
//           step="1000"
//           value={position}
//           onChange={handlePositionChange}
//           onMouseDown={handleMouseDown}
//           onMouseUp={handleMouseUp}
//         />
//         <div
//           className={style.progress}
//           style={{ width: `${(position / duration) * 100}%` }} // Динамическое изменение ширины прогресс-бара
//         ></div>
//       </div>
//       <span>{formatDuration(duration)}</span>
//     </div>
//   );
// };

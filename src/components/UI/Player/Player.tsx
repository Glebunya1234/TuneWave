"use client";
import style from "./player.module.scss";
import { useContext, useEffect, useState } from "react";
import { TrackPosition } from "./TrackPosition/TrackPosition";
import { SoundValue } from "./Volume/Volume";
import { PrevTrack } from "./PrevTrack/PrevTrack";
import { TogglePause } from "./TogglePause/TogglePause";
import { NextTrack } from "./NextTrack/NextTrack";
import { ToggleRepeat } from "./ToggleRepeat/ToggleRepeat";
import { ToggleShuffle } from "./ToggleShuffle/ToggleShuffle";
import { CloseBarBtn } from "../Buttons/CloseSideBarBT/CloseBarBT";
import { CurrentTrackSideInfo } from "./CurrentTrackSideInfo/Tracknfo";
import { CgLoadbarDoc } from "react-icons/cg";
import { BiSolidPlaylist } from "react-icons/bi";
import { _SkipToNext, _TransferPlayback } from "@/api/SP-Player/API-SP-Player";
import { GlobalContext } from "@/Context";
import { MdLibraryMusic } from "react-icons/md";
import { PiSpeakerHighFill } from "react-icons/pi";

interface SpotifyPlayerProps {
  token: string;
}

export const SpotifyPlayer: React.FC<SpotifyPlayerProps> = ({ token }) => {
  const [player, setPlayer] = useState<Spotify.Player>();
  const [is_paused, setPaused] = useState(true);
  const [OpenSound, setOpenSound] = useState(false);
  const [OpenInfo, setOpenInfo] = useState(false);

  const [is_successTranfser, setTransfer] = useState(false);
  const dataContext = useContext(GlobalContext);

  useEffect(() => {
    const transfer = async (deviceId: string) => {
      // const success = await _TransferPlayback(deviceId);
      // setTransfer(success);
    };
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const spotifyPlayer = new window.Spotify.Player({
        name: "TuneWave",
        getOAuthToken: (cb) => {
          cb(token);
        },
        volume: 0.2,
      });

      setPlayer(spotifyPlayer);

      spotifyPlayer.addListener("ready", async ({ device_id }) => {
        dataContext?.setDeviceID(device_id);

        try {
          await transfer(device_id);
        } catch (error) {
          console.error("Error in transfer:", error);
          setTransfer(false);
        }
      });

      spotifyPlayer.addListener("initialization_error", ({ message }) => {
        console.error(message);
      });

      spotifyPlayer.addListener("player_state_changed", (state) => {
        if (!state) {
          return;
        }
        setPaused(state.paused);
        const {
          position,
          duration,
          track_window: { current_track } = {},
        } = state;
        if (current_track) {
          dataContext?.setCurrentPlaying({
            isPlay: !state.paused,
            current_track: current_track,
            position: position,
            duration: duration,
          });
        }
      });
      spotifyPlayer.connect();
    };
    return () => {
      if (player) {
        player.disconnect();
      }
    };
  }, [token]);

  return (
    <div className={style.SoundBar}>
      {player !== null && (
        <>
          <div
            className={`${style.SoundBar__ConteinerInfo} ${
              !OpenInfo ? style.SoundBar__Conteiner__Hidden : ""
            }`}
          >
            <CurrentTrackSideInfo
              isOpenSound={OpenSound}
              is_successTranfser={is_successTranfser}
            />
          </div>
          <div className={style.SoundBar__ConteinerTrack}>
            <nav className={style.SoundBar__Nav}>
              <button
                onClick={() => {
                  setOpenInfo((prevState) => !prevState);
                }}
                className="mx-3 min-750:hidden hover:scale-[1.2] active:text-[#00fd00]"
              >
                <MdLibraryMusic />
              </button>
              <ToggleShuffle is_successTranfser={is_successTranfser} />
              <PrevTrack
                is_successTranfser={is_successTranfser}
                player={player!}
              />
              <TogglePause
                is_successTranfser={is_successTranfser}
                player={player!}
                is_paused={is_paused}
              />
              <NextTrack
                is_successTranfser={is_successTranfser}
                player={player!}
              />
              <ToggleRepeat is_successTranfser={is_successTranfser} />

              <button
                onClick={() => {
                  setOpenSound((prevState) => !prevState);
                }}
                className="mx-3 min-750:hidden hover:scale-[1.2] active:text-[#00fd00]"
              >
                <PiSpeakerHighFill />
              </button>
            </nav>
            <nav className={style.SoundBar__Nav}>
              <TrackPosition
                player={player!}
                is_successTranfser={is_successTranfser}
              />
            </nav>
          </div>
          <div
            className={`${style.SoundBar__ConteinerSound} ${
              !OpenSound ? style.SoundBar__Conteiner__Hidden : ""
            }`}
          >
            <CloseBarBtn
              className={style.CloseBarBtn__Button}
              onToggle={() =>
                dataContext?.setRemoveLeft((prevState) => !prevState)
              }
            >
              <CgLoadbarDoc />
            </CloseBarBtn>
            <CloseBarBtn
              className={style.CloseBarBtn__Button}
              onToggle={() =>
                dataContext?.setRemoveRight((prevState) => !prevState)
              }
            >
              <BiSolidPlaylist />
            </CloseBarBtn>
            <SoundValue
              player={player!}
              is_successTranfser={is_successTranfser}
            />
          </div>
        </>
      )}
    </div>
  );
};

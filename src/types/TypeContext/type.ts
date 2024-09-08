import { CurrentlyPlayingTrack } from "../SpotifyTypes/CurrentlyPlayingTrack/type";
import { TypeSetState } from "../TypeMarqueeProps/type";
type state = {
    progress_ms: number;
    is_playing: boolean;
    duration_ms: number;
}
export type ContextType = {

    getTemporaryText: string
    setTemporaryText: TypeSetState<string>;
    getDefaultText: string
    setDefaultText: TypeSetState<string>;
    isHiddenLeftBar: boolean,
    setHiddenLeftBar: TypeSetState<boolean>;
    isHiddenRightBar: boolean,
    setHiddenRightBar: TypeSetState<boolean>;
    isRemoveLeft: boolean
    setRemoveLeft: TypeSetState<boolean>;
    isRemoveRight: boolean
    setRemoveRight: TypeSetState<boolean>;
    getStatePlaying: state,
    setStatePlaying: TypeSetState<state>;
    getCurrentPlaying: any,
    setCurrentPlaying: TypeSetState<any>;
    getDeviceID: string,
    setDeviceID: TypeSetState<string>;
    player: Spotify.Player | null,
    setPlayer: TypeSetState<Spotify.Player | null>;

};
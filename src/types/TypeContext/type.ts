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
    //текущий текст заднего фона
    getDefaultText: string
    setDefaultText: TypeSetState<string>;
    //дефолтный текст заднего фона, может изменятся

    isHiddenLeftBar: boolean,
    setHiddenLeftBar: TypeSetState<boolean>;
    isHiddenLeftPhoneBar: boolean,
    setHiddenLeftPhoneBar: TypeSetState<boolean>;
    //Состояние левого сайд бара (телефон, пк)

    isHiddenRightBar: boolean,
    setHiddenRightBar: TypeSetState<boolean>;
    //Состояние правого сайд бара

    isRemovePhoneLeft: boolean
    setRemovePhoneLeft: TypeSetState<boolean>;
    isRemoveLeft: boolean
    setRemoveLeft: TypeSetState<boolean>;
    //Состояние для вызивания анимации удаления для левого сайд бара (телефон, пк)

    isRemoveRight: boolean
    setRemoveRight: TypeSetState<boolean>;
    //Состояние для вызивания анимации удаления для правого сайд бара пк

    //Плеер
    getStatePlaying: state,
    setStatePlaying: TypeSetState<state>;
    getCurrentPlaying: any,
    setCurrentPlaying: TypeSetState<any>;
    getDeviceID: string,
    setDeviceID: TypeSetState<string>;
    player: Spotify.Player | null,
    setPlayer: TypeSetState<Spotify.Player | null>;

};
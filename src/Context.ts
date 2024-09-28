
import { createContext } from "react";
import { ContextType } from "./types/TypeContext/type";

//главный конетекст файл
export const GlobalContext = createContext<ContextType>({
    getTemporaryText: "Tunewave",
    setTemporaryText: () => { },
    //текущий текст заднего фона


    getDefaultText: "Tunewave",
    setDefaultText: () => { },
    //дефолтный текст заднего фона, может изменятся


    isHiddenLeftPhoneBar: false,
    setHiddenLeftPhoneBar: () => { },
    isHiddenLeftBar: true,
    setHiddenLeftBar: () => { },
    //Состояние левого сайд бара (телефон, пк)

    isHiddenRightBar: true,
    setHiddenRightBar: () => { },
    //Состояние правого сайд бара 


    isRemoveLeft: true,
    setRemoveLeft: () => { },

    isRemovePhoneLeft: false,
    setRemovePhoneLeft: () => { },

    //Состояние для вызивания анимации удаления для левого сайд бара (телефон, пк)

    isRemoveRight: true,
    setRemoveRight: () => { },
    //Состояние для вызивания анимации удаления для правого сайд бара пк

    getStatePlaying: {
        progress_ms: 0,
        is_playing: false,
        duration_ms: 0
    },


    
    setStatePlaying: () => { },
    getCurrentPlaying: {},
    setCurrentPlaying: () => { },
    getDeviceID: "",
    setDeviceID: () => { },
    player: null,
    setPlayer: () => { },
});

import { createContext } from "react";
import { ContextType } from "./types/TypeContext/type";


export const GlobalContext = createContext<ContextType>({
    getTemporaryText: "Tunewave",
    setTemporaryText: () => { },
    getDefaultText: "Tunewave",
    setDefaultText: () => { },

    isHiddenLeftPhoneBar: false,
    setHiddenLeftPhoneBar: () => { },
    isHiddenLeftBar: true,
    setHiddenLeftBar: () => { },


    isHiddenRightBar: true,
    setHiddenRightBar: () => { },
    isRemoveLeft: true,
    setRemoveLeft: () => { },

    isRemovePhoneLeft: false,
    setRemovePhoneLeft: () => { },

    isRemoveRight: true,
    setRemoveRight: () => { },


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
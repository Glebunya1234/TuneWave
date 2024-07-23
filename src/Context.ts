
import { createContext } from "react";
import type { TypeSetState } from "./types/TypeSetSstateForUseState/type";


// export type HovertextType = {
//     getTemporaryText: string | undefined
//     setTemporaryText: TypeSetState<string | undefined>;
//     getDefaultText: string | undefined
//     setDefaultText: TypeSetState<string | undefined>;
// };

// export const HoverTextContext = createContext<HovertextType>({   

//     getTemporaryText: "",
//     setTemporaryText: () => { },
//     getDefaultText: "",
//     setDefaultText: () => { },


// });
//-------------------------------------------------------------------------------------//
export type HovertextType = {

    getTemporaryText: string
    setTemporaryText: TypeSetState<string>;
    getDefaultText: string
    setDefaultText: TypeSetState<string>;
};
export const HoverTextContext = createContext<HovertextType>({
    getTemporaryText: "Tunewave",
    setTemporaryText: () => { },
    getDefaultText: "Tunewave",
    setDefaultText: () => { },
});
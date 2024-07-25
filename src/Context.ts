
import { createContext } from "react";
import { ContextType } from "./types/TypeContext/type";


export const GlobalContext = createContext<ContextType>({
    getTemporaryText: "Tunewave",
    setTemporaryText: () => { },
    getDefaultText: "Tunewave",
    setDefaultText: () => { },
    isHiddenLeftBar: true,
    setHiddenLeftBar: () => { },
    isHiddenRightBar: true,
    setHiddenRightBar: () => { },
});
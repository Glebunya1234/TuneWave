import { TypeSetState } from "../TypeMarqueeProps/type";

export type ContextType = {

    getTemporaryText: string
    setTemporaryText: TypeSetState<string>;
    getDefaultText: string
    setDefaultText: TypeSetState<string>;
    isHiddenLeftBar: boolean,
    setHiddenLeftBar: TypeSetState<boolean>;
    isHiddenRightBar: boolean,
    setHiddenRightBar: TypeSetState<boolean>;
};
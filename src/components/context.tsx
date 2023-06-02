import { createContext, useContext } from "react";
import { StateContextType } from "../helpers/types";

export const StateContext = createContext<StateContextType>({} as StateContextType);

export function useStateContext() {
    return useContext(StateContext);
}

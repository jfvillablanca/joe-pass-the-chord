import { createContext, useContext } from "react";
import { FretboardContextType, StateContextType } from "../helpers/types";

export const StateContext = createContext<StateContextType>({} as StateContextType);

export const FretboardContext = createContext<FretboardContextType>({} as FretboardContextType);

export function useStateContext() {
    return useContext(StateContext);
}

export function useFretboardContext() {
    return useContext(FretboardContext);
}

import { createContext, useContext } from "react";
import { FingeredString, FretCell } from "./types";

export const TuningContext = createContext<string[]>([]);
export const RenderedFretsContext = createContext<FretCell[][]>([]);
export const FretClickContext = createContext<(cell: FretCell) => void>(
    () => {}
);
export const FingeredFretContext = createContext<FingeredString[]>([]);
export const ChordTonesContext = createContext<string[]>([]);

export function useFretClickContext() {
    return useContext(FretClickContext);
}

export function useTuningContext() {
    return useContext(TuningContext);
}

export function useRenderedFretsContext() {
    return useContext(RenderedFretsContext);
}

export function useFingeredFretContext() {
    return useContext(FingeredFretContext);
}

export function useChordTonesContext() {
    return useContext(ChordTonesContext);
}

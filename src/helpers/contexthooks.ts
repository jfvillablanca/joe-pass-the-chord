import { createContext, useContext } from "react";
import { FingeredFret, FretCell } from "./types";

export const TuningContext = createContext<string[]>([]);
export const RenderedFretsContext = createContext<FretCell[][]>([]);
export const FretClickContext = createContext<(cell: FretCell) => void>(
    () => {}
);
export const FingeredFretContext = createContext<FingeredFret[]>([]);
export const ChordTonesContext = createContext<string[]>([]);
export const FretScrollContext = createContext<
    (direction: "higher" | "lower") => void
>(() => {});
export const FretOffsetContext = createContext<number>(1);

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

export function useFretScrollContext() {
    return useContext(FretScrollContext);
}

export function useFretOffsetContext() {
    return useContext(FretOffsetContext);
}

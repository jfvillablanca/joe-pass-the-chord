import { createContext, useContext, useState } from "react";
import { fromSemitones } from "@tonaljs/interval";
import { transpose } from "@tonaljs/note";

const FretClickContext = createContext<(note: string) => void>(() => {});
const TuningContext = createContext<string[]>([]);
const RenderedFrets = createContext<string[][]>([]);

export function useFretClickContext() {
    return useContext(FretClickContext);
}

export function useTuningContext() {
    return useContext(TuningContext);
}

export function useRenderedFrets() {
    return useContext(RenderedFrets);
}

export function MainContext({ children }: { children: React.ReactNode }) {
    const computeRenderedFrets = () => {
        return tuning.map((openStringNote) => {
            return Array.from({ length: noOfFrets })
                .map((_, fretOffset) => {
                    return transpose(
                        openStringNote,
                        fromSemitones(lowestRenderedFretNum + fretOffset)
                    );
                })
                .reverse();
        });
    };

    const tuning = ["E", "A", "D", "G", "B", "E"];
    const noOfFrets = 5;
    const [lowestRenderedFretNum, setLowestRenderedFretNum] = useState(1);
    const [renderedFrets, setRenderedFrets] = useState(computeRenderedFrets());

    const handleFretClick = (note: string) => {
        console.log(note);
    };

    return (
        <TuningContext.Provider value={tuning}>
            <RenderedFrets.Provider value={renderedFrets}>
                <FretClickContext.Provider value={handleFretClick}>
                    {children}
                </FretClickContext.Provider>
            </RenderedFrets.Provider>
        </TuningContext.Provider>
    );
}

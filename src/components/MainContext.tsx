import { createContext, useContext, useState } from "react";
import { fromSemitones as semitonesToNote } from "@tonaljs/interval";
import { transpose as transposeNote } from "@tonaljs/note";

const TuningContext = createContext<string[]>([]);
const RenderedFretsContext = createContext<FretCell[][]>([]);
const FretClickContext = createContext<(cell: FretCell) => void>(() => {});

export function useFretClickContext() {
    return useContext(FretClickContext);
}

export function useTuningContext() {
    return useContext(TuningContext);
}

export function useRenderedFretsContext() {
    return useContext(RenderedFretsContext);
}

export type FretCell = {
    note: string;
    string: number;
    fret: number;
};

export function MainContext({ children }: { children: React.ReactNode }) {
    const tuning = ["E", "A", "D", "G", "B", "E"];
    const numberOfFrets = 5;

    const computeRenderedFrets = () => {
        return tuning.map((openStringNote, string) => {
            return Array.from({ length: numberOfFrets })
                .map((_, fretOffset) => {
                    const note = transposeNote(
                        openStringNote,
                        semitonesToNote(lowestRenderedFretNum + fretOffset)
                    );
                    const fret = lowestRenderedFretNum + fretOffset;
                    const fretCell: FretCell = {
                        note,
                        string,
                        fret,
                    };
                    return fretCell;
                })
                .reverse();
        });
    };

    const initializeFingeredStrings = () => {
        return tuning.map(() => "muted" as FingeredString);
    };

    const [lowestRenderedFretNum, setLowestRenderedFretNum] = useState(1);
    const [renderedFrets, setRenderedFrets] = useState(computeRenderedFrets());
    const [fingeredStrings, setFingeredStrings] = useState(
        initializeFingeredStrings()
    );

    const handleFretClick = (cell: FretCell) => {
        console.log(cell);
    };

    return (
        <TuningContext.Provider value={tuning}>
            <RenderedFretsContext.Provider value={renderedFrets}>
                <FretClickContext.Provider value={handleFretClick}>
                    {children}
                </FretClickContext.Provider>
            </RenderedFretsContext.Provider>
        </TuningContext.Provider>
    );
}

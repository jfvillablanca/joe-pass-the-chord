import { createContext, useContext, useState } from "react";
import { fromSemitones } from "@tonaljs/interval";
import { transpose } from "@tonaljs/note";

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
    stringNumber: number;
    fretNumber: number;
};

export function MainContext({ children }: { children: React.ReactNode }) {
    const computeRenderedFrets = () => {
        return tuning.map((openStringNote, stringNumber) => {
            return Array.from({ length: noOfFrets })
                .map((_, fretOffset) => {
                    const fretCell: FretCell = {
                        note: transpose(
                            openStringNote,
                            fromSemitones(lowestRenderedFretNum + fretOffset)
                        ),
                        stringNumber: stringNumber,
                        fretNumber: lowestRenderedFretNum + fretOffset,
                    };
                    return fretCell;
                })
                .reverse();
        });
    };

    const initializeRingingNotes = () => {
        return tuning.map(() => {
            return Array.from({ length: noOfFrets })
                .map(() => {
                    return 0;
                })
                .reverse();
        });
    };

    const tuning = ["E", "A", "D", "G", "B", "E"];
    const noOfFrets = 5;
    const [lowestRenderedFretNum, setLowestRenderedFretNum] = useState(1);
    const [renderedFrets, setRenderedFrets] = useState(computeRenderedFrets());
    const [ringingNotes, setRingingNotes] = useState(initializeRingingNotes());

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

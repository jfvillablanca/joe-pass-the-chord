import { useState } from "react";
import { fromSemitones as semitonesToNote } from "@tonaljs/interval";
import { transpose as transposeNote } from "@tonaljs/note";
import {
    FingeredStringContext,
    FretClickContext,
    RenderedFretsContext,
    TuningContext,
} from "../helpers/contexthooks";
import { FingeredString, FretCell } from "../helpers/types";

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
        setFingeredStrings((prevFingeredString) => {
            return prevFingeredString.map((stringValue, stringNumber) => {
                if (stringValue === cell.fret && stringNumber === cell.string) {
                    return "muted";
                }
                return stringNumber === cell.string ? cell.fret : stringValue;
            });
        });
    };

    return (
        <TuningContext.Provider value={tuning}>
            <RenderedFretsContext.Provider value={renderedFrets}>
                <FretClickContext.Provider value={handleFretClick}>
                    <FingeredStringContext.Provider value={fingeredStrings}>
                        {children}
                    </FingeredStringContext.Provider>
                </FretClickContext.Provider>
            </RenderedFretsContext.Provider>
        </TuningContext.Provider>
    );
}

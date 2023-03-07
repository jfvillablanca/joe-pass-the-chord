import { useEffect, useState } from "react";
import { fromSemitones as semitonesToNote } from "@tonaljs/interval";
import { transpose as transposeNote } from "@tonaljs/note";
import {
    ChordTonesContext,
    FingeredFretContext,
    FretClickContext,
    FretScrollContext,
    LowestFretScrollContext,
    RenderedFretsContext,
    TuningContext,
} from "../helpers/contexthooks";
import { FingeredString, FretCell } from "../helpers/types";

export function MainContext({ children }: { children: React.ReactNode }) {
    // NOTE: tuning and no of frets cound could become state
    // variables as features in the future
    const tuning = ["E", "A", "D", "G", "B", "E"];
    const numberOfFrets = 5;
    const highestFretNum = 24;

    const computeRenderedFrets = (lowestRenderedFretNum: number) => {
        return tuning.map((openStringNote, string) => {
            return Array.from({ length: numberOfFrets }).map(
                (_, fretOffset) => {
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
                }
            );
        });
    };

    const initializeFingeredFrets = () => {
        return tuning.map(() => "muted" as FingeredString);
    };

    const initializeChordTones = () => {
        return tuning.map(() => "");
    };

    const [lowestRenderedFretNum, setLowestRenderedFretNum] = useState(1);
    const [renderedFrets, setRenderedFrets] = useState(
        computeRenderedFrets(lowestRenderedFretNum)
    );
    const [fingeredFrets, setFingeredFrets] = useState(
        initializeFingeredFrets()
    );
    const [chordTones, setChordTones] = useState<string[]>(
        initializeChordTones()
    );

    const handleFretClick = (cell: FretCell) => {
        setFingeredFrets((prevFingeredFrets) => {
            return prevFingeredFrets.map((fingeredFret, stringNumber) => {
                if (
                    fingeredFret === cell.fret &&
                    stringNumber === cell.string
                ) {
                    return "muted";
                }
                return stringNumber === cell.string ? cell.fret : fingeredFret;
            });
        });

        setChordTones((prevChordTones) => {
            return prevChordTones.map((chordTone, stringNumber) => {
                if (chordTone === cell.note && stringNumber === cell.string) {
                    return "";
                }
                return stringNumber === cell.string ? cell.note : chordTone;
            });
        });
    };

    const handleFretScroll = (direction: "higher" | "lower") => {
        setLowestRenderedFretNum((prevLowestRenderedFretNum) => {
            if (direction === "lower") {
                const newLowestRenderedFretNum = prevLowestRenderedFretNum - 1;
                return newLowestRenderedFretNum < 1
                    ? 1
                    : newLowestRenderedFretNum;
            }
            const newLowestRenderedFretNum = prevLowestRenderedFretNum + 1;
            return newLowestRenderedFretNum > highestFretNum - numberOfFrets
                ? highestFretNum - numberOfFrets
                : newLowestRenderedFretNum;
        });
    };

    useEffect(() => {
        // NOTE: Not sure if this is the idiomatic way to do it.
        setRenderedFrets(computeRenderedFrets(lowestRenderedFretNum));
    }, [lowestRenderedFretNum]);

    return (
        <TuningContext.Provider value={tuning}>
            <RenderedFretsContext.Provider value={renderedFrets}>
                <LowestFretScrollContext.Provider value={lowestRenderedFretNum}>
                    <FretScrollContext.Provider value={handleFretScroll}>
                        <FretClickContext.Provider value={handleFretClick}>
                            <FingeredFretContext.Provider value={fingeredFrets}>
                                <ChordTonesContext.Provider value={chordTones}>
                                    {children}
                                </ChordTonesContext.Provider>
                            </FingeredFretContext.Provider>
                        </FretClickContext.Provider>
                    </FretScrollContext.Provider>
                </LowestFretScrollContext.Provider>
            </RenderedFretsContext.Provider>
        </TuningContext.Provider>
    );
}

import { useEffect, useState } from "react";
import { fromSemitones as semitonesToNote } from "@tonaljs/interval";
import { transpose as transposeNote, simplify } from "@tonaljs/note";
import {
    ChordTonesContext,
    FingeredFretContext,
    FretClickContext,
    FretScrollContext,
    FretOffsetContext,
    RenderedFretsContext,
    TuningContext,
} from "../helpers/contexthooks";
import { FingeredFret, FretCell } from "../helpers/types";

export function MainContext({ children }: { children: React.ReactNode }) {
    // NOTE: tuning and no of frets cound could become state
    // variables as features in the future
    const tuning = ["E", "A", "D", "G", "B", "E"];
    const numberOfFrets = 5;
    const highestFretNum = 24;

    const computeRenderedFrets = (tuning: string[], fretOffset: number) => {
        return tuning.map((openStringNote, string) => {
            return Array.from({ length: numberOfFrets }).map((_, fretIndex) => {
                const note = transposeNote(
                    openStringNote,
                    semitonesToNote(fretOffset + fretIndex)
                );
                const fret = fretOffset + fretIndex;
                const fretCell: FretCell = {
                    note,
                    string,
                    fret,
                };
                return fretCell;
            });
        });
    };

    const computeChordTones = (fingeredFrets: FingeredFret[]) => {
        return fingeredFrets.map((fingeredFret) =>
            fingeredFret === "muted" ? "" : fingeredFret.note
        );
    };

    const initializeFingeredFrets = () => {
        return tuning.map(() => "muted" as FingeredFret);
    };

    const [fretOffset, setFretOffset] = useState(1);
    const [fingeredFrets, setFingeredFrets] = useState(
        initializeFingeredFrets()
    );
    const [renderedFrets, setRenderedFrets] = useState(
        computeRenderedFrets(tuning, fretOffset)
    );
    const [chordTones, setChordTones] = useState<string[]>(
        computeChordTones(fingeredFrets)
    );

    const handleFretClick = (cell: FretCell) => {
        setFingeredFrets((prevFingeredFrets) => {
            const relativeFingeredFret = cell.fret - fretOffset + 1;
            return prevFingeredFrets.map((fingeredFret, stringNumber) => {
                if (
                    fingeredFret !== "muted" &&
                    fingeredFret.relativeFret === relativeFingeredFret &&
                    stringNumber === cell.string
                ) {
                    return "muted";
                }
                return stringNumber === cell.string
                    ? { note: cell.note, relativeFret: relativeFingeredFret }
                    : fingeredFret;
            });
        });
    };

    const handleFretScroll = (direction: "higher" | "lower") => {
        setFretOffset((prevFretOffset) => {
            if (direction === "lower") {
                const newFretOffset = prevFretOffset - 1;
                return newFretOffset < 1 ? 1 : newFretOffset;
            }
            const newFretOffset = prevFretOffset + 1;
            return newFretOffset > highestFretNum - numberOfFrets + 1
                ? highestFretNum - numberOfFrets + 1
                : newFretOffset;
        });

        setFingeredFrets((prevFingeredFrets) => {
            const transposedNote = (note: string, transposeValue: number) =>
                simplify(transposeNote(note, semitonesToNote(transposeValue)));

            return prevFingeredFrets.map((fingeredFret) => {
                if (fingeredFret === "muted") {
                    return "muted";
                } else if (fingeredFret.relativeFret === 0) {
                    return { ...fingeredFret, relativeFret: 0 };
                } else {
                    return direction === "higher" &&
                        fretOffset < highestFretNum - numberOfFrets + 1
                        ? {
                              ...fingeredFret,
                              note: transposedNote(fingeredFret.note, 1),
                          }
                        : direction === "lower" && fretOffset > 1
                        ? {
                              ...fingeredFret,
                              note: transposedNote(fingeredFret.note, -1),
                          }
                        : fingeredFret;
                }
            });
        });
    };

    useEffect(() => {
        // NOTE: Not sure if this is the idiomatic way to do it.
        setChordTones(computeChordTones(fingeredFrets));
    }, [fingeredFrets]);

    useEffect(() => {
        // NOTE: Not sure if this is the idiomatic way to do it.
        setRenderedFrets(computeRenderedFrets(tuning, fretOffset));
    }, [fretOffset]);

    return (
        <TuningContext.Provider value={tuning}>
            <RenderedFretsContext.Provider value={renderedFrets}>
                <FretOffsetContext.Provider value={fretOffset}>
                    <FretScrollContext.Provider value={handleFretScroll}>
                        <FretClickContext.Provider value={handleFretClick}>
                            <FingeredFretContext.Provider value={fingeredFrets}>
                                <ChordTonesContext.Provider value={chordTones}>
                                    {children}
                                </ChordTonesContext.Provider>
                            </FingeredFretContext.Provider>
                        </FretClickContext.Provider>
                    </FretScrollContext.Provider>
                </FretOffsetContext.Provider>
            </RenderedFretsContext.Provider>
        </TuningContext.Provider>
    );
}

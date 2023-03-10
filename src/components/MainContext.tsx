import { useState } from "react";
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

    const computeRenderedFrets = (
        tuning: string[],
        fretOffset: number
    ): FretCell[][] => {
        return tuning.map((openStringNote, string) => {
            return Array.from({ length: numberOfFrets }).map((_, fretIndex) => {
                const note = transposeNote(
                    openStringNote,
                    semitonesToNote(fretOffset + fretIndex)
                );
                const absoluteFret = fretOffset + fretIndex;
                return {
                    note,
                    string,
                    absoluteFret,
                };
            });
        });
    };

    const computeChordTones = (fingeredFrets: FingeredFret[]) => {
        return fingeredFrets.map((fingeredFret) =>
            fingeredFret === "muted" ? "" : fingeredFret.note
        );
    };

    const [fretOffset, setFretOffset] = useState(1);
    const [fingeredFrets, setFingeredFrets] = useState(
        tuning.map(() => "muted" as FingeredFret)
    );

    const handleFretClick = (cell: FretCell) => {
        setFingeredFrets((prevFingeredFrets) => {
            const normalizedFret = cell.absoluteFret - fretOffset + 1;
            return prevFingeredFrets.map((fingeredFret, stringNumber) => {
                if (
                    fingeredFret !== "muted" &&
                    fingeredFret.relativeFret === normalizedFret &&
                    stringNumber === cell.string
                ) {
                    return "muted";
                }
                return stringNumber === cell.string
                    ? { note: cell.note, relativeFret: normalizedFret }
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

    return (
        <TuningContext.Provider value={tuning}>
            <RenderedFretsContext.Provider
                value={computeRenderedFrets(tuning, fretOffset)}
            >
                <FretOffsetContext.Provider value={fretOffset}>
                    <FretScrollContext.Provider value={handleFretScroll}>
                        <FretClickContext.Provider value={handleFretClick}>
                            <FingeredFretContext.Provider value={fingeredFrets}>
                                <ChordTonesContext.Provider
                                    value={computeChordTones(fingeredFrets)}
                                >
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

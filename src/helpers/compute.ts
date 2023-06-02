import { detect } from "@tonaljs/chord-detect";
import { fromMidi, fromMidiSharps, get } from "@tonaljs/note";
import { unzip } from "underscore";
import { FingeredNotes } from "./types";

function computeFingeredNotes(
    strings: number[],
    tuning: number[]
): FingeredNotes {
    const noteNames: string[][] = unzip(
        strings
            .map((fret, string) => {
                if (fret !== -1) {
                    const { name: nameFlat } = get(
                        fromMidi(tuning[string] + fret)
                    );
                    const { name: nameSharp } = get(
                        fromMidiSharps(tuning[string] + fret)
                    );
                    return [nameFlat, nameSharp];
                }
                return [null];
            })
            .filter((x) => x !== null)
    );

    const chordNames = noteNames.map((noteGroup) =>
        detect(noteGroup, { assumePerfectFifth: true })
    );

    return {
        noteNames,
        chordNames,
    };
}

export { computeFingeredNotes };

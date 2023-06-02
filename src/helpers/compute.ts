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
            .filter((fret) => fret !== -1)
            .map((fret, string) => {
                const { name: nameFlat } = get(fromMidi(tuning[string] + fret));
                const { name: nameSharp } = get(
                    fromMidiSharps(tuning[string] + fret)
                );
                return [nameFlat, nameSharp];
            })
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
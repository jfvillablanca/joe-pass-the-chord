import { detect } from "@tonaljs/chord-detect";
import { fromMidi, fromMidiSharps, get } from "@tonaljs/note";
import { unzip } from "underscore";
import { FingeredNotesType } from "./types";

function computeFingeredNotes(
    strings: number[],
    tuning: number[]
): FingeredNotesType {
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
                    return [nameSharp, nameFlat];
                }
                return [null];
            })
            .filter((noteGroup) => noteGroup !== null)
    );

    const chordNames = noteNames.map((noteGroup) =>
        detect(noteGroup.reverse(), { assumePerfectFifth: true })
    );

    return {
        noteNames,
        chordNames,
    };
}

const [UPPER_FRET_LIMIT, LOWER_FRET_LIMIT] = [22, 0];
const DISPLAYED_FRETS = 5;

export {
    UPPER_FRET_LIMIT,
    LOWER_FRET_LIMIT,
    DISPLAYED_FRETS,
    computeFingeredNotes,
};

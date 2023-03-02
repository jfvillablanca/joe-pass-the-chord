import { Notes } from "./notes";
import { Intervals } from "./intervals";
import { Interval, Note } from "./types";

export { Notes, Intervals };
function getNoteFromInterval(
    refNote: Note,
    interval: Interval,
    direction: "ascending" | "descending"
): Note[] {
    const rawInterval =
        direction === "ascending"
            ? refNote.intervalFromCNatural + interval.semitoneDistance
            : refNote.intervalFromCNatural - interval.semitoneDistance;

    const normalizedInterval =
        rawInterval >= 0 ? rawInterval % 12 : (rawInterval % 12) + 12;

    const enharmonics: Note[] = Object.values(Notes).filter((note: Note) => {
        if (note.intervalFromCNatural === normalizedInterval) {
            return note;
        }
    });


    return enharmonics;
}

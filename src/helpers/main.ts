import { Notes } from "./notes";
import { Intervals } from "./intervals";
import { Interval, Note } from "./types";

export { Notes, Intervals };
function getNoteFromInterval(
    refNote: Note,
    interval: Interval,
    direction: "ascending" | "descending"
): Note[] {
    const normalizedInterval =
        direction === "ascending"
            ? (refNote.intervalFromCNatural + interval.semitoneDistance) % 12
            : -(refNote.intervalFromCNatural - interval.semitoneDistance) % 12;

    const enharmonics: Note[] = Object.values(Notes).filter((note: Note) => {
        if (note.intervalFromCNatural === normalizedInterval) {
            return note;
        }
    });


    return enharmonics;
}

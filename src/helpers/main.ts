import { Notes } from "./notes";
import { Intervals } from "./intervals";

export { Notes, Intervals };
function getNoteFromInterval(
    refNote: Note,
    interval: Interval,
    direction: "ascending" | "descending"
): Note {
    const ascendingInterval =
        (refNote.intervalFromCNatural + interval.semitoneDistance) % 13;
    const descendingInterval =
        (refNote.intervalFromCNatural - interval.semitoneDistance) % 13;

    const [intervalNote]: Note[] = Object.values(Notes).filter((note: Note) => {
        if (
            direction === "ascending" &&
            note.intervalFromCNatural === ascendingInterval
        ) {
            return note;
        }

        if (
            direction === "descending" &&
            note.intervalFromCNatural === descendingInterval
        ) {
            return note;
        }
    });

    return intervalNote;
}

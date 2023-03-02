import { Notes } from "./notes";
import { Intervals } from "./intervals";

export { Notes, Intervals };
function getNoteFromInterval(
    refNote: Note,
    interval: Interval,
    direction: "ascending" | "descending"
): Note {
    const absInterval = refNote.intervalFromCNatural;
    const relativeInterval = interval.semitoneDistance;

    const [intervalNote]: Note[] = Object.values(Notes).filter((note: Note) => {
        if (
            direction === "ascending" &&
            note.intervalFromCNatural === absInterval + relativeInterval
        ) {
            return note;
        }

        if (
            direction === "descending" &&
            note.intervalFromCNatural === absInterval - relativeInterval
        ) {
            return note;
        }
    });

    return intervalNote;
}

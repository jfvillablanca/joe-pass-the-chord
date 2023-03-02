import { Notes } from "./notes";
import { Intervals } from "./intervals";
import { Scale } from "./scales";
import { Interval, Note } from "./types";

function getEnharmonicsFromInterval(
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
        if (normalizedInterval === 0 || normalizedInterval === 12) {
            return (
                note.intervalFromCNatural === 0 ||
                note.intervalFromCNatural === 12
            );
        } else {
            return note.intervalFromCNatural === normalizedInterval;
        }
    });

    return enharmonics;
}

function getScaleTones(tonic: Note, scale: Interval[]): Note[] {
    return [];
}

export { Notes, Scale, Intervals, getEnharmonicsFromInterval, getScaleTones };

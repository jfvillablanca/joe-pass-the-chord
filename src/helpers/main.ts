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

function getScaleTones(tonic: Note, scale: Interval[]): (Note | undefined)[] {
    const isValidScaleDegree = createScaleDegreeValidator(tonic);

    return scale.map((degree) => {
        if (degree === Intervals.perfectUnison) {
            return tonic;
        }

        return getEnharmonicsFromInterval(tonic, degree, "ascending").find(
            (note) => {
                return isValidScaleDegree(note);
            }
        );
    });
}

function createScaleDegreeValidator(
    tonic: Note
): (enharmonicNote: Note) => Boolean {
    type NaturalNote = "A" | "B" | "C" | "D" | "E" | "F" | "G";
    let currentScaleDegree: NaturalNote = tonic.name[0] as NaturalNote;
    const nextNaturalDegree: { [key in NaturalNote]: NaturalNote } = {
        A: "B",
        B: "C",
        C: "D",
        D: "E",
        E: "F",
        F: "G",
        G: "A",
    };

    const isThisTheNextDegree = (naturalNoteQuery: NaturalNote): Boolean => {
        return naturalNoteQuery === nextNaturalDegree[currentScaleDegree];
    };

    return (enharmonicNote: Note): Boolean => {
        const naturalizedNoteName: NaturalNote = enharmonicNote
            .name[0] as NaturalNote;

        if (isThisTheNextDegree(naturalizedNoteName)) {
            currentScaleDegree = naturalizedNoteName;
            return true;
        }
        return false;
    };
}

export { Notes, Scale, Intervals, getEnharmonicsFromInterval, getScaleTones };

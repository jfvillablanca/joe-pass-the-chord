import { Notes } from "./notes";
import { Intervals } from "./intervals";
import { Scale, validKeySignatures } from "./scales";
import { Interval, Note } from "./types";

function getEnharmonicsFromInterval(
    refNote: Note,
    interval: Interval,
    direction: "ascending" | "descending"
): Note[] {
    const rawDistance =
        direction === "ascending"
            ? refNote.intervalFromCNatural + interval.semitoneDistance
            : refNote.intervalFromCNatural - interval.semitoneDistance;

    const normalizedDistance =
        rawDistance >= 0 ? rawDistance % 12 : (rawDistance % 12) + 12;

    const enharmonics: Note[] = Object.values(Notes).filter((note: Note) => {
        if (normalizedDistance === 0 || normalizedDistance === 12) {
            return (
                note.intervalFromCNatural === 0 ||
                note.intervalFromCNatural === 12
            );
        } else {
            return note.intervalFromCNatural === normalizedDistance;
        }
    });

    return enharmonics;
}

function getEnharmonicEquivalent(refNote: Note): Note {
    const enharmonics: Note[] = getEnharmonicsFromInterval(
        refNote,
        Intervals.perfectUnison,
        "ascending"
    );

    const enharmonicEquivalent = enharmonics.find((note) => note !== refNote);
    return enharmonicEquivalent ?? enharmonics[0];
}

function getInterval(lowerNote: Note, higherNote: Note): Interval {
    const absDistanceForLowNote = lowerNote.intervalFromCNatural;
    const absDistanceForHighNote = higherNote.intervalFromCNatural;

    const interval = Object.values(Intervals).filter(
        (interval) =>
            interval.semitoneDistance ===
            absDistanceForHighNote - absDistanceForLowNote
    );

    return interval[0];
}

function _getScaleTones(tonic: Note, scale: Interval[]): Note[] {
    const isValidScaleDegree = createScaleDegreeValidator(tonic);

    return scale.map((degree) => {
        if (degree === Intervals.perfectUnison) {
            return tonic;
        }

        return getEnharmonicsFromInterval(tonic, degree, "ascending").find(
            (note) => {
                return isValidScaleDegree(note);
            }
        ) as Note;
    });
}

function getScaleTones(tonic: Note, scale: Interval[]): Note[] {
    const adjustedTonic = validKeySignatures.includes(tonic)
        ? tonic
        : getEnharmonicEquivalent(tonic);

    if (adjustedTonic !== tonic) {
        console.log(
            `The key signature ${tonic.name} has been adjusted to the key of ${adjustedTonic.name}`
        );
    }

    return _getScaleTones(adjustedTonic, scale);
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

export {
    Notes,
    Scale,
    Intervals,
    getEnharmonicsFromInterval,
    getEnharmonicEquivalent,
    getInterval,
    getScaleTones,
};

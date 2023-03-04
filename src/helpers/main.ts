import { CHROMATIC_SCALE_LENGTH, Notes } from "./notes";
import { Intervals } from "./intervals";
import { Scale, validKeySignatures } from "./scales";
import { Chord, Interval, Note } from "./types";

function getEnharmonicsFromInterval(
    refNote: Note,
    interval: Interval,
    direction: "ascending" | "descending"
): Note[] {
    const rawDistance =
        direction === "ascending"
            ? refNote.distanceFromCNatural + interval.semitoneDistance
            : refNote.distanceFromCNatural - interval.semitoneDistance;

    const normalizedDistance =
        rawDistance >= 0
            ? rawDistance % CHROMATIC_SCALE_LENGTH
            : (rawDistance % CHROMATIC_SCALE_LENGTH) + CHROMATIC_SCALE_LENGTH;

    const enharmonics: Note[] = Object.values(Notes).filter((note: Note) => {
        if (
            normalizedDistance === 0 ||
            normalizedDistance === CHROMATIC_SCALE_LENGTH
        ) {
            return (
                note.distanceFromCNatural === 0 ||
                note.distanceFromCNatural === CHROMATIC_SCALE_LENGTH
            );
        } else {
            return note.distanceFromCNatural === normalizedDistance;
        }
    });

    return enharmonics;
}

function _getEnharmonicEquivalent(refNote: Note): Note {
    const enharmonics: Note[] = getEnharmonicsFromInterval(
        refNote,
        Intervals.perfectUnison,
        "ascending"
    );

    const enharmonicEquivalent = enharmonics.find((note) => note !== refNote);
    return enharmonicEquivalent ?? enharmonics[0];
}

function getInterval(lowerNote: Note, higherNote: Note): Interval {
    const loAbsDistance = lowerNote.distanceFromCNatural;
    const hiAbsDistance = higherNote.distanceFromCNatural;

    const normalizedInterval =
        hiAbsDistance < loAbsDistance
            ? CHROMATIC_SCALE_LENGTH - (loAbsDistance - hiAbsDistance)
            : hiAbsDistance - loAbsDistance;

    const interval = Object.values(Intervals).filter(
        (interval) => interval.semitoneDistance === normalizedInterval
    );

    return interval[0];
}

function _getScaleTones(tonic: Note, scale: Interval[]): Note[] {
    const isValidScaleDegree = _createScaleDegreeValidator(tonic);

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
        : _getEnharmonicEquivalent(tonic);

    if (adjustedTonic !== tonic) {
        console.log(
            `The key signature ${tonic.name} has been adjusted to the key of ${adjustedTonic.name}`
        );
    }

    return _getScaleTones(adjustedTonic, scale);
}

function _createScaleDegreeValidator(
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

function getChordLabels(notes: Note[]): Chord[] {
    const uniqueNotes = Array.from(new Set(notes));
    const candidateRootNotes = uniqueNotes;
    const chords = candidateRootNotes
        .map((rootNote) => {
            const potentialThird = _getPotentialThird(rootNote, uniqueNotes);

            return uniqueNotes.map((currentBassNote, position) => {
                const basslessChordNotes = uniqueNotes.filter(
                    (note) => note !== currentBassNote
                );
                const inversion =
                    position === 0
                        ? "root"
                        : position === 1
                        ? "first"
                        : position === 2
                        ? "second"
                        : "third";

                const chord: Chord = {
                    root: rootNote,
                    chordTones: [currentBassNote, ...basslessChordNotes],
                    inversion: inversion,
                    quality: _getChordQuality(rootNote, potentialThird),
                };
                return chord;
            });
        })
        .flat();

    return chords;
}

function _getChordQuality(root: Note, potentialThird: Note) {
    switch (getInterval(root, potentialThird)) {
        case Intervals.majorThird:
            return "major";

        case Intervals.minorThird:
            return "minor";

        case Intervals.majorSecond:
            return "suspended second";

        case Intervals.perfectFourth:
            return "suspended fourth";

        default:
            return null;
    }
}

function _getPotentialThird(root: Note, chordTones: Note[]): Note {
    const rootlessChordTones = chordTones.filter((note) => note !== root);
    return rootlessChordTones.reduce(
        (closestTone, chordTone) =>
            getInterval(root, chordTone).semitoneDistance <
            getInterval(root, closestTone).semitoneDistance
                ? chordTone
                : closestTone,
        rootlessChordTones[0]
    );
}

export {
    Notes,
    Scale,
    Intervals,
    getEnharmonicsFromInterval,
    getInterval,
    getScaleTones,
    getChordLabels,
};

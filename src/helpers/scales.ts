import { Interval, Note } from "./types";
import { Intervals } from "./intervals";
import { Notes } from "./notes";

const validKeySignatures: Note[] = [
    // 6 flats
    Notes.GFlat,
    // 5 flats
    Notes.DFlat,
    // 4 flats
    Notes.AFlat,
    // 3 flats
    Notes.EFlat,
    // 2 flats
    Notes.BFlat,
    // 1 flat
    Notes.F,
    // 0 flats/sharps
    Notes.C,
    // 1 sharp
    Notes.G,
    // 2 sharps
    Notes.D,
    // 3 sharps
    Notes.A,
    // 4 sharps
    Notes.E,
    // 5 sharps
    Notes.B,
    // 6 sharps
    Notes.FSharp,
];

const Ionian: Interval[] = [
    Intervals.perfectUnison,
    Intervals.majorSecond,
    Intervals.majorThird,
    Intervals.perfectFourth,
    Intervals.perfectFifth,
    Intervals.majorSixth,
    Intervals.majorSeventh,
];

const Dorian: Interval[] = [
    Intervals.perfectUnison,
    Intervals.majorSecond,
    Intervals.minorThird,
    Intervals.perfectFourth,
    Intervals.perfectFifth,
    Intervals.majorSixth,
    Intervals.minorSeventh,
];

const Phrygian: Interval[] = [
    Intervals.perfectUnison,
    Intervals.minorSecond,
    Intervals.minorThird,
    Intervals.perfectFourth,
    Intervals.perfectFifth,
    Intervals.minorSixth,
    Intervals.minorSeventh,
];

const Lydian: Interval[] = [
    Intervals.perfectUnison,
    Intervals.majorSecond,
    Intervals.majorThird,
    Intervals.tritoneAugmented,
    Intervals.perfectFifth,
    Intervals.majorSixth,
    Intervals.majorSeventh,
];

const Mixolydian: Interval[] = [
    Intervals.perfectUnison,
    Intervals.majorSecond,
    Intervals.majorThird,
    Intervals.perfectFourth,
    Intervals.perfectFifth,
    Intervals.majorSixth,
    Intervals.minorSeventh,
];

const Aeolian: Interval[] = [
    Intervals.perfectUnison,
    Intervals.majorSecond,
    Intervals.minorThird,
    Intervals.perfectFourth,
    Intervals.perfectFifth,
    Intervals.minorSixth,
    Intervals.minorSeventh,
];

const Locrian: Interval[] = [
    Intervals.perfectUnison,
    Intervals.minorSecond,
    Intervals.minorThird,
    Intervals.perfectFourth,
    Intervals.tritoneDiminished,
    Intervals.minorSixth,
    Intervals.minorSeventh,
];

const Scale = {
    Ionian,
    Dorian,
    Phrygian,
    Lydian,
    Mixolydian,
    Aeolian,
    Locrian,
};

export { Scale, validKeySignatures };

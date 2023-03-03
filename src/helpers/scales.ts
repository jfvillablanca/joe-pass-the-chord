import { Interval } from "./types";
import { Intervals } from "./intervals";

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

export { Scale };

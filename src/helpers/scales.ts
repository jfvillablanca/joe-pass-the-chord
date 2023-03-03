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

const Scale = {
    Ionian,
    Dorian,
};
export { Scale };

import { Interval } from "./types"
import { Intervals } from "./intervals"

const Ionian: Interval[] = [
    Intervals.perfectUnison,
    Intervals.majorSecond,
    Intervals.majorThird,
    Intervals.perfectFourth,
    Intervals.perfectFifth,
    Intervals.majorSixth,
    Intervals.majorSeventh,
];

const Scale = {
    Ionian,
}

export { Scale }

import { describe, test, expect } from "vitest";
import { getNoteFromInterval, Notes, Intervals } from "../helpers/main";

describe("Interval tests", () => {
    test("returns the correct note when interval is ascending", () => {
        expect(
            getNoteFromInterval(Notes.C, Intervals.majorSixth, "ascending")
        ).toBe(Notes.A);

        expect(
            getNoteFromInterval(
                Notes.ASharp,
                Intervals.majorSecond,
                "ascending"
            )
        ).toBe(Notes.BSharp);

    });

    test("returns the correct note when interval is ascending", () => {
        expect(
            getNoteFromInterval(Notes.D, Intervals.majorSecond, "descending")
        ).toBe(Notes.C);
    });
});

describe.todo("Scale tests", () => {});

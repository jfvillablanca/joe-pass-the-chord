import { describe, test, expect } from "vitest";
import { getNoteFromInterval, Notes, Intervals } from "../helpers/main";

describe("Interval tests", () => {
    test("returns the correct note when interval is ascending", () => {
        expect(
            getNoteFromInterval(Notes.C, Intervals.majorSixth, "ascending")
        ).toContain(Notes.A);
    });

    test("returns the proper enharmonic spelling for sharps", () => {
        expect(
            getNoteFromInterval(
                Notes.ASharp,
                Intervals.majorSecond,
                "ascending"
            )
        ).toContain(Notes.BSharp);
    });

    });

    test("returns the correct note when interval is descending", () => {
        expect(
            getNoteFromInterval(Notes.D, Intervals.majorSecond, "descending")
        ).toContain(Notes.C);
    });
});

describe.todo("Scale tests", () => {});

import { describe, test, expect } from "vitest";
import { getNoteFromInterval, Notes, Intervals } from "../helpers/main";

describe("Interval tests", () => {
    test("returns a correct note when interval is ascending", () => {
        expect(
            getNoteFromInterval(Notes.C, Intervals.majorSixth, "ascending")
        ).toContain(Notes.A);
    });

    test("returns a correct note for ascending intervals involving sharps", () => {
        expect(
            getNoteFromInterval(Notes.C, Intervals.minorSecond, "ascending")
        ).toContain(Notes.CSharp);

        expect(
            getNoteFromInterval(
                Notes.ASharp,
                Intervals.majorSecond,
                "ascending"
            )
        ).toContain(Notes.BSharp);
    });

    test("returns a correct note for ascending intervals involving flat", () => {
        expect(
            getNoteFromInterval(
                Notes.EFlat,
                Intervals.perfectOctave,
                "ascending"
            )
        ).toContain(Notes.EFlat);
    });

    test("returns the correct note when interval is descending", () => {
        expect(
            getNoteFromInterval(Notes.D, Intervals.majorSecond, "descending")
        ).toContain(Notes.C);

        expect(
            getNoteFromInterval(Notes.C, Intervals.minorThird, "descending")
        ).toContain(Notes.A);
    });
});

describe.todo("Scale tests", () => {});

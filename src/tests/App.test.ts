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

    test("returns the proper enharmonic spelling for flats", () => {
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

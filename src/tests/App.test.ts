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

        expect(
            getNoteFromInterval(Notes.G, Intervals.majorSeventh, "ascending")
        ).toContain(Notes.FSharp);

        expect(
            getNoteFromInterval(
                Notes.FSharp,
                Intervals.perfectFifth,
                "ascending"
            )
        ).toContain(Notes.CSharp);
    });

    test("returns a correct note for ascending intervals involving flat", () => {
        expect(
            getNoteFromInterval(
                Notes.EFlat,
                Intervals.perfectOctave,
                "ascending"
            )
        ).toContain(Notes.EFlat);

        expect(
            getNoteFromInterval(
                Notes.GFlat,
                Intervals.perfectFifth,
                "ascending"
            )
        ).toContain(Notes.DFlat);
    });

    test("returns the correct note when interval is descending", () => {
        expect(
            getNoteFromInterval(Notes.D, Intervals.majorSecond, "descending")
        ).toContain(Notes.C);

        expect(
            getNoteFromInterval(Notes.C, Intervals.minorThird, "descending")
        ).toContain(Notes.A);
    });

    test("returns a correct note for descending intervals involving sharps", () => {
        expect(
            getNoteFromInterval(
                Notes.FSharp,
                Intervals.perfectFifth,
                "descending"
            )
        ).toContain(Notes.B);
    });

    test("returns a correct note for descending intervals involving flats", () => {
        expect(
            getNoteFromInterval(
                Notes.GFlat,
                Intervals.tritoneDiminished,
                "descending"
            )
        ).toContain(Notes.C);
    });
});

describe.todo("Scale tests", () => {});

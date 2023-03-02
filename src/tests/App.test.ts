import { describe, test, expect } from "vitest";
import { getEnharmonicsFromInterval, Notes, Intervals } from "../helpers/main";

describe("Interval tests", () => {
    test("returns a correct note when interval is ascending", () => {
        expect(
            getEnharmonicsFromInterval(
                Notes.C,
                Intervals.majorSixth,
                "ascending"
            )
        ).toContain(Notes.A);
    });

    test("returns a correct note for ascending intervals involving sharps", () => {
        expect(
            getEnharmonicsFromInterval(
                Notes.C,
                Intervals.minorSecond,
                "ascending"
            )
        ).toContain(Notes.CSharp);

        expect(
            getEnharmonicsFromInterval(
                Notes.ASharp,
                Intervals.majorSecond,
                "ascending"
            )
        ).toContain(Notes.BSharp);

        expect(
            getEnharmonicsFromInterval(
                Notes.G,
                Intervals.majorSeventh,
                "ascending"
            )
        ).toContain(Notes.FSharp);

        expect(
            getEnharmonicsFromInterval(
                Notes.FSharp,
                Intervals.perfectFifth,
                "ascending"
            )
        ).toContain(Notes.CSharp);
    });

    test("returns a correct note for ascending intervals involving flat", () => {
        expect(
            getEnharmonicsFromInterval(
                Notes.EFlat,
                Intervals.perfectOctave,
                "ascending"
            )
        ).toContain(Notes.EFlat);

        expect(
            getEnharmonicsFromInterval(
                Notes.GFlat,
                Intervals.perfectFifth,
                "ascending"
            )
        ).toContain(Notes.DFlat);
    });

    test("returns the correct note when interval is descending", () => {
        expect(
            getEnharmonicsFromInterval(
                Notes.D,
                Intervals.majorSecond,
                "descending"
            )
        ).toContain(Notes.C);

        expect(
            getEnharmonicsFromInterval(
                Notes.C,
                Intervals.minorThird,
                "descending"
            )
        ).toContain(Notes.A);
    });

    test("returns a correct note for descending intervals involving sharps", () => {
        expect(
            getEnharmonicsFromInterval(
                Notes.FSharp,
                Intervals.perfectFifth,
                "descending"
            )
        ).toContain(Notes.B);
    });

    test("returns a correct note for descending intervals involving flats", () => {
        expect(
            getEnharmonicsFromInterval(
                Notes.GFlat,
                Intervals.tritoneDiminished,
                "descending"
            )
        ).toContain(Notes.C);
    });
});

describe.todo("Scale tests", () => {});

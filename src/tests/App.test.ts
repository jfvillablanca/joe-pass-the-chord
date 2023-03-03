import { describe, test, expect } from "vitest";
import {
    getScaleTones,
    getEnharmonicsFromInterval,
    Notes as N,
    Intervals as I,
    Scale as S,
} from "../helpers/main";

describe("Interval tests", () => {
    test("returns a correct note when interval is ascending", () => {
        expect(
            getEnharmonicsFromInterval(N.C, I.majorSixth, "ascending")
        ).toContain(N.A);
    });

    test("returns a correct note for ascending intervals involving sharps", () => {
        expect(
            getEnharmonicsFromInterval(N.C, I.minorSecond, "ascending")
        ).toContain(N.CSharp);

        expect(
            getEnharmonicsFromInterval(N.ASharp, I.majorSecond, "ascending")
        ).toContain(N.BSharp);

        expect(
            getEnharmonicsFromInterval(N.G, I.majorSeventh, "ascending")
        ).toContain(N.FSharp);

        expect(
            getEnharmonicsFromInterval(N.FSharp, I.perfectFifth, "ascending")
        ).toContain(N.CSharp);
    });

    test("returns a correct note for ascending intervals involving flat", () => {
        expect(
            getEnharmonicsFromInterval(N.EFlat, I.perfectOctave, "ascending")
        ).toContain(N.EFlat);

        expect(
            getEnharmonicsFromInterval(N.GFlat, I.perfectFifth, "ascending")
        ).toContain(N.DFlat);
    });

    test("returns the correct note when interval is descending", () => {
        expect(
            getEnharmonicsFromInterval(N.D, I.majorSecond, "descending")
        ).toContain(N.C);

        expect(
            getEnharmonicsFromInterval(N.C, I.minorThird, "descending")
        ).toContain(N.A);
    });

    test("returns a correct note for descending intervals involving sharps", () => {
        expect(
            getEnharmonicsFromInterval(N.FSharp, I.perfectFifth, "descending")
        ).toContain(N.B);
    });

    test("returns a correct note for descending intervals involving flats", () => {
        expect(
            getEnharmonicsFromInterval(
                N.GFlat,
                I.tritoneDiminished,
                "descending"
            )
        ).toContain(N.C);
    });
});

describe("Scale tests", () => {
    test("returns the notes of the Ionian mode in the key of C", () => {
        const ionianMode = [N.C, N.D, N.E, N.F, N.G, N.A, N.B];
        expect(getScaleTones(N.C, S.Ionian)).toStrictEqual(ionianMode);
    });

    test("returns the notes of the Ionian mode in the key of F#", () => {
        const ionianMode = [
            N.FSharp,
            N.GSharp,
            N.ASharp,
            N.B,
            N.CSharp,
            N.DSharp,
            N.ESharp,
        ];
        expect(getScaleTones(N.FSharp, S.Ionian)).toStrictEqual(ionianMode);
    });

});

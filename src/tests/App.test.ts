import { describe, test, expect, vi } from "vitest";
import {
    getScaleTones,
    getEnharmonicsFromInterval,
    Notes as N,
    Intervals as I,
    Scale as S,
    getInterval,
    getChordLabels,
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

    test("returns the correct interval when higher note has higher distance from C natural", () => {
        const hiNote = N.D;
        const loNote = N.C;

        expect(getInterval(loNote, hiNote)).toBe(I.majorSecond);
    });

    test("returns the correct interval when lower note has higher distance from C natural", () => {
        const hiNote = N.C;
        const loNote = N.D;

        expect(getInterval(loNote, hiNote)).toBe(I.minorSeventh);
    });

    test("returns perfect unison interval if the two notes are the same", () => {
        const hiNote = N.C;
        const loNote = N.C;

        expect(getInterval(loNote, hiNote)).toBe(I.perfectUnison);
    });
});

describe("Scale tests", () => {
    describe("Ionian mode", () => {
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

        test("returns the notes of the Ionian mode in the key of Ab", () => {
            const ionianMode = [
                N.AFlat,
                N.BFlat,
                N.C,
                N.DFlat,
                N.EFlat,
                N.F,
                N.G,
            ];
            expect(getScaleTones(N.AFlat, S.Ionian)).toStrictEqual(ionianMode);
        });

        test("returns the notes of the Ionian mode in the key of Gb", () => {
            const ionianMode = [
                N.GFlat,
                N.AFlat,
                N.BFlat,
                N.CFlat,
                N.DFlat,
                N.EFlat,
                N.F,
            ];
            expect(getScaleTones(N.GFlat, S.Ionian)).toStrictEqual(ionianMode);
        });

        test("returns the Db scale notes if the key is C# (7 sharps)", () => {
            const spy = vi.spyOn(console, "log");
            const ionianMode = [
                N.DFlat,
                N.EFlat,
                N.F,
                N.GFlat,
                N.AFlat,
                N.BFlat,
                N.C,
            ];
            const tonic = N.CSharp;
            const adjustedTonic = ionianMode[0];
            expect(getScaleTones(tonic, S.Ionian)).toStrictEqual(ionianMode);
            expect(spy).toHaveBeenCalledWith(
                `The key signature ${tonic.name} has been adjusted to the key of ${adjustedTonic.name}`
            );

            spy.mockRestore();
        });

        test("returns the B scale notes if the key is Cb (7 flats)", () => {
            const spy = vi.spyOn(console, "log");
            const ionianMode = [
                N.B,
                N.CSharp,
                N.DSharp,
                N.E,
                N.FSharp,
                N.GSharp,
                N.ASharp,
            ];
            const tonic = N.CFlat;
            const adjustedTonic = ionianMode[0];
            expect(getScaleTones(tonic, S.Ionian)).toStrictEqual(ionianMode);
            expect(spy).toHaveBeenCalledWith(
                `The key signature ${tonic.name} has been adjusted to the key of ${adjustedTonic.name}`
            );

            spy.mockRestore();
        });
    });

    describe("Dorian mode", () => {
        test("returns the notes of the Dorian mode in the key of D", () => {
            const dorianMode = [N.D, N.E, N.F, N.G, N.A, N.B, N.C];
            expect(getScaleTones(N.D, S.Dorian)).toStrictEqual(dorianMode);
        });
    });

    describe("Phrygian mode", () => {
        test("returns the notes of the Phrygian mode in the key of E", () => {
            const phrygianMode = [N.E, N.F, N.G, N.A, N.B, N.C, N.D];
            expect(getScaleTones(N.E, S.Phrygian)).toStrictEqual(phrygianMode);
        });
    });

    describe("Lydian mode", () => {
        test("returns the notes of the Lydian mode in the key of F", () => {
            const lydianMode = [N.F, N.G, N.A, N.B, N.C, N.D, N.E];
            expect(getScaleTones(N.F, S.Lydian)).toStrictEqual(lydianMode);
        });
    });

    describe("Mixolydian mode", () => {
        test("returns the notes of the Mixolydian mode in the key of G", () => {
            const mixolydianMode = [N.G, N.A, N.B, N.C, N.D, N.E, N.F];
            expect(getScaleTones(N.G, S.Mixolydian)).toStrictEqual(
                mixolydianMode
            );
        });
    });

    describe("Aeolian mode", () => {
        test("returns the notes of the Aeolian mode in the key of A", () => {
            const aeolianMode = [N.A, N.B, N.C, N.D, N.E, N.F, N.G];
            expect(getScaleTones(N.A, S.Aeolian)).toStrictEqual(aeolianMode);
        });
    });

    describe("Locrian mode", () => {
        test("returns the notes of the Locrian mode in the key of B", () => {
            const locrianMode = [N.B, N.C, N.D, N.E, N.F, N.G, N.A];
            expect(getScaleTones(N.B, S.Locrian)).toStrictEqual(locrianMode);
        });
    });
});

describe("Chord tests", () => {
    describe("Triads", () => {
        test("should return unique pitch classes from an array of notes", () => {
            const cShapeCowboyChord = [N.C, N.E, N.G, N.C, N.E];
            const cMajorRoot = [N.C, N.E, N.G];

            expect(
                getChordLabels(cShapeCowboyChord).map(
                    (chord) => chord.chordTones
                )
            ).toContainEqual(cMajorRoot);
        });
    });
});

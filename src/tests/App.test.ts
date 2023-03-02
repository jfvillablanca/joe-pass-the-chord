import { describe, test, expect } from "vitest";
import { getNoteFromInterval, Notes, Intervals } from "../helpers/main";

describe("Interval tests", () => {
    test("returns the correct note in ascending interval", () => {
        const targetNote = getNoteFromInterval(
            Notes.C,
            Intervals.majorSixth,
            "ascending"
        );

        expect(targetNote).toBe(Notes.A);
    });
});

describe.todo("Scale tests", () => {

})

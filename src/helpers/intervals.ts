import { Interval } from "./types"

const perfectUnison: Interval = {
    semitoneDistance: 0,
    quality: { name: "Perfect unison", shortName: "P1" },
    spicyQuality: { name: "Diminished second", shortName: "d2" },
    // NOTE: No compoundQuality since an octave above unison is just the perfect octave
    compoundSpicyQuality: { name: "Diminished ninth", shortName: "d9" },
};

const minorSecond: Interval = {
    semitoneDistance: 1,
    quality: { name: "Minor second", shortName: "m2" },
    spicyQuality: { name: "Augmented unison", shortName: "A1" },
    compoundQuality: { name: "Minor ninth", shortName: "m9" },
    compoundSpicyQuality: { name: "Augmented octave", shortName: "A8" },
};

const majorSecond: Interval = {
    semitoneDistance: 2,
    quality: { name: "Major second", shortName: "M2" },
    spicyQuality: { name: "Diminished third", shortName: "d3" },
    compoundQuality: { name: "Major ninth", shortName: "M9" },
    compoundSpicyQuality: { name: "Diminished tenth", shortName: "d10" },
};

const minorThird: Interval = {
    semitoneDistance: 3,
    quality: { name: "Minor third", shortName: "m3" },
    spicyQuality: { name: "Augmented second", shortName: "A2" },
    compoundQuality: { name: "Minor tenth", shortName: "m10" },
    compoundSpicyQuality: { name: "Augmented ninth", shortName: "A9" },
};

const majorThird: Interval = {
    semitoneDistance: 4,
    quality: { name: "Major third", shortName: "M3" },
    spicyQuality: { name: "Diminished fourth", shortName: "d4" },
    compoundQuality: { name: "Major tenth", shortName: "M10" },
    compoundSpicyQuality: { name: "Diminished eleventh", shortName: "d11" },
};

const perfectFourth: Interval = {
    semitoneDistance: 5,
    quality: { name: "Perfect fourth", shortName: "P4" },
    spicyQuality: { name: "Augmented third", shortName: "A3" },
    compoundQuality: { name: "Perfect eleventh", shortName: "P11" },
    compoundSpicyQuality: { name: "Diminished tenth", shortName: "d10" },
};

const tritoneDiminished: Interval = {
    semitoneDistance: 6,
    quality: { name: "Tritone", shortName: "TT" },
    spicyQuality: { name: "Diminished fifth", shortName: "d5" },
    // NOTE: Tritone is just tritone, okay?
    compoundSpicyQuality: { name: "Diminished twelfth", shortName: "d12" },
};

const tritoneAugmented: Interval = {
    semitoneDistance: 6,
    quality: { name: "Tritone", shortName: "TT" },
    spicyQuality: { name: "Augmented fourth", shortName: "A4" },
    // NOTE: Tritone is just tritone, okay?
    compoundSpicyQuality: { name: "Augmented eleventh", shortName: "A11" },
};

const perfectFifth: Interval = {
    semitoneDistance: 7,
    quality: { name: "Perfect fifth", shortName: "P5" },
    spicyQuality: { name: "Diminished sixth", shortName: "d6" },
    compoundQuality: { name: "Perfect twelfth", shortName: "P12" },
    compoundSpicyQuality: { name: "Diminished thirteenth", shortName: "d13" },
};

const minorSixth: Interval = {
    semitoneDistance: 8,
    quality: { name: "Minor sixth", shortName: "m6" },
    spicyQuality: { name: "Augmented fifth", shortName: "A5" },
    compoundQuality: { name: "Minor thirteenth", shortName: "m13" },
    compoundSpicyQuality: { name: "Augmented twelfth", shortName: "A12" },
};

const majorSixth: Interval = {
    semitoneDistance: 9,
    quality: { name: "Major sixth", shortName: "M6" },
    spicyQuality: { name: "Diminished seventh", shortName: "d7" },
    compoundQuality: { name: "Major thirteenth", shortName: "M13" },
    compoundSpicyQuality: { name: "Diminished fourteenth", shortName: "d14" },
};

const minorSeventh: Interval = {
    semitoneDistance: 10,
    quality: { name: "Minor seventh", shortName: "m7" },
    spicyQuality: { name: "Augmented sixth", shortName: "A6" },
    compoundQuality: { name: "Minor fourteenth", shortName: "m14" },
    compoundSpicyQuality: { name: "Augmented thirteenth", shortName: "A13" },
};

const majorSeventh: Interval = {
    semitoneDistance: 11,
    quality: { name: "Major seventh", shortName: "M7" },
    spicyQuality: { name: "Diminished octave", shortName: "d8" },
    compoundQuality: { name: "Major fourteenth", shortName: "M14" },
    compoundSpicyQuality: { name: "Diminished fifteenth", shortName: "d15" },
};

const perfectOctave: Interval = {
    semitoneDistance: 12,
    quality: { name: "Perfect octave", shortName: "P8" },
    spicyQuality: { name: "Augmented seventh", shortName: "A7" },
    compoundQuality: { name: "Double octave", shortName: "P15" },
    compoundSpicyQuality: { name: "Augmented fourteenth", shortName: "A14" },
};

const Intervals = {
    perfectUnison,
    minorSecond,
    majorSecond,
    minorThird,
    majorThird,
    perfectFourth,
    tritoneDiminished,
    tritoneAugmented,
    perfectFifth,
    minorSixth,
    majorSixth,
    minorSeventh,
    majorSeventh,
    perfectOctave,
};

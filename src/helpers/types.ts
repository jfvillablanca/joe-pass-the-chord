type NoteName =
    | "C"
    | "C flat"
    | "C sharp"
    | "D"
    | "D flat"
    | "D sharp"
    | "E"
    | "E flat"
    | "E sharp"
    | "F"
    | "F flat"
    | "F sharp"
    | "G"
    | "G flat"
    | "G sharp"
    | "A"
    | "A flat"
    | "A sharp"
    | "B"
    | "B flat"
    | "B sharp";

type NoteSpelling =
    | "C♮"
    | "C♭"
    | "C♯"
    | "D♮"
    | "D♭"
    | "D♯"
    | "E♮"
    | "E♭"
    | "E♯"
    | "F♮"
    | "F♭"
    | "F♯"
    | "G♮"
    | "G♭"
    | "G♯"
    | "A♮"
    | "A♭"
    | "A♯"
    | "B♮"
    | "B♭"
    | "B♯";

type NoteDistanceFromCNatural =
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12;

type Note = {
    name: NoteName;
    spelling: NoteSpelling;
    distanceFromCNatural: NoteDistanceFromCNatural;
    relativeOctave?: number;
};

type QualityName =
    | "Perfect unison"
    | "Minor second"
    | "Major second"
    | "Minor third"
    | "Major third"
    | "Perfect fourth"
    | "Tritone"
    | "Perfect fifth"
    | "Minor sixth"
    | "Major sixth"
    | "Minor seventh"
    | "Major seventh"
    | "Perfect octave";

type QualityNameShort =
    | "P1"
    | "m2"
    | "M2"
    | "m3"
    | "M3"
    | "P4"
    | "TT"
    | "P5"
    | "m6"
    | "M6"
    | "m7"
    | "M7"
    | "P8";

type SpicyQualityName =
    | "Diminished second"
    | "Augmented unison"
    | "Diminished third"
    | "Augmented second"
    | "Diminished fourth"
    | "Augmented third"
    | "Diminished fifth"
    | "Augmented fourth"
    | "Diminished sixth"
    | "Augmented fifth"
    | "Diminished seventh"
    | "Augmented sixth"
    | "Diminished octave"
    | "Augmented seventh";

type SpicyQualityNameShort =
    | "d2"
    | "A1"
    | "d3"
    | "A2"
    | "d4"
    | "A3"
    | "d5"
    | "A4"
    | "d6"
    | "A5"
    | "d7"
    | "A6"
    | "d8"
    | "A7";

type CompoundQualityName =
    // | "Perfect octave"
    | "Minor ninth"
    | "Major ninth"
    | "Minor tenth"
    | "Major tenth"
    | "Perfect eleventh"
    // | "Tritone"
    | "Perfect twelfth"
    | "Minor thirteenth"
    | "Major thirteenth"
    | "Minor fourteenth"
    | "Major fourteenth"
    | "Double octave";

type CompoundQualityNameShort =
    // | "P8"
    | "m9"
    | "M9"
    | "m10"
    | "M10"
    | "P11"
    // | "TT"
    | "P12"
    | "m13"
    | "M13"
    | "m14"
    | "M14"
    | "P15";

type CompoundSpicyQualityName =
    | "Diminished ninth"
    | "Augmented octave"
    | "Diminished tenth"
    | "Augmented ninth"
    | "Diminished eleventh"
    | "Augmented tenth"
    | "Diminished twelfth"
    | "Augmented eleventh"
    | "Diminished thirteenth"
    | "Augmented twelfth"
    | "Diminished fourteenth"
    | "Augmented thirteenth"
    | "Diminished fifteenth"
    | "Augmented fourteenth";

type CompoundSpicyQualityNameShort =
    | "d9"
    | "A8"
    | "d10"
    | "A9"
    | "d11"
    | "A10"
    | "d12"
    | "A11"
    | "d13"
    | "A12"
    | "d14"
    | "A13"
    | "d15"
    | "A14";

type Quality = { name: QualityName; shortName: QualityNameShort };

type SpicyQuality = {
    name: SpicyQualityName;
    shortName: SpicyQualityNameShort;
};

type CompoundQuality = {
    name: CompoundQualityName;
    shortName: CompoundQualityNameShort;
};

type CompoundSpicyQuality = {
    name: CompoundSpicyQualityName;
    shortName: CompoundSpicyQualityNameShort;
};

type Interval = {
    semitoneDistance: number;
    quality: Quality;
    spicyQuality: SpicyQuality;
    compoundQuality?: CompoundQuality;
    compoundSpicyQuality: CompoundSpicyQuality;
};

type ChordQuality = "major" | "minor" | "suspended second" | "suspended fourth"

type Inversion = "root" | "first" | "second" | "third";

type Chord = {
    root: Note;
    chordTones: Note[];
    inversion: Inversion;
    quality?: ChordQuality | null;
}

export type { Note, Interval, Chord };

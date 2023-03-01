export {  };
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

type NoteIntervalFromCNatural =
    | -1
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
    intervalFromCNatural: NoteIntervalFromCNatural;
    relativeOctave?: number;
};

const C: Note = {
    name: "C",
    spelling: "C♮",
    intervalFromCNatural: 0,
};

const CSharp: Note = {
    name: "C sharp",
    spelling: "C♯",
    intervalFromCNatural: 1,
};

const CFlat: Note = {
    name: "C flat",
    spelling: "C♭",
    intervalFromCNatural: -1,
};

const D: Note = {
    name: "D",
    spelling: "D♮",
    intervalFromCNatural: 2,
};

const DSharp: Note = {
    name: "D sharp",
    spelling: "D♯",
    intervalFromCNatural: 3,
};

const DFlat: Note = {
    name: "D flat",
    spelling: "D♭",
    intervalFromCNatural: 1,
};

const E: Note = {
    name: "E",
    spelling: "E♮",
    intervalFromCNatural: 4,
};

const ESharp: Note = {
    name: "E sharp",
    spelling: "E♯",
    intervalFromCNatural: 5,
};

const EFlat: Note = {
    name: "E flat",
    spelling: "E♭",
    intervalFromCNatural: 3,
};

const F: Note = {
    name: "F",
    spelling: "F♮",
    intervalFromCNatural: 5,
};

const FSharp: Note = {
    name: "F sharp",
    spelling: "F♯",
    intervalFromCNatural: 6,
};

const FFlat: Note = {
    name: "F flat",
    spelling: "F♭",
    intervalFromCNatural: 4,
};

const G: Note = {
    name: "G",
    spelling: "G♮",
    intervalFromCNatural: 7,
};

const GSharp: Note = {
    name: "G sharp",
    spelling: "G♯",
    intervalFromCNatural: 8,
};

const GFlat: Note = {
    name: "G flat",
    spelling: "G♭",
    intervalFromCNatural: 6,
};

const A: Note = {
    name: "A",
    spelling: "A♮",
    intervalFromCNatural: 9,
};

const ASharp: Note = {
    name: "A sharp",
    spelling: "A♯",
    intervalFromCNatural: 10,
};

const AFlat: Note = {
    name: "A flat",
    spelling: "A♭",
    intervalFromCNatural: 8,
};

const B: Note = {
    name: "B",
    spelling: "B♮",
    intervalFromCNatural: 11,
};

const BSharp: Note = {
    name: "B sharp",
    spelling: "B♯",
    intervalFromCNatural: 12,
};

const BFlat: Note = {
    name: "B flat",
    spelling: "B♭",
    intervalFromCNatural: 10,
};

import { Note } from "./types";

const CHROMATIC_SCALE_LENGTH = 12;

const C: Note = {
    name: "C",
    spelling: "C♮",
    distanceFromCNatural: 0,
};

const CSharp: Note = {
    name: "C sharp",
    spelling: "C♯",
    distanceFromCNatural: 1,
};

const CFlat: Note = {
    name: "C flat",
    spelling: "C♭",
    distanceFromCNatural: 11,
};

const D: Note = {
    name: "D",
    spelling: "D♮",
    distanceFromCNatural: 2,
};

const DSharp: Note = {
    name: "D sharp",
    spelling: "D♯",
    distanceFromCNatural: 3,
};

const DFlat: Note = {
    name: "D flat",
    spelling: "D♭",
    distanceFromCNatural: 1,
};

const E: Note = {
    name: "E",
    spelling: "E♮",
    distanceFromCNatural: 4,
};

const ESharp: Note = {
    name: "E sharp",
    spelling: "E♯",
    distanceFromCNatural: 5,
};

const EFlat: Note = {
    name: "E flat",
    spelling: "E♭",
    distanceFromCNatural: 3,
};

const F: Note = {
    name: "F",
    spelling: "F♮",
    distanceFromCNatural: 5,
};

const FSharp: Note = {
    name: "F sharp",
    spelling: "F♯",
    distanceFromCNatural: 6,
};

const FFlat: Note = {
    name: "F flat",
    spelling: "F♭",
    distanceFromCNatural: 4,
};

const G: Note = {
    name: "G",
    spelling: "G♮",
    distanceFromCNatural: 7,
};

const GSharp: Note = {
    name: "G sharp",
    spelling: "G♯",
    distanceFromCNatural: 8,
};

const GFlat: Note = {
    name: "G flat",
    spelling: "G♭",
    distanceFromCNatural: 6,
};

const A: Note = {
    name: "A",
    spelling: "A♮",
    distanceFromCNatural: 9,
};

const ASharp: Note = {
    name: "A sharp",
    spelling: "A♯",
    distanceFromCNatural: 10,
};

const AFlat: Note = {
    name: "A flat",
    spelling: "A♭",
    distanceFromCNatural: 8,
};

const B: Note = {
    name: "B",
    spelling: "B♮",
    distanceFromCNatural: 11,
};

const BSharp: Note = {
    name: "B sharp",
    spelling: "B♯",
    distanceFromCNatural: 12,
};

const BFlat: Note = {
    name: "B flat",
    spelling: "B♭",
    distanceFromCNatural: 10,
};

const Notes = {
    C,
    CSharp,
    CFlat,
    D,
    DSharp,
    DFlat,
    E,
    ESharp,
    EFlat,
    F,
    FSharp,
    FFlat,
    G,
    GSharp,
    GFlat,
    A,
    ASharp,
    AFlat,
    B,
    BSharp,
    BFlat,
};

export { Notes, CHROMATIC_SCALE_LENGTH };

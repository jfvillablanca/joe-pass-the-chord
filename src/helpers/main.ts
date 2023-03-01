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

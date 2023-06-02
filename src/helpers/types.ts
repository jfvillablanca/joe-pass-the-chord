export type Context = {
    tuning: number[];
    strings: number[];
    setStrings: React.Dispatch<React.SetStateAction<number[]>>;
    frets: { from: number; amount: number };
    lefty: boolean;
    fretOffset: number;
    setFretOffset: React.Dispatch<React.SetStateAction<number>>;
};

export type ArrowDirection = "left" | "right";

export type OffsetDirection = "up" | "down";

export type FingeredNotes = {
    noteNames: string[][];
    chordNames: string[][];
};

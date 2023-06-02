export type Context = {
    tuning: number[];
    frets: { from: number; amount: number };
    lefty: boolean;
};

export type StateContextType = {
    strings: number[];
    setStrings: React.Dispatch<React.SetStateAction<number[]>>;
    fretOffset: number;
    setFretOffset: React.Dispatch<React.SetStateAction<number>>;
};

export type ArrowDirection = "left" | "right";

export type OffsetDirection = "up" | "down";

export type FingeredNotes = {
    noteNames: string[][];
    chordNames: string[][];
};

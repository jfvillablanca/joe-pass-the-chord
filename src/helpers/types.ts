export type FretboardContextType = {
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

export type ArrowDirectionType = "left" | "right";

export type OffsetDirectionType = "up" | "down";

export type FingeredNotesType = {
    noteNames: string[][];
    chordNames: string[][];
};

export type FretCell = {
    note: string;
    string: number;
    fret: number;
};

export type FingeredFret = "muted" | { note: string, relativeFret: number };

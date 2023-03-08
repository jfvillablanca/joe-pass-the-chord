export type FretCell = {
    note: string;
    string: number;
    absoluteFret: number;
};

export type FingeredFret = "muted" | { note: string, relativeFret: number };

export type Context = {
    strings: number[];
    setStrings: React.Dispatch<React.SetStateAction<number[]>>;
    frets: { from: number; amount: number };
    handleFretOffsetAdjust: (offsetDirection: OffsetDirection) => void;
};

export type ArrowDirection = "left" | "right";

export type OffsetDirection = "up" | "down";

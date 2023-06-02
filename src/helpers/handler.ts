import { DISPLAYED_FRETS, LOWER_FRET_LIMIT, UPPER_FRET_LIMIT } from "./compute";
import { OffsetDirection, StateContextType } from "./types";

const adjustUpperFretLimit = UPPER_FRET_LIMIT - DISPLAYED_FRETS + 1;

const handleFretOffsetAdjust =
    (stateContext: StateContextType) => (offsetDirection: OffsetDirection) => {
        const { fretOffset, setFretOffset } = stateContext;
        const [raisedFret, loweredFret] = [fretOffset + 1, fretOffset - 1];
        switch (offsetDirection) {
            case "up":
                if (raisedFret <= adjustUpperFretLimit) {
                    setFretOffset(() => raisedFret);
                }
                break;
            case "down":
                if (loweredFret >= LOWER_FRET_LIMIT) {
                    setFretOffset(() => loweredFret);
                }
                break;
        }
    };

export { handleFretOffsetAdjust };
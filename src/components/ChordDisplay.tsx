import { useChordTonesContext } from "../helpers/contexthooks";
import { detect } from "@tonaljs/chord-detect";

export default function ChordDisplay() {
    const chordPredictions = detect(useChordTonesContext(), {
        assumePerfectFifth: true,
    });
    return <div>{chordPredictions[0]}</div>;
}

import { nanoid } from "nanoid";
import { FretCell } from "../helpers/types";
import {
    useFingeredFretContext,
    useFretClickContext,
    useRenderedFretsContext,
    useTuningContext,
} from "../helpers/contexthooks";

function Fretboard() {
    const fretsToRender = useRenderedFretsContext();
    const fingeredFrets = useFingeredFretContext();
    const tuning = useTuningContext();
    const notesToRender = fretsToRender.map((cell: FretCell[], i) => [
        { note: tuning[i], string: i, fret: 0 },
        ...cell,
    ]);

    const fretboardNumbers = notesToRender[0]
        .map((cell) => cell.fret)
        .reverse();

    const frets = notesToRender.map((string: FretCell[], stringNum: number) => {
        return (
            <ul className='flex' key={nanoid()}>
                {string
                    .map((cell: FretCell) => {
                        const fingeredFret = fingeredFrets[stringNum];
                        const highlight =
                            fingeredFret !== "muted" &&
                            fingeredFret.relativeFret === cell.fret
                                ? "ringing"
                                : fingeredFret === "muted" && cell.fret === 0
                                ? "muted"
                                : "";

                        return (
                            <li key={nanoid()}>
                                <Fret cell={cell} highlight={highlight} />
                            </li>
                        );
                    })
                    .reverse()}
            </ul>
        );
    });

    return (
        <main>
            <FretNumbers fretboardNumbers={fretboardNumbers} />
            {frets}
        </main>
    );
}

export default Fretboard;

const fretWidth = "w-8";

function FretNumbers({ fretboardNumbers }: { fretboardNumbers: number[] }) {
    // NOTE: Assumption: highest fret num is 24
    const landmarkFretNumbers = [3, 5, 7, 9, 12, 15, 17, 19, 21, 24];
    const fretNumbers = fretboardNumbers.map((fretNumber) => {
        return (
            <li className={`${fretWidth}`} key={nanoid()}>
                {landmarkFretNumbers.includes(fretNumber) ? fretNumber : " "}
            </li>
        );
    });

    return <ul className='flex'>{fretNumbers}</ul>;
}

function Fret({
    cell,
    highlight,
}: {
    cell: FretCell;
    highlight: "ringing" | "muted" | "";
}) {
    const handleFretClick = useFretClickContext();

    const mutedStyle = highlight === "muted" ? "bg-red-300" : "";
    const ringingStyle = highlight === "ringing" ? "bg-green-300" : "";

    const style =
        cell.fret !== 0
            ? `border borderinc-200 ${fretWidth} h-8 ${ringingStyle}`
            : `border rounded-full ${fretWidth} h-8 ml-2 ${ringingStyle} ${mutedStyle}`;

    return (
        <button className={style} onClick={() => handleFretClick(cell)}>
            {cell.note}
        </button>
    );
}

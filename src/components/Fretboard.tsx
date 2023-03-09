import { nanoid } from "nanoid";
import { FretCell } from "../helpers/types";
import {
    useFingeredFretContext,
    useFretClickContext,
    useFretOffsetContext,
    useRenderedFretsContext,
    useTuningContext,
} from "../helpers/contexthooks";

const fret0Width = "2rem";

function Fretboard() {
    const fretsToRender = useRenderedFretsContext();
    const fingeredFrets = useFingeredFretContext();
    const fretOffset = useFretOffsetContext();
    const tuning = useTuningContext();
    const notesToRender = fretsToRender.map((cell: FretCell[], i) => [
        { note: tuning[i], string: i, absoluteFret: 0 },
        ...cell,
    ]);

    const fretboardNumbers = fretsToRender[0]
        .map((cell) => cell.absoluteFret)
        .reverse();
    const fretWidths = calculateWidthPercentages(
        fretboardNumbers.map((fretNumber) => calculateFretWidth(fretNumber))
    )
        .map((width) => `${width}%`)
        .concat([fret0Width]);

    const frets = notesToRender.map((string: FretCell[], stringNum: number) => {
        return (
            <ul className='flex' key={nanoid()}>
                {string
                    .map((cell: FretCell) => {
                        const fingeredFret = fingeredFrets[stringNum];
                        const denormalizedFret =
                            fingeredFret !== "muted"
                                ? fingeredFret.relativeFret + fretOffset - 1
                                : 0;

                        const highlight =
                            fingeredFret === "muted" && cell.absoluteFret === 0
                                ? "muted"
                                : denormalizedFret === cell.absoluteFret
                                ? "ringing"
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
        cell.absoluteFret !== 0
            ? `border borderinc-200 ${fretWidth} h-8 ${ringingStyle}`
            : `border rounded-full ${fretWidth} h-8 ml-2 ${ringingStyle} ${mutedStyle}`;

    return (
        <button className={style} onClick={() => handleFretClick(cell)}>
            {cell.note}
        </button>

function calculateFretWidth(
    fretNumber: number,
    scaleLength: number = 66
): number {
    return (
        scaleLength / 2 ** ((fretNumber - 1) / 12) -
        scaleLength / 2 ** (fretNumber / 12)
    );
}

function calculateWidthPercentages(absoluteWidth: number[]) {
    const totalWidth = absoluteWidth.reduce(
        (total, current) => total + current
    );
    return absoluteWidth.map((fretWidth) => (fretWidth / totalWidth) * 100);
}

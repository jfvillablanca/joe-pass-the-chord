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

    const fretboardNumbers = fretsToRender[0].map((cell) => cell.absoluteFret);
    const fretWidths = calculateWidthPercentages(
        fretboardNumbers
            .reverse()
            .map((fretNumber) => calculateFretWidth(fretNumber))
    )
        .map((width) => `${width}%`)
        .concat([fret0Width]);

    const frets = notesToRender.map((string: FretCell[], stringNum: number) => {
        return (
            <ul className='flex' key={nanoid()}>
                {string.reverse().map((cell: FretCell, i) => {
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
                        <li key={nanoid()} style={{ width: fretWidths[i] }}>
                            <Fret cell={cell} highlight={highlight} />
                        </li>
                    );
                })}
            </ul>
        );
    });

    return (
        <main className='w-full mx-10'>
            <FretNumbers
                fretboardNumbers={fretboardNumbers.concat([0])}
                fretWidths={fretWidths}
            />
            {frets}
        </main>
    );
}

export default Fretboard;

function FretNumbers({
    fretboardNumbers,
    fretWidths,
}: {
    fretboardNumbers: number[];
    fretWidths: string[];
}) {
    // NOTE: Assumption: highest fret num is 24
    const landmarkFretNumbers = [3, 5, 7, 9, 12, 15, 17, 19, 21, 24];
    const twStyles = (fretNumber: number) =>
        `grid w-full justify-center ${fretNumber === 0 ? "ml-2" : ""}`;
    const style = (fretWidth: string) => ({
        width: `${fretWidth}`,
    });
    const fretNumbers = fretboardNumbers.map((fretNumber, i) => {
        return (
            <li style={style(fretWidths[i])} key={nanoid()}>
                <p className={twStyles(fretNumber)}>
                    {landmarkFretNumbers.includes(fretNumber)
                        ? fretNumber
                        : " "}
                </p>
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
    const commonStyles = "border h-16 w-full";

    const twStyles =
        cell.absoluteFret !== 0
            ? `${commonStyles} ${ringingStyle}`
            : `${commonStyles} rounded-full ml-2 ${ringingStyle} ${mutedStyle}`;

    return (
        <button className={twStyles} onClick={() => handleFretClick(cell)}>
            {cell.note}
        </button>
    );
}

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

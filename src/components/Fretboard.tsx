import { nanoid } from "nanoid";
import { FretCell } from "../helpers/types";
import {
    useFingeredStringContext,
    useFretClickContext,
    useRenderedFretsContext,
    useTuningContext,
} from "../helpers/contexthooks";

function Fretboard() {
    const fretsToRender = useRenderedFretsContext();
    const ringingStrings = useFingeredStringContext();
    const tuning = useTuningContext();
    const notesToRender = fretsToRender.map((cell: FretCell[], i) => [
        { note: tuning[i], string: i, fret: 0 },
        ...cell,
    ]);

    const frets = notesToRender.map((string: FretCell[], stringNum: number) => {
        return (
            <ul className='flex' key={nanoid()}>
                {string
                    .map((cell: FretCell) => {
                        return (
                            <li key={nanoid()}>
                                <Fret
                                    cell={cell}
                                    isInFretBoard={true}
                                    highlight={
                                        ringingStrings[stringNum] === cell.fret
                                            ? "ringing"
                                            : ""
                                    }
                                />
                            </li>
                        );
                    })
                    .reverse()}
                <li key={nanoid()}>
                    <Fret
                        cell={{
                            note: tuning[stringNum],
                            string: stringNum,
                            fret: 0,
                        }}
                        isInFretBoard={false}
                        highlight={
                            ringingStrings[stringNum] === "muted"
                                ? "muted"
                                : ringingStrings[stringNum] === 0
                                ? "ringing"
                                : ""
                        }
                    />
                </li>
            </ul>
        );
    });

    return <main>{frets}</main>;
}

export default Fretboard;

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
            ? `border borderinc-200 w-8 h-8 ${ringingStyle}`
            : `border rounded-full w-8 h-8 ml-2 ${ringingStyle} ${mutedStyle}`;

    return (
        <button className={style} onClick={() => handleFretClick(cell)}>
            {cell.note}
        </button>
    );
}

import { nanoid } from "nanoid";
import {
    FingeredString,
    FretCell,
    useFingeredStringContext,
    useFretClickContext,
    useRenderedFretsContext,
    useTuningContext,
} from "./MainContext";

function Fretboard() {
    const fretsToRender = useRenderedFretsContext();
    const ringingStrings = useFingeredStringContext();
    const tuning = useTuningContext();
    const frets = fretsToRender.map((string: FretCell[], stringNum: number) => {
        return (
            <ul className='flex' key={nanoid()}>
                {string.map((cell: FretCell) => {
                    return (
                        <li key={nanoid()}>
                            <Fret cell={cell} isInFretBoard={true} />
                        </li>
                    );
                })}
                <li key={nanoid()}>
                    <Fret
                        cell={{
                            note: tuning[stringNum],
                            string: stringNum,
                            fret: 0,
                        }}
                        isInFretBoard={false}
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
    isInFretBoard,
}: {
    cell: FretCell;
    highlight: "ringing" | "muted" | "";
    isInFretBoard: boolean;
}) {
    const handleFretClick = useFretClickContext();

    const mutedStyle = highlight === "muted" ? "bg-red-300" : "";
    const ringingStyle = highlight === "ringing" ? "bg-green-300" : "";

    const style = isInFretBoard
        ? `border borderinc-200 w-8 h-8 ${ringingStyle}`
        : `border rounded-full w-8 h-8 ml-2 ${ringingStyle} ${mutedStyle}`;

    return (
        <button className={style} onClick={() => handleFretClick(cell)}>
            {cell.note}
        </button>
    );
}

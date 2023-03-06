import { nanoid } from "nanoid";
import {
    useFretClickContext,
    useRenderedFrets,
    useTuningContext,
} from "./MainContext";

function Fretboard() {
    const fretsToRender = useRenderedFrets();
    const tuning = useTuningContext();
    const frets = fretsToRender.map((string, stringNum) => {
        return (
            <ul className='flex' key={nanoid()}>
                {string.map((fretNote) => {
                    return (
                        <li key={nanoid()}>
                            <Fret note={fretNote} isInFretBoard={true} />
                        </li>
                    );
                })}
                <li key={nanoid()}>
                    <Fret note={tuning[stringNum]} isInFretBoard={false} />
                </li>
            </ul>
        );
    });

    return <main>{frets}</main>;
}

export default Fretboard;

function Fret({
    note,
    isInFretBoard,
}: {
    note: string;
    isInFretBoard: boolean;
}) {
    const handleFretClick = useFretClickContext();

    const style = isInFretBoard ? "border borderinc-200 w-8 h-8" : "border rounded-full w-8 h-8 ml-2";

    return (
        <button className={style} onClick={() => handleFretClick(note)}>
            {note}
        </button>
    );
}

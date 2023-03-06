import { nanoid } from "nanoid";
import { useFretClickContext, useRenderedFrets } from "./MainContext";

function Fretboard() {
    const fretsToRender = useRenderedFrets();
    const frets = fretsToRender.map((string) => {
        return (
            <ul key={nanoid()}>
                {string.map((fretNote) => {
                    return <Fret key={nanoid()} note={fretNote} />;
                })}
            </ul>
        );
    });

    return <main>{frets}</main>;
}

export default Fretboard;

function Fret({ note }: { note: string }) {
    const handleFretClick = useFretClickContext();
    return (
        <button
            className='border border-zinc-200 w-8 h-8'
            onClick={() => handleFretClick(note)}
        >
            {note}
        </button>
    );
}

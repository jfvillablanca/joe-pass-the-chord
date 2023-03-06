import { useFretClickContext } from "./MainContext";

function Fretboard() {
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

import { computeFingeredNotes } from "../helpers/const_and_fn";
import { useFretboardContext, useStateContext } from "./context";

function Display() {
    const { strings } = useStateContext();
    const { tuning } = useFretboardContext();
    const { chordNames } = computeFingeredNotes(strings, tuning);

    const uniqueChordNames = [...new Set(chordNames.flat())];
    const chordElements = uniqueChordNames.map((chord, key) => (
        <div
            className='bg-neutral text-neutral-content rounded-lg p-4 m-2 text-xl'
            key={key}
        >
            {chord}
        </div>
    ));

    return (
        <>
            {chordElements.length === 0 ? (
                <p className='font-bold text-xl uppercase'>
                    No inferred chords
                </p>
            ) : (
                <>
                    <p className='font-bold text-xl uppercase'>
                        Inferred chords:
                    </p>
                    <div className='grid grid-cols-3 auto-cols-min'>
                        {chordElements}
                    </div>
                </>
            )}
        </>
    );
}

export default Display;

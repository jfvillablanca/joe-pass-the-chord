import { computeFingeredNotes } from "../helpers/compute";
import { useFretboardContext, useStateContext } from "./context";

function Display() {
    const { strings } = useStateContext();
    const { tuning } = useFretboardContext();
    const { chordNames } = computeFingeredNotes(strings, tuning);

    return (
        <div className='alert alert-info'>
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' className='stroke-current shrink-0 w-6 h-6' > {" "} <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' ></path>{" "} </svg>
            {chordNames.map((chord, key) => (
                <span key={key}>{chord}</span>
            ))}
        </div>
    );
}

export default Display;

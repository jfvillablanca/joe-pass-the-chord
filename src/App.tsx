import { useState } from "react";
import { standard } from "react-guitar-tunings";
import Arrow from "./components/Arrow";
import Display from "./components/Display";
import Fretboard from "./components/Fretboard";
import { computeFingeredNotes, DISPLAYED_FRETS } from "./helpers/compute";
import { handleFretOffsetAdjust } from "./helpers/handler";
import { Context } from "./helpers/types";

function App() {
    const tuning = standard;

    const [strings, setStrings] = useState([-1, -1, -1, -1, -1, -1]);
    const [fretOffset, setFretOffset] = useState(0);
    const frets = { from: fretOffset, amount: DISPLAYED_FRETS - 1 };

    const context: Context = {
        strings,
        setStrings,
        frets,
        tuning,
        lefty: false,
        fretOffset,
        setFretOffset,
    };

    return (
        <main className='grid grid-cols-5 h-screen w-screen' data-theme='light'>
            <Arrow
                className='col-span-1'
                direction={"left"}
                handleFretOffsetAdjust={handleFretOffsetAdjust(context)}
            />
            <div className='col-span-3 flex flex-col justify-center'>
                <Fretboard context={context} />
                <Display noteInfo={computeFingeredNotes(strings, tuning)} />
            </div>
            <Arrow
                className='col-span-1'
                direction={"right"}
                handleFretOffsetAdjust={handleFretOffsetAdjust(context)}
            />
        </main>
    );
}

export default App;

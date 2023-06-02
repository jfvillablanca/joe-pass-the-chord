import { useState } from "react";
import { standard } from "react-guitar-tunings";
import Arrow from "./components/Arrow";
import { FretboardContext, StateContext } from "./components/context";
import Display from "./components/Display";
import Fretboard from "./components/Fretboard";
import { DISPLAYED_FRETS } from "./helpers/compute";
import { handleFretOffsetAdjust } from "./helpers/handler";
import { FretboardContextType, StateContextType } from "./helpers/types";

function App() {
    const [strings, setStrings] = useState([-1, -1, -1, -1, -1, -1]);
    const [fretOffset, setFretOffset] = useState(0);

    const fretboardContext: FretboardContextType = {
        frets: { from: fretOffset, amount: DISPLAYED_FRETS - 1 },
        tuning: standard,
        lefty: false,
    };

    const stateContext: StateContextType = {
        strings,
        setStrings,
        fretOffset,
        setFretOffset,
    };

    return (
        <FretboardContext.Provider value={fretboardContext}>
            <StateContext.Provider value={stateContext}>
                <main
                    className='grid grid-cols-5 h-screen w-screen'
                    data-theme='light'
                >
                    <Arrow
                        className='col-span-1'
                        direction={"left"}
                        handleFretOffsetAdjust={handleFretOffsetAdjust(
                            stateContext
                        )}
                    />
                    <div className='col-span-3 flex flex-col justify-center'>
                        <Fretboard />
                        <Display />
                    </div>
                    <Arrow
                        className='col-span-1'
                        direction={"right"}
                        handleFretOffsetAdjust={handleFretOffsetAdjust(
                            stateContext
                        )}
                    />
                </main>
            </StateContext.Provider>
        </FretboardContext.Provider>
    );
}

export default App;

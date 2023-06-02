import { useEffect, useState } from "react";
import Arrow from "./components/Arrow";
import Fretboard from "./components/Fretboard";
import { Context, OffsetDirection } from "./helpers/types";

const [UPPER_FRET_LIMIT, LOWER_FRET_LIMIT] = [22, 0];

function App() {
    const [strings, setStrings] = useState([0, 0, 0, 0, 0, 0]);
    const [fretOffset, setFretOffset] = useState(0);

    const fretsDisplayed = 4;
    const adjustUpperFretLimit = UPPER_FRET_LIMIT - fretsDisplayed + 1;
    const frets = { from: fretOffset, amount: fretsDisplayed - 1 };

    const handleFretOffsetAdjust = (offsetDirection: OffsetDirection) => {
        const [raisedFret, loweredFret] = [fretOffset + 1, fretOffset - 1];
        switch (offsetDirection) {
            case "up":
                if (raisedFret <= adjustUpperFretLimit) {
                    setFretOffset(() => raisedFret);
                }
                break;
            case "down":
                if (loweredFret >= LOWER_FRET_LIMIT) {
                    setFretOffset(() => loweredFret);
                }
                break;
        }
    };

    useEffect(() => {
        console.log(fretOffset);
    }, [fretOffset]);

    const context: Context = {
        strings,
        setStrings,
        frets,
        lefty: false,
    };

    return (
        <main className='grid grid-cols-5 h-screen w-screen' data-theme='light'>
            <Arrow
                className='col-span-1'
                direction={"left"}
                handleFretOffsetAdjust={handleFretOffsetAdjust}
            />
            <Fretboard className='col-span-3' context={context} />
            <Arrow
                className='col-span-1'
                direction={"right"}
                handleFretOffsetAdjust={handleFretOffsetAdjust}
            />
        </main>
    );
}

export default App;

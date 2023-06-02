import Guitar, { getRenderFingerSpn } from "react-guitar";
import { useFretboardContext, useStateContext } from "./context";

function Fretboard({ className: classFromApp = "" }: { className?: string }) {
    const { frets, tuning, lefty } = useFretboardContext();
    const { strings, setStrings } = useStateContext();
    return (
        <Guitar
            className={`${classFromApp} place-self-center`}
            strings={strings}
            onChange={setStrings}
            frets={frets}
            lefty={lefty}
            renderFinger={getRenderFingerSpn(tuning)}
        />
    );
}

export default Fretboard;

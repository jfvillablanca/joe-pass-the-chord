import Guitar, { getRenderFingerSpn } from "react-guitar";
import { twMerge } from "tailwind-merge";
import { useFretboardContext, useStateContext } from "./context";

function Fretboard({ className: classFromApp = "" }: { className?: string }) {
    const { frets, tuning, lefty } = useFretboardContext();
    const { strings, setStrings } = useStateContext();
    return (
        <Guitar
            className={twMerge(`place-self-center`, classFromApp)}
            strings={strings}
            onChange={setStrings}
            frets={frets}
            lefty={lefty}
            renderFinger={getRenderFingerSpn(tuning)}
        />
    );
}

export default Fretboard;

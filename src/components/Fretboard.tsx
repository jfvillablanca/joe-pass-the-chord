import Guitar, { getRenderFingerSpn } from "react-guitar";
import { Context } from "../helpers/types";

function Fretboard({
    context,
    className: classFromApp = "",
}: {
    context: Context;
    className?: string;
}) {
    const { strings, setStrings, frets, tuning, lefty } = context;
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

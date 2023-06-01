import Guitar, { getRenderFingerSpn } from "react-guitar";
import { standard } from "react-guitar-tunings";
import { Context } from "../helpers/types";

function Fretboard({
    context,
    className: classFromApp = "",
}: {
    context: Context;
    className?: string;
}) {
    const { strings, setStrings, frets } = context;
    return (
        <Guitar
            className={`${classFromApp} place-self-center`}
            strings={strings}
            onChange={setStrings}
            frets={frets}
            lefty={true}
            renderFinger={getRenderFingerSpn(standard)}
        />
    );
}

export default Fretboard;

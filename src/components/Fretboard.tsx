import Guitar, { getRenderFingerSpn } from "react-guitar";
import { Context } from "../helpers/types";
import { useStateContext } from "./context";

function Fretboard({
    context,
    className: classFromApp = "",
}: {
    context: Context;
    className?: string;
}) {
    const { frets, tuning, lefty } = context;
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

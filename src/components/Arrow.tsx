import Left from "../assets/left.svg";
import Right from "../assets/right.svg";
import { handleFretOffsetAdjust } from "../helpers/handler";
import { ArrowDirectionType, OffsetDirectionType } from "../helpers/types";
import { useStateContext } from "./context";

function Arrow({
    direction,
    className: classFromApp = "",
}: {
    direction: ArrowDirectionType;
    className?: string;
}) {
    // non-lefty orientation
    const offsetDirection: OffsetDirectionType =
        direction === "left" ? "down" : "up";
    const stateContext = useStateContext();

    return (
        <div
            className={`${classFromApp} btn place-self-center`}
            onClick={() =>
                handleFretOffsetAdjust({ stateContext, offsetDirection })
            }
        >
            {direction === "left" ? (
                <img src={Left} alt='Left' />
            ) : (
                <img src={Right} alt='Right' />
            )}
        </div>
    );
}

export default Arrow;

import Left from "../assets/left.svg";
import Right from "../assets/right.svg";
import { ArrowDirectionType, OffsetDirectionType } from "../helpers/types";

function Arrow({
    direction,
    className: classFromApp = "",
    handleFretOffsetAdjust,
}: {
    direction: ArrowDirectionType;
    className?: string;
    handleFretOffsetAdjust: (offsetDirection: OffsetDirectionType) => void;
}) {
    // non-lefty orientation
    const offsetDirection = direction === "left" ? "down" : "up";

    return (
        <div
            className={`${classFromApp} btn place-self-center`}
            onClick={() => handleFretOffsetAdjust(offsetDirection)}
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

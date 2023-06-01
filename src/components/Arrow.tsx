import Left from "../assets/left.svg";
import Right from "../assets/right.svg";
import { ArrowDirection, OffsetDirection } from "../helpers/types";

function Arrow({
    direction,
    className: classFromApp = "",
    handleFretOffsetAdjust,
}: {
    direction: ArrowDirection;
    className?: string;
    handleFretOffsetAdjust: (offsetDirection: OffsetDirection) => void;
}) {
    // Lefty orientation
    const offsetDirection = direction === "left" ? "up" : "down";

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

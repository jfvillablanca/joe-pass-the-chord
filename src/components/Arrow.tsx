import { twMerge } from "tailwind-merge";
import Left from "../assets/left.svg";
import Right from "../assets/right.svg";
import { handleFretOffsetAdjust } from "../helpers/handler";
import { ArrowDirectionType, OffsetDirectionType } from "../helpers/types";
import { useFretboardContext, useStateContext } from "./context";

function Arrow({
    direction,
    className: classFromApp = "",
}: {
    direction: ArrowDirectionType;
    className?: string;
}) {
    const stateContext = useStateContext();
    const { lefty } = useFretboardContext();

    const offsetDirection = getOffsetDirection(direction, lefty);
    const cssHeight = "h-10";

    return (
        <div
            className={twMerge(
                cssHeight,
                `btn place-self-center`,
                classFromApp
            )}
            onClick={() =>
                handleFretOffsetAdjust({ stateContext, offsetDirection })
            }
        >
            {direction === "left" ? (
                <img src={Left} alt='Left' className={twMerge(cssHeight)} />
            ) : (
                <img src={Right} alt='Right' className={twMerge(cssHeight)} />
            )}
        </div>
    );
}

function getOffsetDirection(
    direction: ArrowDirectionType,
    isLefty: boolean
): OffsetDirectionType {
    if (!isLefty) {
        return direction === "left" ? "down" : "up";
    }
    return direction === "left" ? "up" : "down";
}

export default Arrow;

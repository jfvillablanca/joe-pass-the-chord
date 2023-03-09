import { useFretScrollContext } from "../helpers/contexthooks";

export default function FretScroll({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className='flex w-3/4'>
            <ScrollButton direction={"higher"} />
            {children}
            <ScrollButton direction={"lower"} />
        </div>
    );
}

function ScrollButton({ direction }: { direction: "higher" | "lower" }) {
    const handleFretScroll = useFretScrollContext();
    return (
        <button onClick={() => handleFretScroll(direction)}>{direction}</button>
    );
}

export default function FretScroll({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className='flex'>
            <ScrollButton direction={"higher"} />
            {children}
            <ScrollButton direction={"lower"} />
        </div>
    );
}

function ScrollButton({ direction }: { direction: "higher" | "lower" }) {
    return <button>{direction}</button>;
}

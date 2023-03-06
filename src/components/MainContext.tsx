import { createContext, useContext } from "react";

const FretClickContext = createContext<(note: string) => void>(() => {});
const TuningContext = createContext<string[]>([]);

export function useFretClickContext() {
    return useContext(FretClickContext);
}

export function useTuningContext() {
    return useContext(TuningContext);
}

export function MainContext({ children }: { children: React.ReactNode }) {
    const tuning = ["E", "A", "D", "G", "B", "E"];
    const handleFretClick = (note: string) => {
        console.log(note);
    };

    return (
        <TuningContext.Provider value={tuning}>
            <FretClickContext.Provider value={handleFretClick}>
                {children}
            </FretClickContext.Provider>
        </TuningContext.Provider>
    );
}

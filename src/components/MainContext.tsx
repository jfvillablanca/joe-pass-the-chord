import { createContext } from "react";

export const FretClickContext = createContext<(note: string) => void>(() => {});

export function MainContext({ children }: { children: React.ReactNode }) {
    const handleFretClick = (note: string) => {
        console.log(note);
    };

    return (
        <FretClickContext.Provider value={handleFretClick}>
            {children}
        </FretClickContext.Provider>
    );
}

import { createContext, useContext } from "react";

const FretClickContext = createContext<(note: string) => void>(() => {});
export function useFretClickContext() {
    return useContext(FretClickContext);
}

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

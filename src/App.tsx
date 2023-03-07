import ChordDisplay from "./components/ChordDisplay";
import Fretboard from "./components/Fretboard";
import FretScroll from "./components/FretScroll";
import { MainContext } from "./components/MainContext";

function App() {
    return (
        <MainContext>
            <div className='App h-screen grid place-items-center'>
                <FretScroll>
                    <Fretboard />
                </FretScroll>
                <ChordDisplay />
            </div>
        </MainContext>
    );
}

export default App;

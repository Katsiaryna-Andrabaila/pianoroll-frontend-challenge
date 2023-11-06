import { useState } from "react";
import "./App.css";
import { Sequence } from "./types.ts";
import { Nav } from "./components/nav/Nav.tsx";
import { LoadButton } from "./components/buttons/LoadButton.tsx";
import { PianoRollContainer } from "./components/rolls/PianoRollContainer.tsx";
import { AppContext } from "./context/index.ts";
import { loadPianoRollData } from "./api/loadPianoRollData.ts";

function App() {
  const [data, setData] = useState<Sequence[] | null>(null);
  const [activeRoll, setActiveRoll] = useState<null | number>(null);

  const generateSVGs = async () => {
    setActiveRoll(null);
    if (!data) await loadPianoRollData(setData);
    if (!data) return;
  };

  return (
    <AppContext.Provider value={{ activeRoll, setActiveRoll }}>
      <Nav />
      <h1>Welcome to PianoRoll frontend coding challenge!</h1>
      <LoadButton generateSVGs={generateSVGs} />
      {data &&
        (data.length >= 1260 ? (
          <div id="pianoRollContainer">
            <PianoRollContainer data={data} />
          </div>
        ) : (
          <div className="error-message">
            An error occured! Please, try again
          </div>
        ))}
    </AppContext.Provider>
  );
}

export default App;

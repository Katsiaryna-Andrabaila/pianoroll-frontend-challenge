import { useState } from "react";
import "./App.css";
import { Sequence } from "./types.ts";
import { Nav } from "./components/Nav.tsx";
import { LoadButton } from "./components/LoadButton.tsx";
import { PianoRollContainer } from "./components/PianoRollContainer.tsx";

function App() {
  const [data, setData] = useState<Sequence[] | null>(null);

  const loadPianoRollData = async () => {
    try {
      const response = await fetch("https://pianoroll.ai/random_notes");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
      console.log(result);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const generateSVGs = async () => {
    if (!data) await loadPianoRollData();
    if (!data) return;
    loadPianoRollData();
  };

  return (
    <>
      <Nav />
      <h1>Welcome to PianoRoll frontend coding challenge!</h1>
      <LoadButton generateSVGs={generateSVGs} />
      <div id="pianoRollContainer">
        {data && <PianoRollContainer data={data} />}
      </div>
    </>
  );
}

export default App;

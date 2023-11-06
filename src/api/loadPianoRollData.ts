import { Sequence } from "../types.ts";

export const loadPianoRollData = async (
  setData: React.Dispatch<React.SetStateAction<Sequence[] | null>>
) => {
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

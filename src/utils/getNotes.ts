import { Sequence } from "../types.ts";
import { timeToX } from "./timeToX.ts";

type getNotesProps = {
  sequence: Sequence[];
  start: number;
  end: number;
  partStart: number | null;
  partEnd: number | null;
  edge: number;
  width: number;
};

export const getNotes = ({
  sequence,
  start,
  edge,
  end,
  partEnd,
  partStart,
  width,
}: getNotesProps) => {
  let notes = 0;

  sequence.forEach((note) => {
    const x = timeToX(note.start - start, end);

    if (partStart && partEnd) {
      if (x >= (partStart - edge) / width && x <= (partEnd - edge) / width) {
        notes++;
      }
    }
  });

  return notes;
};

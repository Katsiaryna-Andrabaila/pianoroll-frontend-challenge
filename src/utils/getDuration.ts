import { Sequence } from "../types.ts";
import { timeToX } from "./timeToX";

export const getDuration = (sequence: Sequence, end: number, width: number) => {
  const partDuration = sequence.end - sequence.start;
  const partWidth = timeToX(sequence.end - sequence.start, end);
  const part = (partWidth * 100) / width;
  return partDuration / part;
};

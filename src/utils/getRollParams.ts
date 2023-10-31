import { Sequence } from "../types.ts";

export const getRollParams = (sequence: Sequence[]) => {
  const start = sequence[0].start;
  const end = sequence[sequence.length - 1].end - start;

  const pitches = sequence.map((note) => {
    return note.pitch;
  });

  // Make it at lest 2 octaves (2 * 12)
  let pitch_min = Math.min(...pitches);
  let pitch_max = Math.max(...pitches);
  let pitch_span = pitch_max - pitch_min;

  if (pitch_span < 24) {
    const diff = 24 - pitch_span;
    const low = Math.ceil(diff / 2);
    const high = Math.floor(diff / 2);
    pitch_min -= low;
    pitch_max += high;
  }
  // And margin up and down
  pitch_min -= 3;
  pitch_max += 3;
  pitch_span = pitch_max - pitch_min;
  const note_height = 1 / pitch_span;

  return { start, end, note_height, pitch_max, pitch_min, pitch_span };
};

import { Sequence } from "../../types.ts/index.ts";
import { noteColormap } from "../../utils/colorMaps.ts";
import { getRollParams } from "../../utils/getRollParams.ts";
import { EmptyRoll } from "./EmptyRoll.tsx";
import { Rect } from "../svg/Rect.tsx";

type PianoRollProps = {
  sequence: Sequence[];
};

export const PianoRoll = ({ sequence }: PianoRollProps) => {
  const { start, end, note_height, pitch_max, pitch_min, pitch_span } =
    getRollParams(sequence);

  const timeToX = (time: number) => {
    if (end) {
      return time / end;
    }
  };

  return (
    <svg
      className="piano-roll-svg"
      xmlns="http://www.w3.org/2000/svg"
      width="80%"
      height="150"
      viewBox="0 0 1 1"
      preserveAspectRatio="none"
    >
      <EmptyRoll pitch_max={pitch_max} pitch_min={pitch_min} />
      {sequence.map((note, i) => {
        const x = timeToX(note.start - start!);
        const w = timeToX(note.end - note.start);
        const y = 1 - (note.pitch - pitch_min) / pitch_span;
        const color = noteColormap[note.velocity];

        return (
          <Rect
            className="note-rectangle"
            x={`${x}`}
            width={`${w}`}
            y={`${y}`}
            fill={`${color}`}
            height={`${note_height}`}
            key={i}
          />
        );
      })}
    </svg>
  );
};

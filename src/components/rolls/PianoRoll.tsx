import { Sequence } from "../../types.ts/index.ts";
import { noteColormap } from "../../utils/colorMaps.ts";
import { getRollParams } from "../../utils/getRollParams.ts";
import { EmptyRoll } from "./EmptyRoll.tsx";
import { Rect } from "../svg/Rect.tsx";
import { createRef, useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/index.ts";

type PianoRollProps = {
  sequence: Sequence[];
  rollId: number;
};

export const PianoRoll = ({ sequence, rollId }: PianoRollProps) => {
  const [xPosition, setXPosition] = useState(0);
  const ref = createRef<SVGSVGElement>();
  const [width, setWidth] = useState(1);
  const [edge, setEdge] = useState(1);
  const { activeRoll } = useContext(AppContext);
  //const duration = end - start;

  useEffect(() => {
    const rollWidth = ref.current!.getBoundingClientRect().width;
    const edgeWindow = ref.current!.getBoundingClientRect().left;

    if (activeRoll === rollId) {
      setWidth(rollWidth);
      setEdge(edgeWindow);
    }
  }, []);

  const { start, end, note_height, pitch_max, pitch_min, pitch_span } =
    getRollParams(sequence);

  const timeToX = (time: number) => {
    if (end) {
      return time / end;
    }
  };

  const getMousePosition = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    activeRoll === rollId && setXPosition(event.clientX);
  };

  return (
    <svg
      className={
        activeRoll === rollId ? "piano-roll-svg active" : "piano-roll-svg"
      }
      xmlns="http://www.w3.org/2000/svg"
      width="80%"
      height="150"
      viewBox="0 0 1 1"
      preserveAspectRatio="none"
      onMouseMove={getMousePosition}
      ref={ref}
    >
      <EmptyRoll pitch_max={pitch_max} pitch_min={pitch_min} />
      {sequence.map((note, i) => {
        const x = timeToX(note.start - start);
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
      {activeRoll === rollId && (
        <line
          className="time-line"
          xmlns="http://www.w3.org/2000/svg"
          x1={`${(xPosition - edge) / width} `}
          y1="0"
          x2={`${(xPosition - edge) / width} `}
          y2="1"
          stroke="red"
          strokeWidth="0.002"
        ></line>
      )}
    </svg>
  );
};

import { Sequence } from "../../types.ts/index.ts";
import { noteColormap } from "../../utils/colorMaps.ts";
import { getRollParams } from "../../utils/getRollParams.ts";
import { EmptyRoll } from "./EmptyRoll.tsx";
import { Rect } from "../svg/Rect.tsx";
import { createRef, useContext, useState } from "react";
import { AppContext } from "../../context/index.ts";
import { SelectedRect } from "../svg/SelectedRect.tsx";
import { TimeStamp } from "../svg/TimeStamp.tsx";
import { timeToX } from "../../utils/timeToX.ts";
import { getDuration } from "../../utils/getDuration.ts";

type PianoRollProps = {
  sequence: Sequence[];
  rollId: number;
};

export const PianoRoll = ({ sequence, rollId }: PianoRollProps) => {
  const [xPosition, setXPosition] = useState(0);
  const [width, setWidth] = useState(1);
  const [edge, setEdge] = useState(1);
  const [isSelect, setIsSelect] = useState(false);
  const [partStart, setPartStart] = useState<number | null>(null);
  const [partEnd, setPartEnd] = useState<number | null>(null);
  const ref = createRef<SVGSVGElement>();
  const { activeRoll } = useContext(AppContext);

  const { start, end, note_height, pitch_max, pitch_min, pitch_span } =
    getRollParams(sequence);

  const getMousePosition = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    if (activeRoll === rollId) {
      const rollWidth = ref.current!.getBoundingClientRect().width;
      const edgeWindow = ref.current!.getBoundingClientRect().left;

      setIsSelect(true);
      setXPosition(event.clientX);
      setWidth(rollWidth);
      setEdge(edgeWindow);
    }
  };

  const linePositionX = (xPosition - edge) / width;
  const textPositionX =
    xPosition / window.innerWidth < 0.47
      ? linePositionX
      : (xPosition - edge * 2) / width;
  const timeStamp = (
    (getDuration(sequence[0], end, width) / width) *
    (xPosition - edge + 0.6)
  ).toFixed(3);

  const handleMouseDown = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    const currentPosition = event.clientX;
    setPartStart(currentPosition);
  };

  const handleMouseUp = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    const currentPosition = event.clientX;
    setPartEnd(currentPosition);
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
      onMouseLeave={() => setIsSelect(false)}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      ref={ref}
    >
      <EmptyRoll pitch_min={pitch_min} pitch_max={pitch_max} />
      {sequence.map((note, i) => {
        const x = timeToX(note.start - start, end);
        const w = timeToX(note.end - note.start, end);
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
      {isSelect && (
        <TimeStamp
          linePositionX={linePositionX}
          textPositionX={textPositionX}
          timeStamp={timeStamp}
        />
      )}

      {partStart && (
        <SelectedRect
          width={
            partEnd
              ? (partEnd - partStart) / width
              : (xPosition - partStart) / width
          }
          partStart={(partStart - edge) / width}
        />
      )}
    </svg>
  );
};

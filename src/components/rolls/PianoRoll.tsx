import { Sequence } from "../../types.ts/index.ts";
import { noteColormap } from "../../utils/colorMaps.ts";
import { getRollParams } from "../../utils/getRollParams.ts";
import { EmptyRoll } from "./EmptyRoll.tsx";
import { Rect } from "../svg/Rect.tsx";
import { createRef, useContext, useState } from "react";
import { AppContext } from "../../context/index.ts";

type PianoRollProps = {
  sequence: Sequence[];
  rollId: number;
};

export const PianoRoll = ({ sequence, rollId }: PianoRollProps) => {
  const [xPosition, setXPosition] = useState(0);
  const [width, setWidth] = useState(1);
  const [edge, setEdge] = useState(1);
  const [isSelect, setIsSelect] = useState(false);
  const ref = createRef<SVGSVGElement>();
  const { activeRoll } = useContext(AppContext);

  const { start, end, note_height, pitch_max, pitch_min, pitch_span } =
    getRollParams(sequence);

  const timeToX = (time: number) => time / end;

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

  const removeTimeLine = () => {
    setIsSelect(false);
  };

  const getDuration = () => {
    const partDuration = sequence[0].end - sequence[0].start;
    const partWidth = timeToX(sequence[0].end - sequence[0].start);
    const part = (partWidth * 100) / width;
    return partDuration / part;
  };

  const linePositionX = (xPosition - edge) / width;
  const textPositionX =
    xPosition / window.innerWidth < 0.47
      ? linePositionX
      : (xPosition - edge * 2) / width;
  const timeStamp = (
    (getDuration() / width) *
    (xPosition - edge + 0.6)
  ).toFixed(3);

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
      onMouseLeave={removeTimeLine}
      ref={ref}
    >
      <EmptyRoll pitch_min={pitch_min} pitch_max={pitch_max} />
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
      {isSelect && (
        <>
          <line
            className="time-line"
            xmlns="http://www.w3.org/2000/svg"
            x1={`${linePositionX} `}
            y1="0"
            x2={`${linePositionX} `}
            y2="1"
            stroke="red"
            strokeWidth="0.002"
          ></line>
          <rect
            x={`${textPositionX} `}
            y="0.45"
            width="0.2"
            height="0.1"
            fill="#4c4c4c"
          ></rect>
          <text
            x={`${textPositionX} `}
            y="0.52"
            fontFamily="sans-serif"
            fontSize="0.06"
            fill="white"
          >
            {`${timeStamp}`}
          </text>
        </>
      )}
    </svg>
  );
};

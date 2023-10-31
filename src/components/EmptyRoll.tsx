import { EmptyRect } from "./EmptyRect";
import { Line } from "./Line";

type EmptyRollType = {
  pitch_min: number;
  pitch_max: number;
};

export const EmptyRoll = ({ pitch_min, pitch_max }: EmptyRollType) => {
  const pitch_span = pitch_max - pitch_min;
  const arr = new Array(pitch_max + 1).fill(pitch_min).map((el, i) => el + i);

  return (
    <>
      {arr.map((el) => {
        if ([1, 3, 6, 8, 10].includes(el % 12)) {
          const y = 1 - (el - pitch_min) / pitch_span;
          const x = 0;
          const h = 1 / pitch_span;
          const w = 1;

          return (
            <EmptyRect
              x={`${x}`}
              y={`${y}`}
              width={`${w}`}
              height={`${h}`}
              key={el}
            />
          );
        }

        const y = 1 - (el - pitch_min) / pitch_span + 1 / pitch_span;

        let line_width: number;

        // Every octave, line is bolder
        if (el % 12 === 0) {
          line_width = 0.003;
        } else {
          line_width = 0.001;
        }

        return <Line y={y} line_width={line_width} key={el} />;
      })}
    </>
  );
};

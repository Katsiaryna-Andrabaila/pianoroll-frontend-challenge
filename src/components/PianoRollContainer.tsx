import { Sequence } from "../types.ts";
import { PianoRoll } from "./PianoRoll";
import { PianoRollCard } from "./PianoRollCard";

export const PianoRollContainer = (props: { data: Sequence[] }) => {
  const rollsArray = new Array(20).fill(0).map((el, i) => el + i + 1);

  return (
    <>
      {props.data.length >= 1260 ? (
        rollsArray.map((el: number) => {
          const start = el * 60;
          const end = start + 60;
          const partData = props.data.slice(start, end);

          return (
            <PianoRollCard rollId={el} key={el}>
              <PianoRoll sequence={partData} />
            </PianoRollCard>
          );
        })
      ) : (
        <div className="error-message">An error occured! Please, try again</div>
      )}
    </>
  );
};

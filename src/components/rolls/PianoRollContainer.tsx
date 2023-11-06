import { useContext } from "react";
import { Sequence } from "../../types.ts/index.ts";
import { PianoRoll } from "./PianoRoll.tsx";
import { PianoRollCard } from "./PianoRollCard.tsx";
import { AppContext } from "../../context/index.ts";

export const PianoRollContainer = (props: { data: Sequence[] }) => {
  const { activeRoll } = useContext(AppContext);

  const rollsArray = new Array(20).fill(0).map((el, i) => el + i + 1);
  const rollsList = activeRoll
    ? rollsArray.filter((el) => el !== activeRoll)
    : rollsArray;

  const getPartData = (el: number) => {
    const start = el * 60;
    const end = start + 60;
    const partData = props.data.slice(start, end);

    return partData;
  };

  return (
    <>
      <section className={activeRoll ? "active-roll" : ""}>
        {activeRoll && (
          <PianoRollCard rollId={activeRoll}>
            <PianoRoll sequence={getPartData(activeRoll)} rollId={activeRoll} />
          </PianoRollCard>
        )}
      </section>
      <section className={activeRoll ? "rolls aside" : "rolls"}>
        {rollsList.map((el: number) => {
          const partData = getPartData(el);

          return (
            <PianoRollCard rollId={el} key={el}>
              <PianoRoll sequence={partData} rollId={el} />
            </PianoRollCard>
          );
        })}
      </section>
    </>
  );
};

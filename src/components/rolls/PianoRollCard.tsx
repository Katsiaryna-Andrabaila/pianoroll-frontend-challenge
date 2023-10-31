import { ReactNode, useContext } from "react";
import { AppContext } from "../../context";

type PianoRollCardProps = {
  rollId: number;
  children: ReactNode;
};

export const PianoRollCard = ({ rollId, children }: PianoRollCardProps) => {
  const { setActiveRoll } = useContext(AppContext);

  const handleClick = () => {
    setActiveRoll && setActiveRoll(rollId);
  };

  return (
    <div className="piano-roll-card" onClick={handleClick}>
      <div className="description">{`This is a piano roll number ${rollId}`}</div>
      {children}
    </div>
  );
};

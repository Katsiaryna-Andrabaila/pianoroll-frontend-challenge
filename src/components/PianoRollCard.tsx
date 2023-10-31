import { ReactNode } from "react";

type PianoRollCardProps = {
  rollId: number;
  children: ReactNode;
};

export const PianoRollCard = ({ rollId, children }: PianoRollCardProps) => {
  return (
    <div className="piano-roll-card">
      <div className="description">{`This is a piano roll number ${rollId}`}</div>
      {children}
    </div>
  );
};

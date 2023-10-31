export type Color = {
  r: number;
  g: number;
  b: number;
};

export type Sequence = {
  duration: number;
  end: number;
  pitch: number;
  start: number;
  velocity: number;
};

export type AppContextType = {
  activeRoll: number | null;
  setActiveRoll?: React.Dispatch<React.SetStateAction<null | number>>;
};

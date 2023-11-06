type InfoChosenProps = {
  partStart: number | null;
  partEnd: number | null;
  duration: number;
  width: number;
  edge: number;
  notes: number;
};

export const InfoChosen = ({
  partStart,
  partEnd,
  duration,
  width,
  edge,
  notes,
}: InfoChosenProps) => {
  return partStart && partEnd && partEnd > partStart && notes > 0 ? (
    <>
      <p className="selected-values">
        {`You've chosen a gap from ${(
          (duration / width) *
          (partStart - edge + 0.6)
        ).toFixed(3)} to ${(
          (duration / width) *
          (partEnd - edge + 0.6)
        ).toFixed(3)}`}
      </p>
      <p>{`Number of chosen notes: ${notes}`}</p>
    </>
  ) : (
    <p>You can choose a gap</p>
  );
};

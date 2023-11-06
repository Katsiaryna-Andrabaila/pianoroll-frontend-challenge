type SelectedRectProps = {
  width: number;
  partStart: number;
};

export const SelectedRect = ({ width, partStart }: SelectedRectProps) => {
  return (
    <rect
      x={partStart}
      y="0"
      width={width}
      height="150"
      fill="#f0a59d52"
    ></rect>
  );
};

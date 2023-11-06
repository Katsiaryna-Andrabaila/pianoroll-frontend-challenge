type SelectedRectProps = {
  width: number;
  partStart: number;
};

export const SelectedRect = ({ width, partStart }: SelectedRectProps) => {
  return (
    <rect
      x={
        partStart /* `${
        partStart && xPosition > partStart
          ? (partStart - edge) / width
          : (xPosition - edge) / 1000
      } ` */
      }
      y="0"
      width={
        width /* `${partStart && (Math.abs(xPosition - partStart) + edge) / 1000}` */
      }
      height="150"
      fill="#f0a59d52"
    ></rect>
  );
};

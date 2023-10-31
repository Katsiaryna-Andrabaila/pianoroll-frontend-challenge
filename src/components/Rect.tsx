type RectProps = {
  x: string;
  y: string;
  width: string;
  height: string;
  fill: string;
  className: string;
};

export const Rect = ({ x, y, width, height, fill, className }: RectProps) => {
  return (
    <rect
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      x={x}
      y={y}
      width={width}
      height={height}
      fill={fill}
    ></rect>
  );
};

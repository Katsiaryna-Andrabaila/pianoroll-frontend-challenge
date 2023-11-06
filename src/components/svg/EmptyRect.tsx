import { backgroundColormap } from "../../utils/colorMaps";

type EmptyRectType = {
  x: string;
  y: string;
  width: string;
  height: string;
};

export const EmptyRect = ({ x, y, width, height }: EmptyRectType) => {
  return (
    <rect
      xmlns="http://www.w3.org/2000/svg"
      x={x}
      y={y}
      width={width}
      height={height}
      fill={backgroundColormap[12]}
      fillOpacity="0.666"
    ></rect>
  );
};

type LineProps = {
  y: number;
  line_width: number;
};

export const Line = ({ y, line_width }: LineProps) => {
  return (
    <line
      xmlns="http://www.w3.org/2000/svg"
      x1="0"
      y1={y}
      x2="2"
      y2={y}
      stroke="black"
      strokeWidth={line_width}
    ></line>
  );
};

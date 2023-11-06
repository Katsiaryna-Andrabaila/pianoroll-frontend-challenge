type TimeStampProps = {
  linePositionX: number;
  textPositionX: number;
  timeStamp: string;
};

export const TimeStamp = ({
  linePositionX,
  textPositionX,
  timeStamp,
}: TimeStampProps) => {
  return (
    <>
      <line
        className="time-line"
        xmlns="http://www.w3.org/2000/svg"
        x1={`${linePositionX} `}
        y1="0"
        x2={`${linePositionX} `}
        y2="1"
        stroke="red"
        strokeWidth="0.002"
      ></line>
      <rect
        x={`${textPositionX} `}
        y="0.45"
        width="0.2"
        height="0.1"
        fill="#4c4c4c"
      ></rect>
      <text
        x={`${textPositionX} `}
        y="0.52"
        fontFamily="sans-serif"
        fontSize="0.06"
        fill="white"
      >
        {timeStamp}
      </text>
    </>
  );
};

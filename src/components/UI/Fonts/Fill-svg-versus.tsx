import type { MarqueeProps } from "@/types/TypeSetSstateForUseState/type";

export const FillText: React.FC<MarqueeProps> = ({ text }) => {
    return (
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <text
          x="50%"
          y="63.5%"
          // fill="#b8c9e1"
          // stroke="#b8c9e1"
          fill="white"
          stroke="white"
          strokeWidth="1"
          dominantBaseline="middle"
          textAnchor="middle"
        >
          {text}
        </text>
      </svg>
    );
  };

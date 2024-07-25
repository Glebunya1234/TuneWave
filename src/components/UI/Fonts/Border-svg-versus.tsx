import type { MarqueeProps } from "@/types/TypeSetSstateForUseState/type";

export const BorderText: React.FC<MarqueeProps> = ({ text }) => {
    return (
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <text
          x="50%"
          y="63.5%"
          // fill="none"
          // stroke="#b8c9e1"
          fill="none"
          stroke="white"
          strokeWidth="1"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {text}
        </text>
      </svg>
    );
  };
  
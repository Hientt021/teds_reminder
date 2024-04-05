import * as React from "react";
import "./styles.css";
export interface IMainLoaderProps {}

export const dotRadius = 20;
export const edgeValue = 100;
export const startPoint = 50;

export default function MainLoader(props: IMainLoaderProps) {
  const dotColors = ["#c20f00", "#ffdd22", "#2374c6", "#000000"];

  return (
    <div className="flex justify-center items-center min-h-screen">
      <svg className=" spin-around " width="200" height="200">
        {dotColors.map((color, i) => {
          const index = i + 1;
          const cx = i < 2 ? startPoint : startPoint + edgeValue;
          const cy = index % 2 ? startPoint : startPoint + edgeValue;
          return (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={dotRadius}
              fill={color}
              className="move-in"
            />
          );
        })}
      </svg>
    </div>
  );
}

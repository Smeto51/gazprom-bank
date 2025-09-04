"use client";

import { UseFulIItem } from "./data/type";

type Params = {
  item: UseFulIItem;
  setIsPaused: (paused: boolean) => void;
  currentSlidesIndex: number;
  progressBars: number[];
};

export const ProgressBars = ({
  item,
  setIsPaused,
  currentSlidesIndex,
  progressBars,
}: Params) => {
  return (
    <div className="absolute rounded-2xl w-full pt-4 pr-5 pb-4 pl-5 flex  justify-between gap-1">
      {item.slides.map((_, index) => (
        <div
          key={index}
          className="flex-1 rounded-[1px] h-1 m-1 bg-[hsla(0,0%,100%,0.08)] "
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className={`h-full rounded-[2px] transition-all duration-100 ${
              index === currentSlidesIndex
                ? "bg-white"
                : index < currentSlidesIndex
                ? "bg-white"
                : ""
            }`}
            style={{
              width: `${
                index === currentSlidesIndex
                  ? progressBars[index]
                  : index < currentSlidesIndex
                  ? 100
                  : 0
              }%`,
            }}
          ></div>
        </div>
      ))}
    </div>
  );
};

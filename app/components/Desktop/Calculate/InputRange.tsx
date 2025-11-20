"use client";

type PropsInputRange = {
  MIN: number;
  MAX: number;
  STEP: number;
  value: number;
  handleRangeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  typeText?: string;
};

export const InputRange = ({
  MIN,
  MAX,
  STEP,
  value,
  typeText = "₽",
  handleRangeChange,
}: PropsInputRange) => {
  const percent = ((value - MIN) / (MAX - MIN)) * 100;
  return (
    <div className="relative">
      <div className="relative mt-2">
        <div className="absolute inset-0 rounded-full bg-gray-200 h-2" />
        <div
          className="absolute inset-y-4 left-0 top-0 rounded-full bg-blue-500 cursor-pointer"
          style={{ width: `${percent}%` }}
        />

        <input
          type="range"
          min={MIN}
          max={MAX}
          step={STEP}
          value={value || MIN}
          onChange={handleRangeChange}
          className="relative w-full appearance-none bg-transparent items-center bottom-1.5 cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:w-4
                [&::-webkit-slider-thumb]:h-4
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-white
                [&::-webkit-slider-thumb]:border
                [&::-webkit-slider-thumb]:border-blue-500
                [&::-webkit-slider-thumb]:shadow
                [&::-webkit-slider-thumb]:cursor-pointer
                [&::-moz-range-thumb]:w-4
                [&::-moz-range-thumb]:h-4
                [&::-moz-range-thumb]:rounded-full
                [&::-moz-range-thumb]:bg-white
                [&::-moz-range-thumb]:border
                [&::-moz-range-thumb]:border-blue-500
                [&::-moz-range-thumb]:cursor-pointer"
        />
      </div>
      <div className="realtive text-gray-400 text-[14px]">
        <div className="mt-1 mb-5">
          {typeText === "₽" ? (
            <>
              <span className="">от {MIN.toLocaleString("ru-Ru")} ₽</span>
              <span className="absolute right-3">
                до {MAX.toLocaleString("ru-Ru")} ₽
              </span>
            </>
          ) : (
            <>
              <span className="">{MIN} месяцев</span>
              <span className="absolute right-3">{MAX} месяцев</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

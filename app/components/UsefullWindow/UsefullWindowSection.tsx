"use client";

import { USESFUL_SLIDER, USESFUL_TIPS } from "./constants";
import { UsefullWindow } from "./UsefullWindow";
import { useEffect, useMemo, useState } from "react";

export const SectionUsefull = () => {
  const [isUsefullWindowOpen, setIsUsefullWindowOpen] = useState(false);
  const [selectedPos, setSelectedPos] = useState<number | null>(null);

  const [completed, setCompleted] = useState<boolean[]>(() =>
    new Array(USESFUL_TIPS.length).fill(false)
  );

  const tipsWithIndex = useMemo(
    () => USESFUL_TIPS.map((item, index) => ({ ...item, _index: index })),
    []
  );

  const sortedTips = useMemo(() => {
    const arr = tipsWithIndex.slice();
    arr.sort((a, b) => {
      const done = Number(completed[a._index]) - Number(completed[b._index]);
      return done !== 0 ? done : a._index - b._index;
    });

    return arr;
  }, [tipsWithIndex, completed]);

  const sortedSliders = useMemo(() => {
    const arr = USESFUL_SLIDER.map((_, index) => ({ _index: index }));
    arr.sort((a, b) => {
      const done = Number(completed[a._index]) - Number(completed[b._index]);
      return done !== 0 ? done : a._index - b._index;
    });
    return arr.map((x) => x._index);
  }, [completed]);

  const handleTipClick = (index: number) => {
    const pos = sortedSliders.indexOf(index);
    setSelectedPos(pos >= 0 ? pos : 0);
    setIsUsefullWindowOpen(true);
  };

  const handleCloseUsefullWindow = () => {
    setIsUsefullWindowOpen(false);
  };

  const handleSliderCompleted = (sliderIndex: number) => {
    setCompleted((prev) => {
      if (prev[sliderIndex]) return prev;
      const copy = [...prev];
      copy[sliderIndex] = true;
      return copy;
    });
  };

  useEffect(() => {
    try {
      const raw = localStorage.getItem("useful_completed");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length === USESFUL_TIPS.length) {
          setCompleted(parsed);
        } else {
          console.warn("Формат сохранённых данных не совпадает с ожидаемым");
        }
      }
    } catch (err) {
      console.warn("Ошибка при чтении данных из localStorage:", err);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("useful_completed", JSON.stringify(completed));
    } catch (err) {
      console.warn("Не удалось сохранить в localStorage:", err);
    }
  }, [completed]);

  return (
    <>
      <section className="ml-auto mr-auto w-full">
        {" "}
        <div className="flex gap-3 overflow-x-auto overflow-y-hidden scrollbar-hide w-full pl-4 pr-4">
          {sortedTips.map((item) => (
            <div
              key={item.id}
              className="relative flex-shrink-0 flex items-center justify-center min-w-24 w-24 cursor-pointer"
              onClick={() => handleTipClick(item._index)}
            >
              <div
                className={`flex w-[96px] h-[108px] items-center justify-center border-1 rounded-2xl
               ${
                 completed[item._index]
                   ? "border-gray-500"
                   : "border-orange-400"
               }`}
              >
                <picture>
                  <source type="image/webp" srcSet={item.srcsetWebp} />
                  <source type="image/png" srcSet={item.srcsetPng} />
                  <img
                    className="rounded-xl"
                    src={item.srcImg}
                    alt={item.title}
                  />
                </picture>
              </div>
              <div className="absolute rounded-xl w-22 h-25 bg-[rgba(30,34,46,0.32)]" />
              <p className="font-semibold text-[12px] leading-4 absolute top-4 w-19 text-white">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </section>
      {isUsefullWindowOpen && (
        <UsefullWindow
          onClose={handleCloseUsefullWindow}
          startAtiveSliderIndex={selectedPos ?? 0}
          sliders={sortedSliders}
          onSliderCompleted={handleSliderCompleted}
          completed={completed}
        />
      )}
    </>
  );
};

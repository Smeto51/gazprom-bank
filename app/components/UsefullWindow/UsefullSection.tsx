"use client";

import { USESFUL_SLIDER, USESFUL_TIPS } from "./data/constants";
import { UsefullWindow } from "./UsefullWindow";
import { useEffect, useMemo, useState } from "react";
import { useImagePreload } from "../../hooks/usePreloadImage";
import {
  loadUsefulLocalCompleted,
  saveUsefulLocalCompleted,
} from "./utils/saveLoadUsefullLocal";
import { sortTips } from "./utils/sortedUseFull";
import { useModalContext } from "@/app/contextApi/ModalContext";

export const SectionUsefull = () => {
  const { isUsefullWindowOpen, setIsUsefullWindowOpen } = useModalContext();
  const [selectedPos, setSelectedPos] = useState<number | null>(null);

  const preloadUrls = useMemo(() => {
    const tipImgs = USESFUL_TIPS.flatMap((t) => [
      t.srcImg,
      t.srcsetWebp,
      t.srcsetPng,
    ]);

    const sliderImgs = USESFUL_SLIDER.flatMap((s) => [
      s.iconImg,
      ...s.slides.map((sl) => sl.iconBg),
    ]);

    return [...tipImgs, ...sliderImgs].filter(Boolean);
  }, []);

  useImagePreload(preloadUrls);

  // === Иниализация слайдеров ===
  const [completed, setCompleted] = useState<boolean[]>(() =>
    Array(USESFUL_TIPS.length).fill(false)
  );

  // === Загружаем просмотренные Слайдеры ===
  useEffect(() => {
    setCompleted(loadUsefulLocalCompleted(USESFUL_TIPS.length));
  }, []);

  // === Сохраняем просмотренные Слайдеры ===
  useEffect(() => {
    saveUsefulLocalCompleted(completed);
  }, [completed]);

  // === Преобразуем Слайдеры ===
  const tipsWithIndex = useMemo(
    () => USESFUL_TIPS.map((item, index) => ({ ...item, index })),
    []
  );

  // === Сортируем Блоки Слайдеров ===
  const sortedTips = useMemo(
    () => sortTips(tipsWithIndex, completed),
    [tipsWithIndex, completed]
  );

  // === Сортируем Сами Слайдеры ===
  const sortedSliders = useMemo(
    () =>
      sortTips(
        USESFUL_SLIDER.map((_, index) => ({ index })),
        completed
      ).map((x) => x.index),
    [completed]
  );

  // === Запоминаем клик по подсказке ===
  const handleTipClick = (index: number) => {
    setSelectedPos(index);
    setIsUsefullWindowOpen(true);
  };

  // === Закрываем Слайдеры ===
  const handleCloseUsefullWindow = () => setIsUsefullWindowOpen(false);

  // === Фиксируем прочитанные слайдеры ===
  const handleSliderCompleted = (sliderIndex: number) => {
    setCompleted((prev) => {
      if (prev[sliderIndex]) return prev;
      const copy = [...prev];
      copy[sliderIndex] = true;
      return copy;
    });
  };

  return (
    <>
      <section className="ml-auto mr-auto w-full ">
        {" "}
        <div className="flex gap-3 overflow-x-auto overflow-y-hidden scrollbar-hide w-full pl-4 pr-4 justify-center">
          {sortedTips.map((item) => (
            <div
              key={item.id}
              className="relative flex-shrink-0 flex items-center justify-center min-w-24 w-24 cursor-pointer"
              onClick={() => handleTipClick(item.index)}
            >
              <div
                className={`flex w-[96px] h-[108px] items-center justify-center border-1 rounded-2xl
               ${
                 completed[item.index] ? "border-gray-500" : "border-orange-400"
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
          startActiveSliderIndex={selectedPos ?? 0}
          sliders={sortedSliders}
          onSliderCompleted={handleSliderCompleted}
          completed={completed}
        />
      )}
    </>
  );
};

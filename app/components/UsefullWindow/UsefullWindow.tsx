"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { MiniCrossSVG } from "../../ui/SvgElements";
import { UseFulIItem, UsefullWindowProps } from "./data/type";
import { USESFUL_SLIDER } from "./data/constants";
import { useImagePreload } from "../../hooks/usePreloadImage";
import { useSliderNavigation } from "./hook/useSliderNavigation";
import { useProgressSlide } from "./hook/useProgressSlide";
import { useAutoCenterScroll } from "./hook/useAutoCenterScroll";
import { StoryCard } from "./StoryCard";
import { ProgressBars } from "./ProgressBars";

export const UsefullWindow = ({
  onClose = () => {},
  startActiveSliderIndex = 0,
  onSliderCompleted = () => {},
  sliders,
}: UsefullWindowProps) => {
  const origSliders = useMemo(
    () => USESFUL_SLIDER.map((_, index) => index),
    []
  );

  // === Порядок показа ===
  const newIndexRef = useRef<number[]>(
    sliders && sliders.length ? sliders : origSliders
  );

  const viewSliders = newIndexRef.current;

  const [activeSliderIndex, setActiveSliderIndex] = useState(
    startActiveSliderIndex
  );

  // === Текущий индекс слайда для каждого слайдера ===
  const [currentSlides, setCurrentSlides] = useState<number[]>(
    USESFUL_SLIDER.map(() => 0) // Инициализируем все нулями
  );

  const [progressBars, setProgressBars] = useState<number[][]>(() =>
    USESFUL_SLIDER.map((slider) => Array(slider.slides.length).fill(0))
  );

  const [isPaused, setIsPaused] = useState(false);
  const [shouldClose, setShouldClose] = useState(false);
  const [completedIndex, setCompletedIndex] = useState<number | null>(null);

  const sliderContainerRef = useRef<HTMLDivElement>(null);
  const sliderRefs = useRef<(HTMLDivElement | null)[]>([]);

  // === Прелоад соседних слайдеров картинок ===
  const preloadUrls = useMemo(() => {
    const idx = activeSliderIndex;
    if (idx == null) return [];
    const slides = USESFUL_SLIDER[idx].slides;
    const cur = currentSlides[idx] ?? 0;
    const prev = (cur - 1 + slides.length) % slides.length;
    const next = (cur + 1) % slides.length;

    return [
      slides[cur]?.iconBg,
      slides[prev]?.iconBg,
      slides[next]?.iconBg,
      USESFUL_SLIDER[idx]?.iconImg,
    ].filter(Boolean) as string[];
  }, [activeSliderIndex, currentSlides]);

  useImagePreload(preloadUrls);

  const { nextSlide, backSlide } = useSliderNavigation({
    currentSlides,
    setCurrentSlides,
    viewSliders,
    setShouldClose,
    setActiveSliderIndex,
    setProgressBars,
    setCompletedIndex,
  });

  useProgressSlide({
    isPaused,
    activeSliderIndex,
    currentSlides,
    setProgressBars,
    onSlideEnd: () => nextSlide(activeSliderIndex),
  });

  useAutoCenterScroll({
    viewSliders,
    activeSliderIndex,
    sliderRefs,
    sliderContainerRef,
  });

  useEffect(() => {
    if (completedIndex != null) {
      onSliderCompleted(completedIndex);
      setCompletedIndex(null);
    }
  }, [onSliderCompleted, completedIndex]);

  useEffect(() => {
    if (shouldClose) {
      onClose();
      setShouldClose(false);
    }
  }, [shouldClose, onClose]);

  // === Только на случай изменения родителя ===
  useEffect(() => {
    setActiveSliderIndex(startActiveSliderIndex);
  }, [startActiveSliderIndex]);

  const handleSliderClick = (index: number) => {
    setActiveSliderIndex(index);
  };

  return (
    <div className="bg-[#1e222e] fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center min-w-[320px] z-100 p-0 ">
      <div className="w-full h-full flex items-center justify-center min-[768]:rounded-2xl">
        <div
          ref={sliderContainerRef}
          className="flex overflow-x-auto w-full h-full min-[768]:px-4 min-[768]:py-8 scrollbar-hide "
        >
          {viewSliders.map((sliderIndex, origIndex) => {
            const item: UseFulIItem = USESFUL_SLIDER[sliderIndex];
            const currentData = item.slides[currentSlides[sliderIndex]];
            return (
              <div
                key={item.id}
                ref={(e) => {
                  sliderRefs.current[origIndex] = e;
                }}
                className={`relative w-screen h-full flex-shrink-0 
                  min-[768px]:min-w-[360px] 
                  min-[768px]:min-h-[640px] 
                  min-[768px]:w-[44.9438202247vh] 
                  min-[768px]:rounded-2xl overflow-hidden`}
                onClick={() => handleSliderClick(sliderIndex)}
              >
                <div className="flex h-full absolute w-full">
                  <div
                    className="w-[50%] z-10"
                    onClick={(e) => {
                      e.stopPropagation();
                      backSlide(sliderIndex);
                    }}
                  ></div>
                  <div
                    className="w-[50%] z-10"
                    onClick={(e) => {
                      e.stopPropagation();
                      nextSlide(sliderIndex);
                    }}
                  ></div>
                </div>

                <ProgressBars
                  item={item}
                  currentSlidesIndex={currentSlides[sliderIndex]}
                  progressBars={progressBars[sliderIndex]}
                  setIsPaused={setIsPaused}
                />
                <picture className="">
                  <img
                    className="w-full max-[767px]:h-full max-[767px]:object-cover"
                    src={currentData.iconBg}
                    alt=""
                  />
                </picture>
                <div className="flex absolute items-center top-11 pl-6 gap-3 text-white font-medium">
                  <div className="w-10 h-10 rounded-[50%]">
                    <picture className="">
                      <img
                        className="w-10 h-10 rounded-[50%] "
                        src={item.iconImg}
                        alt=""
                      />
                    </picture>
                  </div>
                  <p>{item.iconText}</p>
                </div>
                <StoryCard currentData={currentData} />

                <div className="absolute flex top-10 right-4 gap-8">
                  <button
                    className="w-6 h-6 min-w-6 bg-white/10 rounded-[50%] z-100"
                    onClick={onClose}
                  >
                    <MiniCrossSVG />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

"use client";

import { Dispatch, SetStateAction, useEffect } from "react";

type Params = {
  isPaused: boolean;
  setProgressBars: Dispatch<SetStateAction<number[][]>>;
  activeSliderIndex: number;
  currentSlides: number[];
  onSlideEnd: () => void;
};

const TICK_MS = 100;
const SLIDE_DURATION_MS = 70000;

export const useProgressSlide = ({
  isPaused,
  setProgressBars,
  activeSliderIndex,
  currentSlides,
  onSlideEnd,
}: Params) => {
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setProgressBars((prev) => {
        const newProgress = [...prev];
        const activeSlider = activeSliderIndex;
        const currentSlideIndex = currentSlides[activeSlider];
        newProgress[activeSlider] = [...newProgress[activeSlider]];
        newProgress[activeSlider][currentSlideIndex] = Math.min(
          newProgress[activeSlider][currentSlideIndex] +
            100 / (SLIDE_DURATION_MS / TICK_MS),
          100
        );

        if (newProgress[activeSlider][currentSlideIndex] >= 100) {
          setTimeout(onSlideEnd, 0);
        }

        return newProgress;
      });
    }, TICK_MS);

    return () => clearInterval(interval);
  }, [activeSliderIndex, currentSlides, isPaused, onSlideEnd, setProgressBars]);
};

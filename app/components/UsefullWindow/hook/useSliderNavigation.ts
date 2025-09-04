"use client";

import { Dispatch, SetStateAction, useCallback } from "react";
import { USESFUL_SLIDER } from "../data/constants";

type Params = {
  currentSlides: number[];
  setCurrentSlides: Dispatch<SetStateAction<number[]>>;
  viewSliders: number[];
  setShouldClose: Dispatch<SetStateAction<boolean>>;
  setActiveSliderIndex: Dispatch<SetStateAction<number>>;
  setProgressBars: Dispatch<SetStateAction<number[][]>>;
  setCompletedIndex: Dispatch<SetStateAction<number | null>>;
};

export const useSliderNavigation = ({
  currentSlides,
  setCurrentSlides,
  viewSliders,
  setShouldClose,
  setActiveSliderIndex,
  setProgressBars,
  setCompletedIndex,
}: Params) => {
  const nextSlide = useCallback(
    (sliderOrigIndex: number) => {
      const slidesCount = USESFUL_SLIDER[sliderOrigIndex].slides.length;
      const wasLast = currentSlides[sliderOrigIndex] === slidesCount - 1;

      setCurrentSlides((prev) => {
        const next = [...prev];
        if (wasLast) {
          const pos = viewSliders.indexOf(sliderOrigIndex);
          if (pos === -1) return prev;

          const isLastSlider = pos === viewSliders.length - 1;
          if (isLastSlider) {
            setShouldClose(true);
            return prev;
          }

          const nextSlider = viewSliders[pos + 1];

          setActiveSliderIndex(nextSlider);
          next[nextSlider] = 0;
        } else {
          next[sliderOrigIndex] = (next[sliderOrigIndex] + 1) % slidesCount;
        }
        return next;
      });

      setProgressBars((prev) => {
        const copy = [...prev];
        copy[sliderOrigIndex] = new Array(slidesCount).fill(0);
        return copy;
      });

      if (wasLast) setCompletedIndex(sliderOrigIndex);
    },
    [
      currentSlides,
      setActiveSliderIndex,
      setCompletedIndex,
      setCurrentSlides,
      setProgressBars,
      setShouldClose,
      viewSliders,
    ]
  );

  const backSlide = useCallback(
    (sliderOrigIndex: number) => {
      const pos = viewSliders.indexOf(sliderOrigIndex);
      setCurrentSlides((prev) => {
        const next = [...prev];
        const slidesCount = USESFUL_SLIDER[sliderOrigIndex].slides.length;

        if (next[sliderOrigIndex] === 0) {
          if (pos === 0) return prev;
          const prevOrig = viewSliders[pos - 1];
          setActiveSliderIndex(prevOrig);
          next[prevOrig] = USESFUL_SLIDER[prevOrig].slides.length - 1;
        } else {
          next[sliderOrigIndex] =
            (next[sliderOrigIndex] - 1 + slidesCount) % slidesCount;
        }
        return next;
      });

      setProgressBars((prev) => {
        const copy = [...prev];
        copy[sliderOrigIndex] = new Array(
          USESFUL_SLIDER[sliderOrigIndex].slides.length
        ).fill(0);
        return copy;
      });
    },
    [setActiveSliderIndex, setCurrentSlides, setProgressBars, viewSliders]
  );

  return { nextSlide, backSlide } as const;
};

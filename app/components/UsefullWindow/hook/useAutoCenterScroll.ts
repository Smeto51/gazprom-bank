"use client";

import { RefObject, useCallback, useEffect, useRef } from "react";

type Params = {
  viewSliders: number[];
  activeSliderIndex: number;
  sliderRefs: RefObject<(HTMLDivElement | null)[]>;
  sliderContainerRef: RefObject<HTMLDivElement | null>;
};

export const useAutoCenterScroll = ({
  viewSliders,
  sliderRefs,
  sliderContainerRef,
  activeSliderIndex,
}: Params) => {
  const firstPosition = useRef(false);

  const scrollToActiveSlider = useCallback(
    (origIndex: number, smooth = true) => {
      const pos = viewSliders.indexOf(origIndex);
      if (pos === -1) return;

      const slider = sliderRefs.current[pos];
      const container = sliderContainerRef.current;
      if (!slider || !container) return;

      const sliderLeft = slider.offsetLeft;
      const sliderWidth = slider.offsetWidth;
      const containerWidth = container.offsetWidth;

      container.scrollTo({
        left: sliderLeft - (containerWidth - sliderWidth) / 2,
        behavior: smooth ? "smooth" : "auto",
      });
    },
    [viewSliders, sliderContainerRef, sliderRefs]
  );

  useEffect(() => {
    scrollToActiveSlider(activeSliderIndex);
    if (!firstPosition.current) {
      scrollToActiveSlider(activeSliderIndex, false);
      firstPosition.current = true;
    } else {
      scrollToActiveSlider(activeSliderIndex, true);
    }
  }, [activeSliderIndex, scrollToActiveSlider]);
};

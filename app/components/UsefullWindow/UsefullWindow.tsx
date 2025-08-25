"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { MiniCrossSVG } from "../../ui/SvgElements";
import { UseFulIItem } from "./type";
import { USESFUL_SLIDES } from "./constants";

interface UsefullWindowProps {
  onClose?: () => void;
  startAtiveSliderIndex?: number;
  onSliderCompleted?: (sliderIndex: number) => void;
}

export const UsefullWindow = ({
  onClose = () => {},
  startAtiveSliderIndex = 0,
  onSliderCompleted = () => {},
}: UsefullWindowProps) => {
  const [activeSliderIndex, setActiveSliderIndex] = useState(
    startAtiveSliderIndex
  );
  const [currentSlides, setCurrentSlides] = useState<number[]>(
    USESFUL_SLIDES.map(() => 0) // Инициализируем все нулями
  );
  const [progressBars, setProgressBars] = useState<number[][]>(
    USESFUL_SLIDES.map(() => new Array(USESFUL_SLIDES[0].slides.length).fill(0))
  );
  const [isPaused, setIsPaused] = useState(false);
  const [shouldClose, setShouldClose] = useState(false);

  const sliderContainerRef = useRef<HTMLDivElement>(null);
  const sliderRefs = useRef<(HTMLDivElement | null)[]>([]);

  const firstPosition = useRef(false);

  const scrollToActiveSlider = useCallback((index: number, smooth = true) => {
    if (sliderRefs.current[index] && sliderContainerRef.current) {
      const slider = sliderRefs.current[index];
      const container = sliderContainerRef.current;
      const sliderLeft = slider.offsetLeft;
      const sliderWidth = slider.offsetWidth;
      const containerWidth = container.offsetWidth;

      container.scrollTo({
        left: sliderLeft - (containerWidth - sliderWidth) / 2,
        behavior: smooth ? "smooth" : "auto",
      });
    }
  }, []);

  const [completedIndex, setCompletedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (completedIndex != null) {
      onSliderCompleted(completedIndex);
      setCompletedIndex(null);
    }
  }, [onSliderCompleted, completedIndex]);

  const nextSlide = useCallback(
    (sliderIndex: number) => {
      const slidesCount = USESFUL_SLIDES[sliderIndex].slides.length;
      const wasLast = currentSlides[sliderIndex] === slidesCount - 1;

      setCurrentSlides((prev) => {
        const newSlides = [...prev];

        if (wasLast) {
          if (sliderIndex === USESFUL_SLIDES.length - 1) {
            setShouldClose(true);
            return prev;
          }
          setActiveSliderIndex(sliderIndex + 1);
          newSlides[sliderIndex + 1] = 0;
        } else {
          newSlides[sliderIndex] = (newSlides[sliderIndex] + 1) % slidesCount;
        }

        return newSlides;
      });

      setProgressBars((prev) => {
        const newProgress = [...prev];
        newProgress[sliderIndex] = new Array(
          USESFUL_SLIDES[sliderIndex].slides.length
        ).fill(0);
        return newProgress;
      });

      if (wasLast) {
        setCompletedIndex(sliderIndex);
      }
    },
    [currentSlides]
  );

  useEffect(() => {
    if (shouldClose) {
      onClose();
      setShouldClose(false);
    }
  }, [shouldClose, onClose]);

  const backSlide = useCallback((sliderIndex: number) => {
    setCurrentSlides((prev) => {
      const newSlides = [...prev];
      const slidesCount = USESFUL_SLIDES[sliderIndex].slides.length;
      if (newSlides[sliderIndex] === 0) {
        if (sliderIndex === 0) return prev;
        setActiveSliderIndex(sliderIndex - 1);
        newSlides[sliderIndex - 1] =
          USESFUL_SLIDES[sliderIndex - 1].slides.length - 1;
      } else {
        newSlides[sliderIndex] = (newSlides[sliderIndex] - 1) % slidesCount;
      }
      return newSlides;
    });

    setProgressBars((prev) => {
      const newProgress = [...prev];
      newProgress[sliderIndex] = new Array(
        USESFUL_SLIDES[sliderIndex].slides.length
      ).fill(0);
      return newProgress;
    });
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setProgressBars((prev) => {
        const newProgress = [...prev];
        const activeSlider = activeSliderIndex;
        const currentSlideIndex = currentSlides[activeSlider];
        newProgress[activeSlider] = [...newProgress[activeSlider]];
        newProgress[activeSlider][currentSlideIndex] = Math.min(
          newProgress[activeSlider][currentSlideIndex] + 100 / (70000 / 100),
          100
        );

        if (newProgress[activeSlider][currentSlideIndex] >= 100) {
          setTimeout(() => nextSlide(activeSlider), 0);
        }

        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [activeSliderIndex, currentSlides, isPaused, nextSlide]);

  // === Только на случай изменения родителя ===
  useEffect(() => {
    setActiveSliderIndex(startAtiveSliderIndex);
  }, [startAtiveSliderIndex]);

  useEffect(() => {
    scrollToActiveSlider(activeSliderIndex);
    if (!firstPosition.current) {
      scrollToActiveSlider(activeSliderIndex, false);
      firstPosition.current = true;
    } else {
      scrollToActiveSlider(activeSliderIndex, true);
    }
  }, [activeSliderIndex, scrollToActiveSlider]);

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
          {USESFUL_SLIDES.map((item: UseFulIItem, sliderIndex: number) => {
            const currentData = item.slides[currentSlides[sliderIndex]];
            return (
              <div
                key={item.id}
                ref={(e) => {
                  sliderRefs.current[sliderIndex] = e;
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
                          index === currentSlides[sliderIndex]
                            ? "bg-white"
                            : index < currentSlides[sliderIndex]
                            ? "bg-white"
                            : ""
                        }`}
                        style={{
                          width: `${
                            index === currentSlides[sliderIndex]
                              ? progressBars[sliderIndex][index]
                              : index < currentSlides[sliderIndex]
                              ? 100
                              : 0
                          }%`,
                        }}
                      ></div>
                    </div>
                  ))}
                </div>
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
                <div className="absolute pt-11 pr-6 pb-8 pl-6 bottom-0 left-0 right-0 text-white">
                  <h4 className="font-semibold text-[20px] leading-6 ">
                    {currentData.title}
                  </h4>

                  <p className="text-[16px] leading-5 mt-2">
                    {currentData.description}
                  </p>
                  {currentData.linkText && (
                    <div className="flex mt-6 items-center justify-center relative z-1">
                      <Link
                        href="#"
                        className="h-12 w-full flex items-center justify-center relative"
                      >
                        <div className="absolute bg-[#2b61ec] top-0 left-0 w-full h-full -z-1 rounded-md "></div>
                        <span className="text-[18px]">
                          {currentData.linkText}
                        </span>
                      </Link>
                    </div>
                  )}
                </div>
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

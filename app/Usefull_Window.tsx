"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { USESFUL_SLIDES } from "./Variable";
import { MiniCrossSVG } from "./ui/SvgElements";

export const UsefullWindow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = USESFUL_SLIDES[0].slides;

  const [progressBars, setProgressBars] = useState<number[]>(
    new Array(slides.length).fill(0)
  );
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setProgressBars(new Array(slides.length).fill(0));
  }, []);

  const backSlide = useCallback(() => {
    if (currentSlide == 0) return;
    setCurrentSlide((prev) => (prev - 1) % slides.length);
    setProgressBars(new Array(slides.length).fill(0));
  }, [currentSlide, slides.length]);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setProgressBars((prev) => {
        const newProgress = [...prev];
        newProgress[currentSlide] = Math.min(
          newProgress[currentSlide] + 100 / (7000 / 100),
          100
        );

        if (newProgress[currentSlide] >= 100) {
          setTimeout(nextSlide, 0);
        }

        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [currentSlide, isPaused, nextSlide]);

  return (
    <div className="bg-[#1e222e] fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center min-w-[320px] z-100 p-0 ">
      <div className="w-full flex items-center ustify-center h-full min-[768]:rounded-2xl">
        <div className="flex gap-4 overflow-x-auto w-full px-4 py-8">
          {USESFUL_SLIDES.map((item) => {
            const currentData = item.slides[currentSlide];
            return (
              <div
                key={item.id}
                className="relative min-[768]:min-w-[360px] min-[768]:min-h-[640px] h-[80vh] w-[44.9438202247vh] 
                block min-[768]:rounded-2xl overflow-hidden flex-shrink-0"
              >
                <div className="flex h-full absolute w-full">
                  <div className="w-[50%] z-2.5" onClick={backSlide}></div>
                  <div className="w-[50%] z-2.5" onClick={nextSlide}></div>
                </div>
                <div className="absolute rounded-2xl w-full pt-4 pr-5 pb-4 pl-5 flex ">
                  {slides.map((_, index) => (
                    <div
                      key={index}
                      className="w-[20%] rounded-[1px] h-1 m-1 bg-[hsla(0,0%,100%,0.08)] "
                      onMouseEnter={() => setIsPaused(true)}
                      onMouseLeave={() => setIsPaused(false)}
                    >
                      <div
                        className={`h-full rounded-[2px] transition-all duration-100 ${
                          index === currentSlide
                            ? "bg-white"
                            : index < currentSlide
                            ? "bg-white"
                            : ""
                        }`}
                        style={{
                          width: `${
                            index === currentSlide
                              ? progressBars[index]
                              : index < currentSlide
                              ? 100
                              : 0
                          }%`,
                        }}
                      ></div>
                    </div>
                  ))}
                </div>
                <picture className="">
                  <img className="w-full" src={currentData.iconBg} alt="" />
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
                  <h4 className="font-semibold text-[20px] leading-10">
                    {currentData.title}
                  </h4>
                  <p className="text-[18px]">{currentData.description}</p>
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
                  <button className="w-6 h-6 min-w-6 bg-[#2b61ec] rounded-[50%]">
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

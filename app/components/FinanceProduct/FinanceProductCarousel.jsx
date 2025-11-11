"use client";

import { SVGComponet } from "@/app/ui/SvgElements";
import { cloneElement, useEffect, useRef, useState } from "react";

export const Carousel = ({ children }) => {
  const pages = children;
  const [offset, setOffset] = useState(0);
  const itemsWidthRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const scrollContainerRef = useRef(null);
  const [pageVisible, setPageVisible] = useState(2);
  //const pageVisible = window.innerWidth >= 1280 ? 3 : 2;
  useEffect(() => {
    const checkScreenSize = () => {
      const isLarge = window.innerWidth >= 1024;
      setPageVisible(window.innerWidth >= 1280 ? 3 : 2);
      const wasLarge = isLargeScreen;

      setIsLargeScreen(isLarge);
      if (isLarge !== wasLarge) {
        setOffset(0);
        setCurrentIndex(0);
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollLeft = 0;
        }
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, [isLargeScreen]);

  const handleNextClick = () => {
    const pageWidth =
      itemsWidthRef.current.getBoundingClientRect().width / pageVisible - 4;
    console.log(pageWidth);
    const maxIndex = pages.length - pageVisible;
    setCurrentIndex((current) => {
      const newIndex = Math.min(current + 1, maxIndex);
      setOffset(-newIndex * pageWidth);
      return newIndex;
    });
  };

  const handleBackClick = () => {
    const pageWidth =
      itemsWidthRef.current.getBoundingClientRect().width / pageVisible - 4;

    setCurrentIndex((current) => {
      const newIndex = Math.max(current - 1, 0);
      setOffset(-newIndex * pageWidth);
      return newIndex;
    });
  };

  const addStyle = (child, index, isVisible) => {
    if (!isLargeScreen) {
      return cloneElement(child, { key: index });
    }
    return cloneElement(child, {
      key: index,
      style: {
        ...child.props.style,
        opacity: isVisible ? "100" : "0",
        pointerEvents: isVisible ? "auto" : "none",
      },
    });
  };

  return (
    <div
      className="h-45 lg:h-[560px] pl-4 pr-4
      min-lg:pl-11 lg:pr-11 
    "
    >
      <div
        ref={scrollContainerRef}
        className="flex h-full w-full lg:overflow-hidden overflow-y-hidden overflow-x-auto scrollbar-hide duration-200 "
      >
        <div
          ref={itemsWidthRef}
          className="h-full w-full flex transition-transform duration-300 ease-in-out
          gap-4 "
          style={{ transform: `translateX(${offset}px)` }}
        >
          {pages.map((child, index) => {
            const isVisible =
              index >= currentIndex && index < currentIndex + pageVisible;
            return addStyle(child, index, isVisible);
          })}
        </div>
      </div>
      <button
        onClick={handleNextClick}
        disabled={currentIndex >= pages.length - 2}
        className={`absolute top-1/2 right-8 bg-white rounded-full shadow-lg transition-all duration-200
          max-lg:hidden cursor-pointer ${
            currentIndex >= pages.length - 2
              ? "opacity-0 pointer-events-none"
              : ""
          }`}
      >
        <div className="rounded-full bg-[#ebebeb] w-15 scale-80">
          <div className="scale-80 ">
            <SVGComponet.ArrowNext />
          </div>
        </div>
      </button>
      <button
        onClick={handleBackClick}
        disabled={currentIndex === 0}
        className={`absolute top-1/2 left-3 bg-white rounded-full shadow-lg transition-all duration-200
        max-lg:hidde cursor-pointer  ${
          currentIndex === 0 ? "opacity-0 pointer-events-none" : ""
        }`}
      >
        <div className="rounded-full bg-[#ebebeb] w-15 scale-80">
          <div className="scale-80 rotate-180">
            <SVGComponet.ArrowNext />
          </div>
        </div>
      </button>
    </div>
  );
};

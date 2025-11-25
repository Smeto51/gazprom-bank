"use client";

import { SVGComponet } from "@/app/ui/SvgElements";
import { cloneElement, useEffect, useRef, useState } from "react";

export const Carousel = ({
  children,
  lg = 2,
  xl = 3,
  conteinerStyle = "h-45 lg:h-[560px] pl-4 pr-4 min-lg:pl-11 lg:pr-11",
  arrowNext = "right-8",
  arrowPrev = "left-4",
}) => {
  const pages = children;
  const [offset, setOffset] = useState(0);
  const itemsWidthRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const scrollContainerRef = useRef(null);
  const [pageVisible, setPageVisible] = useState(2);

  const getStep = () => {
    if (!itemsWidthRef.current) return 0;
    const track = itemsWidthRef.current;
    const firstChild = track.children[0];
    if (!firstChild) return 0;

    const cardWidth = firstChild.getBoundingClientRect().width;

    const styles = getComputedStyle(track);

    const gap = parseFloat(styles.columnGap || styles.gap || "0") || 0;
    return Math.round(cardWidth + gap);
  };
  useEffect(() => {
    const checkScreenSize = () => {
      const isLarge = window.innerWidth >= 1024;
      setPageVisible(window.innerWidth >= 1280 ? xl : lg);
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
  }, [isLargeScreen, lg, xl]);

  const handleNextClick = () => {
    //const pageWidth =
    //  itemsWidthRef.current.getBoundingClientRect().width / pageVisible - 4;
    const step = getStep();
    if (!step) return;

    const maxIndex = Math.max(0, pages.length - pageVisible); //pages.length - pageVisible;
    setCurrentIndex((current) => {
      const newIndex = Math.min(current + 1, maxIndex);
      setOffset(-newIndex * step);
      return newIndex;
    });
  };

  const handleBackClick = () => {
    const step = getStep();
    if (!step) return;

    setCurrentIndex((current) => {
      const newIndex = Math.max(current - 1, 0);
      setOffset(-newIndex * step);
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
    <div className={`${conteinerStyle}`}>
      <div
        ref={scrollContainerRef}
        className="flex h-full w-full lg:overflow-hidden overflow-y-hidden overflow-x-auto scrollbar-hide duration-200"
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
        className={`absolute top-1/2 -translate-y-1/2 ${arrowNext} bg-white rounded-full shadow-lg transition-all duration-200
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
        className={`absolute top-1/2 -translate-y-1/2 ${arrowPrev} bg-white rounded-full shadow-lg transition-all duration-200
        max-lg:hidde cursor-pointer  ${
          currentIndex === 0 ? "opacity-0 pointer-events-none" : ""
        }`}
      >
        <div className="rounded-full bg-[#ebebeb] w-15 scale-80 ">
          <div className="scale-80 rotate-180">
            <SVGComponet.ArrowNext />
          </div>
        </div>
      </button>
    </div>
  );
};

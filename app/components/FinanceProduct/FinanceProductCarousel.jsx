"use client";

import { useWindowSize } from "@/app/hooks/useWindowSize";
import { SVGComponet } from "@/app/ui/SvgElements";
import { cloneElement, useCallback, useEffect, useRef, useState } from "react";

export const Carousel = ({
  children,
  lg = 2,
  xl = 3,
  conteinerStyle = "h-45 lg:h-[560px] pl-4 pr-4 lg:pl-11 lg:pr-11",
  gap = "gap-4",
  arrowPl = 44,
  arrowPr = 44,
}) => {
  const pages = children;
  const [offset, setOffset] = useState(0);
  const itemsWidthRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const scrollContainerRef = useRef(null);
  const [pageVisible, setPageVisible] = useState(2);
  const { width } = useWindowSize();
  const [arrowPos, setArrowPos] = useState({
    left: 0,
    right: 0,
  });

  const calculateArrowPos = useCallback(
    (visible) => {
      if (!itemsWidthRef.current || !scrollContainerRef.current) return;
      const track = itemsWidthRef.current;
      const container = scrollContainerRef.current;
      const firstChild = track.children[0];

      if (!firstChild) return;

      const cardWidth = firstChild.offsetWidth;
      const styles = getComputedStyle(track);
      const gap = parseFloat(styles.columnGap || styles.gap || "0") || 0;
      const containerWidth =
        container.clientWidth > width ? width : container.clientWidth;
      const visibleWidth = visible * cardWidth + (visible - 1) * gap;
      const freeSpace = containerWidth - visibleWidth;

      const firstCardStart = Math.max(0, freeSpace / 2);
      const lastCardStart = firstCardStart + (visible - 1) * (cardWidth + gap);

      setArrowPos({
        left: firstCardStart,
        right: lastCardStart + cardWidth,
      });
      if (!firstChild) return;
    },
    [width]
  );

  const getStep = () => {
    if (!itemsWidthRef.current) return 0;
    const track = itemsWidthRef.current;
    const firstChild = track.children[0];
    if (!firstChild) return 0;

    const cardWidth = firstChild.offsetWidth;
    const styles = getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap || "0") || 0;

    return Math.round(cardWidth + gap);
  };

  const getCenteredOffset = useCallback(
    (index, visible) => {
      if (!itemsWidthRef.current || !scrollContainerRef.current) return 0;

      const track = itemsWidthRef.current;
      const container = scrollContainerRef.current;

      const firstChild = track.children[0];
      if (!firstChild) return 0;

      const cardWidth = firstChild.offsetWidth;
      const styles = getComputedStyle(track);
      const gap = parseFloat(styles.columnGap || styles.gap || "0") || 0;

      const step = cardWidth + gap;
      const containerWidth =
        container.clientWidth > width ? width : container.clientWidth;

      const visibleWidth = visible * cardWidth + (visible - 1) * gap;
      const freeSpace = containerWidth - visibleWidth;

      if (freeSpace <= 0) {
        return -index * step;
      }
      return freeSpace / 2 - index * step;
    },
    [width]
  );

  useEffect(() => {
    const checkScreenSize = () => {
      const isLarge = window.innerWidth >= 1024;
      const visible = window.innerWidth >= 1280 ? xl : lg;
      if (window.innerWidth < 1024) return;
      setPageVisible(visible);
      const wasLarge = isLargeScreen;

      setIsLargeScreen(isLarge);

      if (isLarge !== wasLarge) {
        const newOffset = getCenteredOffset(0, visible);
        setOffset(newOffset);
        setCurrentIndex(0);
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollLeft = 0;
        }
      } else {
        const newOffset = getCenteredOffset(currentIndex, visible);
        setOffset(newOffset);
      }
      calculateArrowPos(visible);
    };

    checkScreenSize();
    const timeoutId = setTimeout(checkScreenSize, 500);
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
      clearTimeout(timeoutId);
    };
  }, [
    isLargeScreen,
    lg,
    xl,
    currentIndex,
    getCenteredOffset,
    calculateArrowPos,
  ]);

  const handleNextClick = () => {
    const step = getStep();
    if (!step) return;

    const maxIndex = Math.max(0, pages.length - pageVisible);

    setCurrentIndex((current) => {
      const newIndex = Math.min(current + 1, maxIndex);
      const newOffset = getCenteredOffset(newIndex, pageVisible);

      setOffset(newOffset);
      return newIndex;
    });
  };

  const handleBackClick = () => {
    const step = getStep();
    if (!step) return;

    setCurrentIndex((current) => {
      const newIndex = Math.max(current - 1, 0);
      const newOffset = getCenteredOffset(newIndex, pageVisible);
      setOffset(newOffset);
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
          className={`h-full w-full flex transition-transform duration-300 ease-in-out
          ${gap}`}
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
        onClick={handleBackClick}
        disabled={currentIndex === 0}
        style={{ left: `${arrowPos.left + arrowPl}px` }}
        className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white rounded-full shadow-lg transition-all duration-200
        max-lg:hidden cursor-pointer z-10 ${
          currentIndex === 0 ? "opacity-0 pointer-events-none" : ""
        }`}
      >
        <div className="rounded-full bg-[#ebebeb] w-12 h-12 scale-80 items-center flex justify-center">
          <div className="scale-100 rotate-180">
            <SVGComponet.ArrowNext />
          </div>
        </div>
      </button>

      <button
        onClick={handleNextClick}
        disabled={currentIndex >= pages.length - pageVisible}
        style={{ left: `${arrowPos.right + arrowPr}px` }}
        className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white rounded-full shadow-lg transition-all duration-200
          max-lg:hidden cursor-pointer z-10 ${
            currentIndex >= pages.length - pageVisible
              ? "opacity-0 pointer-events-none"
              : ""
          }`}
      >
        <div className="rounded-full bg-[#ebebeb] w-12 h-12 scale-80 items-center flex justify-center">
          <div className="scale-100">
            <SVGComponet.ArrowNext />
          </div>
        </div>
      </button>
    </div>
  );
};

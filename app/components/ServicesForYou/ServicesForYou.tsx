"use client";

import Link from "next/link";
import { SERVICES_ITEMS } from "./data/constant";
import { ArrowSVG } from "@/app/ui/SvgElements";

import { useCallback, useEffect, useRef, useState } from "react";

export const ServicesForYou = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollingRef = useRef(false);
  const idTimerRef = useRef<number | null>(null);

  const [snapOff, setSnapOff] = useState(true);

  const initialCopies = 3;

  const [tempSERVICES_ITEMS, setTempSERVICES_ITEMS] = useState(() => {
    const tempArray = [];
    for (let i = 0; i < initialCopies * 2 + 1; i++) {
      tempArray.push(...SERVICES_ITEMS);
    }
    return tempArray;
  });

  const [currentIndex, setCurrentIndex] = useState(
    initialCopies * SERVICES_ITEMS.length
  );

  useEffect(() => {
    if (scrollRef.current) {
      const cardWidth = window.innerWidth;
      const initialPosition = initialCopies * SERVICES_ITEMS.length * cardWidth;
      scrollRef.current.scrollLeft = initialPosition;
    }
  }, []);

  const handleClick = useCallback(
    (index: number) => {
      setCurrentIndex(index);
      if (scrollRef.current) {
        const cardWidth = window.innerWidth;

        let closestIndex = index;
        const currentScrollIndex = Math.round(
          scrollRef.current.scrollLeft / cardWidth
        );
        const currentCopy = Math.floor(
          currentScrollIndex / SERVICES_ITEMS.length
        );
        closestIndex = index + currentCopy * SERVICES_ITEMS.length;

        if (closestIndex >= tempSERVICES_ITEMS.length) {
          closestIndex = index;
        }

        setCurrentIndex(index);

        scrollRef.current.scrollTo({
          left: closestIndex * cardWidth,
          behavior: "smooth",
        });
      }
    },
    [tempSERVICES_ITEMS]
  );

  const prependBlock = useCallback(() => {
    if (scrollRef.current) {
      const cardWidth = getCardWidth();
      const idx = Math.round(scrollRef.current.scrollLeft / cardWidth);
      const scrollLeft = scrollRef.current.scrollLeft;
      if (idx < SERVICES_ITEMS.length + 2) {
        setTempSERVICES_ITEMS([...tempSERVICES_ITEMS, ...SERVICES_ITEMS]);

        const cardWidth = window.innerWidth;
        const initialPosition = scrollLeft + SERVICES_ITEMS.length * cardWidth;

        scrollRef.current.scrollLeft = initialPosition;
      }

      setCurrentIndex(idx);
    }
  }, [tempSERVICES_ITEMS]);

  const markScrolling = useCallback(() => {
    scrollingRef.current = true;
    if (idTimerRef.current) window.clearTimeout(idTimerRef.current);
    idTimerRef.current = window.setTimeout(() => {
      scrollingRef.current = false;
      prependBlock();
    }, 80);
  }, [prependBlock]);

  const getCardWidth = () =>
    scrollRef.current?.clientWidth ?? window.innerWidth;

  const handleScroll = useCallback(() => {
    if (scrollRef.current) {
      setSnapOff(true);
      const cardWidth = getCardWidth();
      const idx = Math.round(scrollRef.current.scrollLeft / cardWidth);
      //===> RIGHT
      const scrollLeft = scrollRef.current.scrollLeft;
      setCurrentIndex(idx);
      //BJDebugMsg("newIndex = " + idx);
      if (scrollLeft > (tempSERVICES_ITEMS.length - 1) * 400 + 20) {
        setTempSERVICES_ITEMS([...tempSERVICES_ITEMS, ...SERVICES_ITEMS]);
      } else {
        markScrolling();
      }
    }
  }, [tempSERVICES_ITEMS, markScrolling]);

  const normalizedIndex = currentIndex % SERVICES_ITEMS.length;

  return (
    <>
      <h2 className="text-[28px] font-semibold m-[32px]">Услуги для вас</h2>
      <div className=" ">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className={`flex overflow-x-auto scrollbar-hide overflow-y-hidden 
          ${snapOff ? "snap-x snap-mandatory" : ""}`}
        >
          {tempSERVICES_ITEMS.map((items, index) => (
            <div
              key={index}
              className={`flex-shrink-0 w-full rounded-2xl min-h-auto relative
                ${snapOff ? "snap-start" : ""}`}
            >
              <div
                className="absolute inset-0 mx-[16px] rounded-2xl"
                style={{ background: items.bg }}
              />
              <Link className="absolute" href={items.link} />
              <div className="relative z-0 pointer-events-none max-[1023px]:flex-col flex h-full mx-4 ">
                <div className="max-[1023px]:p-6 p-8 relative flex flex-col justify-between h-full">
                  <div className="relative mb-2 z-2.5 text-[24px] font-semibold leading-6">
                    {items.title}
                  </div>

                  <p className="relative text-[20px] leading-5 font-normal">
                    {items.desc}
                  </p>
                  <Link
                    className="relative h-5 cursor-pointer mt-6 flex items-center"
                    href={items.link}
                  >
                    <span className="text-[14px] leading-4 font-normal mr-2 opacity-[.64] flex">
                      Подробнее
                    </span>{" "}
                    <div className=" h-3 w-6 mb-2 opacity-[.64]">
                      <ArrowSVG />
                    </div>
                  </Link>
                </div>
                <div className="flex justify-center items-center h-auto -ml-4 ">
                  <FallBackImg
                    src={items.icon}
                    offIcon={items.localIcon}
                    alt={items.title}
                    className="w-full min-w-200 min-h-50 object-contain"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <ul className="flex items-center justify-center w-full h-3 p-0 m-0 mt-4 gap-2">
          {SERVICES_ITEMS.map((items, index) => (
            <li key={items.id}>
              <div
                onClick={() => handleClick(index)}
                className={`w-6 h-[3.5px] cursor-pointer rounded transition-all  ${
                  normalizedIndex == index
                    ? `bg-black`
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

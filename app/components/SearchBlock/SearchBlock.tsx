"use client";

import { useModal } from "@/app/hooks/useModal";
import {
  ArrowSVG,
  CrossSVG,
  Magnifier,
  SVGComponet,
} from "@/app/ui/SvgElements";
import Link from "next/link";
import { SerachDefoult } from "./SearchDefault";
import { useCallback, useEffect, useRef, useState } from "react";
import { useModalContext } from "@/app/contextApi/ModalContext";
import { useSearchBlockContext } from "@/app/contextApi/SearchBlockContext";

const links = [
  {
    href: "javascript:void(0)",
    text: "Скачать мобильное приложение",
    icon: <SVGComponet.SmartPhone />,
  },
  {
    href: "javascript:void(0)",
    text: "Что входит в привилегии",
    icon: <SVGComponet.Wallet />,
  },
  {
    href: "javascript:void(0)",
    text: "Курсы валют",
    icon: <SVGComponet.Ruble />,
  },
  {
    href: "javascript:void(0)",
    text: "Тарифы",
    icon: <SVGComponet.Money />,
  },
];

const SearchInput = () => (
  <div className="flex gap-5 pb-4 px-5">
    <div className=" flex gap-3 text-black/50 bg-[#0a0a0b14] p-2 rounded-[8px] w-full">
      <Magnifier />
      <input className="w-full" placeholder="Поиск" />
      <button>
        <SVGComponet.ButtonArrow />{" "}
      </button>
    </div>
    <div className="items-center flex w-10">
      <div className="p-2 bg-[#0a0a0b14] rounded-[12px]">
        <SVGComponet.Microphone />
      </div>
    </div>
  </div>
);

const SearchMenu = () => (
  <div className="p-2 flex flex-col gap-4 min-w-[calc(100vw-32px)]">
    {links.map((item, index) => (
      <Link
        key={index}
        href={item.href}
        className="flex items-center justify-between relative px-3 py-2 rounded-lg transition"
      >
        <div className="flex items-center gap-3 text-black/80">
          <div className="w-10 h-10 flex items-center justify-center text-black/60 bg-[#f5f5f5] rounded-[8px]">
            <div></div>
            {item.icon}
          </div>
          {item.text}
        </div>

        <div className="w-5 h-5 flex items-center justify-center text-black/60">
          <ArrowSVG />
        </div>
      </Link>
    ))}
  </div>
);

const CLOSE_THRESHOLD = 200;

export const SearchHome = ({ searchIndex }: { searchIndex: number }) => {
  const { modalIsOpen, toggleModal } = useModal();

  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const startYRef = useRef(0);
  const { isUsefullWindowOpen } = useModalContext();
  const { isSearchBlockOpen } = useSearchBlockContext();
  useEffect(() => {
    if (modalIsOpen) {
      setDragY(0);
      setIsClosing(false);
    }
  }, [modalIsOpen]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (isDragging) {
      const prev = document.body.style.userSelect;
      document.body.style.userSelect = "none";
      return () => {
        document.body.style.userSelect = prev;
      };
    }
  }, [isDragging]);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (!modalIsOpen || isClosing) return;
      setIsDragging(true);
      startYRef.current = e.clientY;
      const target = e.target as HTMLElement;
      target.setPointerCapture?.(e.pointerId);
    },
    [modalIsOpen, isClosing]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging || isClosing) return;
      const delta = e.clientY - startYRef.current;
      setDragY(delta);
    },
    [isDragging, isClosing]
  );

  const onPointerEndDrag = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      setIsDragging(false);
      if (dragY >= CLOSE_THRESHOLD) {
        setIsClosing(true);
        setTimeout(() => {
          toggleModal();
        }, 250);
      } else {
        // Возвращаемся на место
        setDragY(0);
      }

      const target = e.target as HTMLElement;
      target.releasePointerCapture?.(e.pointerId);
    },
    [isDragging, dragY, toggleModal]
  );

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      toggleModal();
    }, 300);
  }, [toggleModal]);

  const getTranslateY = () => {
    if (!modalIsOpen && !isClosing) return "100%";
    if (isClosing) return "100%";
    if (isDragging || dragY > 0) return `${dragY}px`;
    return "0";
  };
  return (
    <>
      {!isUsefullWindowOpen && isSearchBlockOpen && (
        <>
          <SerachDefoult
            searchIndex={searchIndex}
            modalIsOpen={modalIsOpen}
            toggleModal={toggleModal}
          />
          {/**transform-gpu alt translateZ(0)
       * Плавность	На iOS и Android анимации translate, scale, rotate без GPU иногда «фризят». GPU-слой делает движение идеально плавным.
        ✅ Отдельный слой	Элемент не перерисовывает фон и соседей при движении — экономит ресурсы.
        ✅ Меньше лагов	Особенно важно при 60 fps интерфейсах (модалки, слайдеры, bottom sheets). */}
          <div
            className={`z-1000 fixed inset-0  transform-gpu 
          ${
            modalIsOpen
              ? "translate-y-300 "
              : "translate-y-full opacity-0 pointer-events-none"
          }`}
            style={{
              transform: `translateY(${getTranslateY()})`,
              transition: isDragging ? "none " : "transform 500ms ease-out",
            }}
          >
            <div
              className={`fixed bottom-0 bg-[#fff] w-full rounded-t-2xl px-4 border-gray-200 border
        left-1/2 -translate-x-1/2 max-w-3xl ${modalIsOpen ? "" : ""}`}
            >
              <div
                className="bg-[#0a0a0b14] w-10 h-1 rounded-[20px] mx-auto mt-2 touch-none"
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerEndDrag}
              />
              <div
                className="relative min-h-14  pt-4 touch-none"
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerEndDrag}
              >
                <div
                  className="absolute flex items-center justify-center w-6 h-6 top-2 right-0 
            bg-[#0a0a0b14] rounded-[50%] cursor-pointer z-1000"
                  onClick={handleClose}
                >
                  <div className="scale-10">
                    <CrossSVG />
                  </div>
                </div>
              </div>
              <SearchInput />
              <SearchMenu />
              <div className="mb-300" />
            </div>
          </div>
          <div
            className={`fixed bg-black/60 w-screen inset-0 transition-opacity duration-500 ease-out
        ${modalIsOpen ? "opacity-100 " : "opacity-0 pointer-events-none"}`}
          />
        </>
      )}
    </>
  );
};

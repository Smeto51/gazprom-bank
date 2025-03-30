"use client";
import { memo, ReactNode, useCallback, useEffect, useRef } from "react";
import { CrossSVG } from "../SvgElements";

const mediaModalSize = `
  h-full
  lg:h-[80vh] lg:w-[672px] lg:p-10 lg:rounded-2xl
  `;

type CitiesModalProps = {
  isVisible: boolean;
  children: ReactNode;
  setIsVisible: (value: boolean) => void;
  setIsOpen: (value: boolean) => void;
  isOpen: boolean;
};

const CitiesModal = ({
  isVisible,
  children,
  setIsVisible,
  setIsOpen,
  isOpen,
}: CitiesModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    (event: React.MouseEvent) => {
      /*
       * .contains Проверяет, содержит ли элемент (modalRef.current) другой элемент (event.target) в своих потомках
       * as Node - Приведение типа TypeScript (type assertion)
       * Node — базовый интерфейс для всех DOM-узлов (элементы, текст и т.д.)
       */
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false);
        setTimeout(() => setIsOpen(false), 200);
      }
    },
    [setIsVisible, setIsOpen]
  );

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsVisible(false);
        setTimeout(() => setIsOpen(false), 200);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, setIsOpen, setIsVisible]);

  return (
    <div
      className={`
        fixed inset-0 custom-background-cities w-[100vw] flex justify-center items-center transition-opacity duration-200 ease-in-out
        ${isVisible ? "opacity-100" : "opacity-0"}`}
      onClick={handleClickOutside}
    >
      <div
        className="
      fixed 
      custom-background-CrossSVG bg-white/[0.08]
      w-10 h-10 top-4 right-4
      flex items-center justify-center cursor-pointer hover:bg-blue-500 group duration-500
      "
      >
        <CrossSVG />
      </div>
      <div
        ref={modalRef}
        className={`${mediaModalSize}
            bg-white overflow-hidden z-0
            duration-400
            ${isVisible ? "opacity-100 -translate-y-5" : "opacity-0"}`}
      >
        {children}
      </div>
    </div>
  );
};

export default memo(CitiesModal);

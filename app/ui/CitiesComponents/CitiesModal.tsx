"use client";
import { memo, ReactNode, useCallback, useEffect, useRef } from "react";
import { CrossSVG } from "../SvgElements";

const mediaModalSize = `
  h-full w-full
  lg:h-[80vh] lg:w-[672px] lg:p-10 lg:rounded-2xl
  `;

type CitiesModalProps = {
  isVisible: boolean;
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
  setIsOpen: (value: boolean) => void;
};

const CitiesModal = ({
  isVisible,
  children,
  onClose,
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
        onClose();
        setTimeout(() => setIsOpen(false), 200);
      }
    },
    [onClose, setIsOpen]
  );

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        setTimeout(() => setIsOpen(false), 200);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, setIsOpen, onClose]);

  return (
    <div
      className={`
        fixed inset-0 custom-background-cities w-full flex justify-center items-center transition-opacity duration-200 ease-in-out z-15
        ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      onClick={handleClickOutside}
    >
      <div
        className={`fixed top-4 right-4 z-50 flex items-center justify-center
        w-10 h-10 
        custom-background-CrossSVG bg-white/[0.08] max-[1023px]:bg-gray-300 hover:bg-blue-500 group rounded-full
        transition-opacity duration-300
        ${isVisible ? "opacity-100" : "opacity-0"}`}
      >
        <div
          className="
          w-4 h-4 
          flex lg:text-gray-300
          cursor-pointer group-hover:scale-150 transition-transform duration-500
          "
        >
          <CrossSVG />
        </div>
      </div>
      <div
        ref={modalRef}
        className={`${mediaModalSize}
            max-[1023px]:p-4 
            max-[1023px]:pt-16
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

import { useModal } from "@/app/hooks/useModal";
import { CrossSVG, DropDownMenuSVG } from "../SvgElements";
import { BUTTON_BLACK } from "./HeaderNavPanel";
import React, { useCallback, useEffect, useRef, useState } from "react";

export const HeaderMenuPhone: React.FC = () => {
  const {
    modalIsOpen,
    toggleModal: toggleModalDropDown,
    modalClasses: { phone, bg },
  } = useModal();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isDragging, setIsDragging] = useState(false); //Флаг, фиксируем тянется ли окно пользователем
  const dragInfoRef = useRef({ startY: 0, startHeight: 0 });

  const DEBUG_Block_Visualization =
    process.env.NODE_ENV === "development"
      ? "border border-solid border-red-500"
      : "";

  //Сброс высоты при открытии для возврата к значению из css max-h-dynamic
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.height = "";
    }
  }, [modalIsOpen]);

  //Закрываем модальное окно, сбрасывая высоту
  const handleClose = useCallback((): void => {
    if (containerRef.current) {
      containerRef.current.style.height = "";
    }
    toggleModalDropDown();
  }, [toggleModalDropDown]);

  //Обрабатываем движение мыши
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;
      const deltaY = e.clientY - dragInfoRef.current.startY;
      const newHeight = dragInfoRef.current.startHeight - deltaY;
      const minHeight = 40;

      if (newHeight <= minHeight) {
        handleClose();
        setIsDragging(false);
        return;
      }

      containerRef.current.style.height = `${newHeight}px`;
    },
    [isDragging, handleClose]
  );

  //Обрабатываtv если мышь отпустили
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    if (containerRef.current) {
      containerRef.current.style.height = "";
    }
  }, []);

  //Обработчик начала перетаскивания
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (containerRef.current) {
      dragInfoRef.current = {
        startY: e.clientY,
        startHeight: containerRef.current.getBoundingClientRect().height,
      };
      setIsDragging(true);
    }
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <>
      <button
        className={`py-1.5 pl-2 pr-2 bg-black mr-2 ml-2 rounded-md lg:hidden ${BUTTON_BLACK}`}
        onClick={toggleModalDropDown}
      >
        <div className="flex h-5 w-3.5 text-white rounded-md">
          <DropDownMenuSVG />
        </div>
      </button>

      <div
        className={`${phone} bg-white left-0 right-0 bottom-0 fixed max-w-3xl ml-auto mr-auto min-w-[320px] rounded-t-lg z-100 max-h-dynamic transition-transform duration-300`}
        ref={containerRef}
      >
        <div
          className={`relative min-h-14 cursor-ns-resize ${DEBUG_Block_Visualization}`}
          onMouseDown={handleMouseDown}
        >
          <div className="absolute top-0 left-0 right-0 h-2 bg-transparent" />

          <div className="trait" />
          <div className="p-4 pt-6">
            <div
              className="flex items-center justify-center rounded-full bg-[rgba(30,34,46,0.08)] w-6 aspect-square ml-auto hover:bg-blue-500 hover:text-white duration-300 cursor-pointer"
              onClick={toggleModalDropDown}
            >
              <div className="flex h-4 w-4">
                <CrossSVG />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`${bg} fixed top-0 left-0 bg-black/50 w-full h-full z-0 cursor-pointer`}
        onClick={toggleModalDropDown}
      />
    </>
  );
};

import { useModal } from "@/app/hooks/useModal";
import { CrossSVG, DropDownMenuSVG } from "../SvgElements";
import { BUTTON_BLACK } from "./HeaderNavPanel";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MOBILE_MENU, MOBILE_MENU_ITEMS } from "./VariablePhone";
import Cities from "../Cities";

const resetContainerHeight = (
  containerRef: React.RefObject<HTMLElement | null>
) => {
  if (containerRef.current) {
    containerRef.current.style.height = "";
  }
};

export const HeaderMenuPhone = () => {
  const {
    modalIsOpen,
    toggleModal: toggleModalDropDown,
    modalClasses: { phone, bg },
  } = useModal();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isDragging, setIsDragging] = useState(false); //Флаг, фиксируем тянется ли окно пользователем
  const dragInfoRef = useRef({
    startY: 0,
    startHeight: 0,
    currentTranslateY: 0,
  });

  const [activeItem, setActiveItem] = useState(MOBILE_MENU[0].id);

  const DEBUG_Block_Visualization =
    process.env.NODE_ENV === "development"
      ? "border border-solid border-red-500"
      : "";

  //Сброс высоты при открытии для возврата к значению из css max-h-dynamic
  useEffect(() => {
    resetContainerHeight(containerRef);
  }, [modalIsOpen]);

  //Закрываем модальное окно, сбрасывая высоту
  const handleClose = useCallback(() => {
    //resetContainerHeight(containerRef);
    if (!containerRef.current) return;
    const currentHeight = containerRef.current?.getBoundingClientRect().height;
    containerRef.current.style.height = `${currentHeight}px`;

    requestAnimationFrame(() => {
      if (containerRef.current) {
        containerRef.current.style.transition = "height 300ms ease-out";
        containerRef.current.style.height = "0px";
      }
    });

    const timer = setTimeout(() => {
      resetContainerHeight(containerRef);
      toggleModalDropDown();
    }, 300);

    return () => clearTimeout(timer);
  }, [toggleModalDropDown]);

  const handleMove = useCallback(
    (clientY: number) => {
      if (!isDragging || !containerRef.current) return;
      const deltaY = clientY - dragInfoRef.current.startY;
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

  //Обрабатываем движение мыши
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      handleMove(e.clientY);
    },
    [handleMove]
  );

  //Обрабатываем если отпустили
  const handleEnd = useCallback(() => {
    setIsDragging(false);
    resetContainerHeight(containerRef);
  }, []);

  //Обработчик начала перетаскивания
  const handleStart = useCallback((clientY: number) => {
    if (containerRef.current) {
      dragInfoRef.current = {
        startY: clientY,
        startHeight: containerRef.current.getBoundingClientRect().height,
        currentTranslateY: 0,
      };
      setIsDragging(true);
    }
  }, []);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      handleStart(e.clientY);
    },
    [handleStart]
  );
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      handleStart(e.touches[0].clientY);
    },
    [handleStart]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      handleMove(e.touches[0].clientY);
    },
    [handleMove]
  );

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleEnd);
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleEnd);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleEnd);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging, handleMouseMove, handleEnd, handleTouchMove]);

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
        aria-modal="true"
        role="dialog"
        className={`${phone} bg-white left-0 right-0 bottom-0 fixed max-w-3xl ml-auto mr-auto min-w-[320px] rounded-t-lg z-100 max-h-dynamic transition-[height,transform] duration-300 ease-out`}
        style={{
          transform: isDragging ? `translateY(0px)` : "translateY(0)",
          transition: isDragging ? "none" : "", // Отключаем анимацию при перетаскивании
        }}
        ref={containerRef}
      >
        <div
          className={`relative min-h-14 cursor-ns-resize ${DEBUG_Block_Visualization}`}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <div className="absolute top-0 left-0 right-0 h-2 bg-transparent" />

          <div className="trait " />
          <div className="p-4 pt-6">
            <div
              className="flex items-center justify-center rounded-full bg-[rgba(30,34,46,0.08)] w-6 aspect-square ml-auto hover:bg-blue-500 hover:text-white duration-300 cursor-pointer"
              onClick={handleClose}
            >
              <div className="flex h-4 w-4">
                <CrossSVG />
              </div>
            </div>
          </div>
        </div>
        <div className="shrink grow overflow-auto overscroll-contain max-h-dynamic-scrollbar">
          <div className="pl-4 pr-4">
            <div className="pt-6 pb-8.5 min-h-100">
              <>
                <div
                  className="flex p-1 gap-0.5 border-[1px] border-solid border-[#dbdfec] w-full overflow-x-auto rounded-xl"
                  style={{ scrollbarWidth: "none" }}
                >
                  {MOBILE_MENU.map((item) => (
                    <div
                      key={item.id}
                      className={`flex-shrink-0 text-[16px] leading-5 text-weig font-medium h-12 pl-6 pr-6 flex items-center cursor-pointer ${
                        activeItem === item.id
                          ? "bg-black text-white rounded-xl"
                          : ""
                      }`}
                      onClick={() => setActiveItem(item.id)}
                    >
                      {item.type === "button" ? (
                        <button className="cursor-pointer">{item.title}</button>
                      ) : (
                        <Link href={"#"}>{item.title}</Link>
                      )}
                    </div>
                  ))}
                </div>

                <div className="pt-8.5">
                  <Link href={"#"}>
                    <div className="bg-[rgb(244,246,255)] p-4 rounded-2xl h-20 flex relative">
                      <div className="max-w-[60%] min-w-50 ">
                        <div className="text-[16px] font-medium pb-1 leading-5">
                          Офиса и банкоматы
                        </div>
                        <div className="text-[14px] font-normal leading-4">
                          Найдите ближайшее отделение
                        </div>
                      </div>
                      <div className="flex items-center ml-auto">
                        <picture>
                          <source
                            type="image/webp"
                            srcSet="https://cdn.gpb.ru/upload/files/iblock/f3a/qe8p1flth1k7bnfhssg5ys5mwgq1ek59/offices_atms.webp 2x, https://cdn.gpb.ru/upload/files/iblock/f3a/qe8p1flth1k7bnfhssg5ys5mwgq1ek59/x1_offices_atms.webp"
                          />
                          <source
                            type="image/png"
                            srcSet="https://cdn.gpb.ru/upload/files/iblock/f3a/qe8p1flth1k7bnfhssg5ys5mwgq1ek59/offices_atms.png 2x, https://cdn.gpb.ru/upload/files/iblock/f3a/qe8p1flth1k7bnfhssg5ys5mwgq1ek59/x1_offices_atms.png"
                          />
                          <img
                            className="absolute max-w-37 h-23 bottom-0 right-0"
                            src="https://cdn.gpb.ru/upload/files/iblock/f3a/qe8p1flth1k7bnfhssg5ys5mwgq1ek59/x1_offices_atms.png"
                            alt="Офисы и банкоматы"
                          />
                        </picture>
                      </div>
                    </div>
                  </Link>
                </div>

                <div className="pt-8 pb-8 grid gap-4 grid-cols-3">
                  {MOBILE_MENU_ITEMS.map((item) => (
                    <span
                      className="flex flex-col gap-2 items-center "
                      key={item.id}
                    >
                      <picture>
                        <source type="image/webp" srcSet={item.srcsetWebp} />
                        <source type="image/png" srcSet={item.srcsetPng} />
                        <img src={item.srcImg} alt={item.title} />
                      </picture>
                      <p>{item.title}</p>
                    </span>
                  ))}
                </div>
              </>
              <div className="w-full ">
                <Cities />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`${bg} fixed top-0 left-0 bg-black/50 w-full h-full z-0 cursor-pointer`}
        onClick={handleClose}
      />
    </>
  );
};

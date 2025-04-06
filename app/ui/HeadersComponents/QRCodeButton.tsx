"use client";
import { useCallback, useEffect, useState } from "react";
import { QrSVG } from "../SvgElements";
import { BUTTON_BLACK } from "./HeaderNavPanel";
import Image from "next/image";

const QRCodeButton = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleModalQR = useCallback(() => {
    if (modalIsOpen) {
      setIsAnimating(true);
      setTimeout(() => {
        setModalIsOpen(false);
        setIsAnimating(false);
      }, 300);
    } else {
      setModalIsOpen(true);
    }
  }, [modalIsOpen]);

  useEffect(() => {
    if (!modalIsOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key == "Escape") {
        toggleModalQR();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [modalIsOpen, toggleModalQR]);

  return (
    <>
      <button
        className={`flex px-4 py-4 ${BUTTON_BLACK} mr-0 ${
          modalIsOpen ? "bg-gray-800" : ``
        }`}
        onClick={toggleModalQR}
        aria-label={modalIsOpen ? "Закрыть QR-код" : "Показать QR-код"}
      >
        <div className={`flex h-4 w-4 `}>
          <QrSVG />
        </div>
      </button>
      <div
        className={`absolute right-0 top-full mt-2 transition-all ease-in-out duration-300 
                    ${
                      modalIsOpen && !isAnimating
                        ? "opacity-100 translate-y-0 "
                        : "opacity-0 translate-y-5 pointer-events-none "
                    }`}
      >
        {modalIsOpen && (
          <div className="min-w-86 max-w-86 h-100% bg-white duration-300 rounded-[12px] custom-shadow p-0 ">
            <div className="text-[20px] font-semibold p-6">
              Мобильное приложение Газпром банка
            </div>
            <Image
              src="https://cdn.gpb.ru/upload/files/iblock/1d8/emn24a05rfa7u554qh5kfsb9rhgok3h6/x1_688x392.png"
              alt="Мобильное приложение Газпромбанка"
              width={688}
              height={392}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default QRCodeButton;

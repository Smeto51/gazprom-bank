"use client";
import { useCallback, useState } from "react";
import { ThreeDots, QrSVG } from "../SvgElements";

const CLASS_HOVER_BLUE = "hover:text-[#4768BF] transition-colors duration-200";
const BUTTON_BLACK =
  "bg-black text-white rounded-[8px] hover:bg-gray-800  active:bg-gray-900 transition-colors duration-200 cursor-pointer focus:outline-none p-2.5";

const NAV_ITEMS = [
  "Карты",
  "Вклады и счета",
  "Кредиты",
  "Премиум",
  "Инвестиции",
  "Автокредитование",
  "Ипотека",
  "Услуги и сервисы",
  "Обмен валют",
  "Привилегии",
];

const HeaderNavPanel = () => {
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

  /*const toggleModalQR = useCallback(() => {
    if (modalIsOpen) {
      setIsAnimating(true);
      setTimeout(() => {
        setModalIsOpen(false);
        setIsAnimating(false);
      }, 300); // Должно совпадать с duration-300
    } else {
      setModalIsOpen(true);
    }
  }, [modalIsOpen]);*/
  return (
    <nav className="relative lg:h-22 h-full border-b border-gray-300 z-10">
      <div className="container wrapper mx-auto flex items-center h-full text-[16px]">
        <div className="flex space-x-7 whitespace-nowrap">
          {NAV_ITEMS.map((item) => (
            <div key={item} className={CLASS_HOVER_BLUE}>
              {item}
            </div>
          ))}
          <div className="opacity-0">
            <ThreeDots />
          </div>
        </div>
        <div className="flex ml-auto space-x-4 relative">
          <button className={`${BUTTON_BLACK} px-6`}>Стать клиентом</button>
          <button
            className={`flex items-center px-3 ${BUTTON_BLACK} mr-0`}
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
                <img
                  src="https://cdn.gpb.ru/upload/files/iblock/1d8/emn24a05rfa7u554qh5kfsb9rhgok3h6/x1_688x392.png"
                  alt="Мобильное приложение Газпромбанка"
                ></img>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
export default HeaderNavPanel;

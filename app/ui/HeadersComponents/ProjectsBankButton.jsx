"use client";

import SquareOfDots from "../SvgElements";
import { useModal } from "@/app/hooks/useModal";
import { BankServiceLink } from "./BecomeClientButton";
import { useCallback, useRef, useState } from "react";

const ProjectsBankButton = () => {
  const { modalIsOpen, modalRef, toggleModalQR, modalClasses } = useModal();
  const [isHover, setIsHover] = useState(false);
  const [showTopGradient, setShowTopGradient] = useState(false);
  const scrollContainerRef = useRef(null);

  const handleScroll = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollTop } = scrollContainerRef.current;
      setShowTopGradient(scrollTop > 0);
    }
  }, []);

  return (
    <div tabIndex="0" className="relative" ref={modalRef}>
      <div
        className={` hover:scale-120 hover:text-black transition-transform duration-300  ${
          modalIsOpen
            ? "text-black scale-120 transition-transform duration-300 group"
            : "hover:text-black text-gray-400"
        }`}
        onClick={toggleModalQR}
      >
        <SquareOfDots />
      </div>
      <div
        className={`${modalClasses} left-0 mt-10`}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <div className="bg-white h-full max-h-121 lg:min-w-86 pl-2 pr-2 custom-shadow rounded-[12px] overflow-hidden transition-transform duration-300 ">
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className={`${
              isHover ? "overflow-y-auto" : "pr-1 overflow-y-hidden"
            } h-full max-h-116.5 custom-scrollbar pb-1`}
          >
            <div className="font-semibold text-[20px] p-4 text-black ">
              Все проекты банка
            </div>
            <>
              <BankServiceLink
                href=""
                src="https://cdn.gpb.ru/upload/files/iblock/2ad/privilegeStandart_80.png"
                alt="Газпромбанк Привилегии"
                title="Газпромбанк Привилегии"
                description="Больше, чем выгодно"
              />
              <BankServiceLink
                href=""
                src="https://cdn.gpb.ru/upload/files/iblock/f9c/xlpmtvevnge9wycxsafp7150k6vlyxzm/Pro-finansy.png"
                alt="Газпромбанк Про Финансы"
                title="Газпромбанк Про Финансы"
                description="Понятно о деньгах"
              />
              <BankServiceLink
                href=""
                src="https://cdn.gpb.ru/upload/files/iblock/303/t4ubxjingqkdv9lk7s2sqsjovk3ohdjo/Baza-znaniy.png"
                alt="Газпромбанк База Знаний"
                title="Газпромбанк База Знаний"
                description="Финансовый глоссарий"
              />
              <BankServiceLink
                href=""
                src="https://cdn.gpb.ru/upload/files/iblock/ad3/gpb_mobile.png"
                alt="Газпромбанк Мобайл"
                title="Газпромбанк Мобайл"
                description="Наш мобильный оператор"
              />
              <BankServiceLink
                href=""
                src="https://cdn.gpb.ru/upload/files/iblock/4ea/GorodPay.png"
                alt="GorodPay"
                title="GorodPay"
                description="Приложение для пассажиров"
              />
              <BankServiceLink
                href=""
                src="https://cdn.gpb.ru/upload/files/iblock/1e0/o6dvaqidjeru2ngb363piro5b4f3bcfj/Gazprom-Pay.png"
                alt="Gazprom Pay"
                title="Gazprom Pay"
                description="Платежи в одно касание "
              />
              <BankServiceLink
                href=""
                src="https://cdn.gpb.ru/upload/files/iblock/3e4/cjgg3kqd0h5h3eaya130v2gvlm5cuc2b/Trevel.png"
                alt="Газпромбанк Travel"
                title="Газпромбанк Travel"
                description="Портал для путешественников"
              />
              <BankServiceLink
                href=""
                src="https://cdn.gpb.ru/upload/files/iblock/d89/1bkwdn07p5o0eknb8kphf4bqhxgbcay5/DARK.png"
                alt="Газпромбанк Аналитика"
                title="Газпромбанк Аналитика"
                description="Про экономику и рынки капитала"
              />
              <BankServiceLink
                href=""
                src="https://cdn.gpb.ru/upload/files/iblock/b7e/rost.png"
                alt="Устойчивое развитие"
                title="Устойчивое развитие"
                description="Ответcтвенное ведение бизнеса"
              />
              <BankServiceLink
                href=""
                src="https://cdn.gpb.ru/upload/files/iblock/9f4/Menu-Item_Name_80x80-7876876.png"
                alt="#МЕГАИГРОК"
                title="#МЕГАИГРОК"
                description="Инфраструктура и ГЧП"
              />
              <BankServiceLink
                href=""
                src="https://cdn.gpb.ru/upload/files/iblock/587/gpb_space.png"
                alt="Газпромбанк.Тех"
                title="Газпромбанк.Тех"
                description="Карьера в ИТ большого банка"
              />
            </>
          </div>
          <div
            className={`absolute top-0 left-0 right-0 h-[30px] pointer-events-none w-[calc(100%-var(--scrollbar-width,8px))] ${
              showTopGradient
                ? "bg-gradient-to-b from-white to-transparent opacity-100 transition-all duration-300"
                : "opacity-0"
            }`}
          ></div>
          <div className="absolute h-[50px] -bottom-1 left-0 right-0 bg-gradient-to-t from-white to-transparent pointer-events-none rounded-[12px]" />
        </div>
      </div>
    </div>
  );
};

export default ProjectsBankButton;

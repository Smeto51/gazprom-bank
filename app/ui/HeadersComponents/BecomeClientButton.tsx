"use client";

import Link from "next/link";
import { FC, useCallback, useRef, useState } from "react";
import { BUTTON_BLACK } from "./HeaderNavPanel";
import {
  BankCardSVG,
  SavingAccountSVG,
  BestPremiumCardSVG,
  PercentSVG,
  InvestmentsSVG,
  PrivateBunkingSVG,
  PreciousMetaksSVG,
} from "../SvgElements";
import { useModal } from "@/app/hooks/useModal";
import Image from "next/image";

type BankServiceLinkProps = {
  href: string;
  Icon?: FC<{ className?: string }>;
  src?: string;
  alt?: string;
  title: string;
  description: string;
  bg: string;
};

export const BankServiceLink = ({
  href,
  Icon,
  src,
  alt,
  title,
  description,
  bg,
}: BankServiceLinkProps) => {
  return (
    <Link href={href}>
      <div className="flex p-4 rounded-[8px] transition-colors duration-400 hover:bg-[#f4f6fa] group">
        <div
          className={`flex items-center h-11 w-10 ${bg} mr-4 rounded-[12px]`}
        >
          {Icon ? (
            <div className="flex h-6 w-6 text-white ml-2 mr-2">
              {" "}
              <Icon />
            </div>
          ) : src ? (
            <div className="flex h-10 w-10 ">
              <Image
                src={src}
                alt={alt || ""}
                width={40}
                height={40}
                className="rounded-[8px]"
              />
            </div>
          ) : null}
        </div>

        <div className="items-center ">
          <div className="text-[16px] text-black leading-5 transition-colors duration-400 group-hover:text-blue-600">
            {title}
          </div>
          <div className="text-[14px] text-gray-600 transition-colors duration-400 group-hover:text-black">
            {description}
          </div>
        </div>
      </div>
    </Link>
  );
};

const BecomeClinetButton = () => {
  const { modalIsOpen, modalRef, toggleModalQR, modalClasses } = useModal();
  const [isHover, setIsHover] = useState(false);
  const [showTopGradient, setShowTopGradient] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback((): void => {
    if (scrollContainerRef.current) {
      const { scrollTop } = scrollContainerRef.current;
      setShowTopGradient(scrollTop > 0);
    }
  }, []);

  return (
    <div className="relative" ref={modalRef}>
      <button
        className={`flex ${BUTTON_BLACK} px-6 whitespace-nowrap ${
          modalIsOpen ? "bg-gray-800" : ``
        }`}
        onClick={toggleModalQR}
      >
        Стать клиентом
      </button>

      <div
        className={`${modalClasses} right-0`}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <div
          className="
            h-full max-h-121 pl-2
            bg-white custom-shadow rounded-[12px] whitespace-nowrap 
            overflow-hidden pr-1 relative"
        >
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className={`${
              isHover ? "overflow-y-auto" : "pr-1 overflow-y-hidden"
            } h-full max-h-116.5 custom-scrollbar pb-1`}
          >
            <div className="font-semibold text-[20px] p-4">Стать клиентом</div>
            <>
              <BankServiceLink
                href="#"
                Icon={BankCardSVG}
                title="Дебетовая карта"
                description="С бесплатным обслуживанием"
                bg="bg-blue-600"
              />

              <BankServiceLink
                href="#"
                Icon={SavingAccountSVG}
                title="Накопительный счет"
                description="До 23,5% годовых"
                bg="bg-blue-600"
              />

              <BankServiceLink
                href="#"
                Icon={BestPremiumCardSVG}
                title="Лучшая премиальная карта"
                description="с выгодой от 500 000 ₽ в год"
                bg="bg-[#8C415A]"
              />

              <BankServiceLink
                href="#"
                Icon={PercentSVG}
                title="Кредит "
                description="На любые цели"
                bg="bg-blue-600"
              />

              <BankServiceLink
                href="#"
                Icon={InvestmentsSVG}
                title="Инвестиции"
                description="С надежным брокером"
                bg="bg-blue-600"
              />

              <BankServiceLink
                href="#"
                Icon={PreciousMetaksSVG}
                title="Драгоценные металлы"
                description="Инвестиции вне времени "
                bg="bg-blue-600"
              />

              <BankServiceLink
                href="#"
                Icon={PrivateBunkingSVG}
                title="Private Banking"
                description="Самым взыскательным клиентам"
                bg="bg-[#787878]"
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
          <div className="absolute h-[30px] -bottom-1 left-0 right-0 bg-gradient-to-t from-white to-transparent pointer-events-none rounded-[12px]" />
        </div>
      </div>
    </div>
  );
};

export default BecomeClinetButton;

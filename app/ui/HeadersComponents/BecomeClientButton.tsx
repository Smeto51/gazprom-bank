import Link from "next/link";
import { FC, useCallback, useEffect, useState } from "react";
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

type BankServiceLinkProps = {
  href: string;
  Icon: FC<{ className?: string }>;
  title: string;
  description: string;
  bg: string;
};

const BankServiceLink = ({
  href,
  Icon,
  title,
  description,
  bg,
}: BankServiceLinkProps) => {
  return (
    <Link href={href}>
      <div className="flex p-4 rounded-[8px] transition-colors duration-400 hover:bg-gray-200 group ">
        <div
          className={`flex items-center h-11 w-10 ${bg} mr-4 rounded-[12px]`}
        >
          <div className="flex h-6 w-6 text-white ml-2 mr-2">
            <Icon />
          </div>
        </div>
        <div className="items-center ">
          <div className="text-[16px] leading-5 transition-colors duration-400 group-hover:text-blue-600">
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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const [isHover, setIsHover] = useState(false);

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
    <div className="relative">
      <button
        className={`flex ${BUTTON_BLACK} px-6 whitespace-nowrap ${
          modalIsOpen ? "bg-gray-800" : ``
        }`}
        onClick={toggleModalQR}
      >
        Стать клиентом
      </button>

      <div
        className={`absolute right-0 top-full mt-2 transition-all ease-in-out duration-300 
                    ${
                      modalIsOpen && !isAnimating
                        ? "opacity-100 translate-y-0 "
                        : "opacity-0 translate-y-5 pointer-events-none "
                    }`}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        {modalIsOpen && (
          <div
            className="
            h-full max-h-121 pl-2
            bg-white custom-shadow rounded-[12px] whitespace-nowrap 
            overflow-hidden pr-1"
          >
            <div
              className={`${
                isHover ? "overflow-y-auto" : "pr-1 overflow-y-hidden"
              } h-full max-h-115.5 custom-scrollbar `}
            >
              <div className="font-semibold text-[20px] p-4">
                Стать клиентом
              </div>
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
                <div className="p-1" />
              </>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BecomeClinetButton;

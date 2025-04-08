"use client";

import Link from "next/link";
import { GazpromBankSvg, Magnifier, ThreeDots } from "../SvgElements";

import Cities from "../Cities";
import { useModal } from "@/app/hooks/useModal";
import ProjectsBankButton from "./ProjectsBankButton";

const DefoultLinkGPB = ({ href, title }) => {
  return (
    <Link href={href}>
      <div className="flex p-3 rounded-[8px] transition-colors duration-400 hover:bg-[#f4f6fa] group ">
        <div className="text-[16px] leading-3 transition-colors duration-400 group-hover:text-blue-600">
          {title}
        </div>
      </div>
    </Link>
  );
};

const HeaderMenu = () => {
  const { modalIsOpen, toggleModalQR, modalClasses } = useModal();
  return (
    <div className="container wrapper mx-auto flex h-full text-[14px] text-[#696e82] gap-10">
      <div className="flex space-x-5 items-center hoverLink whitespace-nowrap">
        <ProjectsBankButton />
        <Link
          href=""
          className="group mr-6 hover:scale-105 transition-transform duration-300 text-blue-600"
        >
          <GazpromBankSvg />
        </Link>
        <Link className="" href="">
          Для всех
        </Link>
        <Link href="" className="">
          Private
        </Link>
        <Link href="">Малому и среднему бизнесу</Link>
        <Link href="">Крупному бизнесу</Link>
        <Link href="">Финансовым организациям</Link>
        <Link href="">Инвесторам</Link>
        <div className="opacity-0">
          <ThreeDots />
        </div>
        {/*<DropdownMenu />*/}
      </div>
      <div className="flex items-center text-black ml-auto ">
        <div className="flex space-x-8 w-full items-center relative">
          <Cities />
          <div className="whitespace-nowrap">
            <Link
              href=""
              title="Открыть страницу с картой офисов"
              className="hover:text-[#4768BF]"
            >
              Офисы
            </Link>{" "}
            и{" "}
            <Link
              href=""
              title="Открыть страницу с картой банкоматов"
              className="hover:text-[#4768BF] "
            >
              банкоматы
            </Link>
          </div>
          <button className="group hover:scale-120 transition-transform duration-300 ">
            <Magnifier />
          </button>
          <div>
            <button
              className="
            bg-[#0a0a0b14] hover:bg-[#0a0a0b29] text-black text-[16px] transition-colors duration-200 
              rounded-[8px] p-2.5 pl-4 pr-4 cursor-pointer"
              onClick={toggleModalQR}
            >
              Войти
            </button>

            <div className={`${modalClasses} right-0`}>
              <div className=" bg-white w-72 h-22 max-h-full rounded-[12px] custom-shadow p-2">
                <DefoultLinkGPB href={""} bg={""} title={"Интернет-банк"} />
                <DefoultLinkGPB href={""} bg={""} title={"ГПБ Бизнес-онлайн"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HeaderMenu;

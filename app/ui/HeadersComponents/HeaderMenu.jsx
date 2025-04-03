"use client";

import Link from "next/link";
import SquareOfDots, {
  GazpromBankSvg,
  Magnifier,
  ThreeDots,
} from "../SvgElements";

import Cities from "../Cities";

const HeaderMenu = () => {
  return (
    <div className="container wrapper mx-auto flex h-full text-[14px] text-[#696e82] gap-10">
      <div className="flex space-x-5 items-center hoverLink whitespace-nowrap">
        <div tabIndex="0">
          <Link href="" className="group ">
            <SquareOfDots />
          </Link>
        </div>
        <Link
          href=""
          className="group mr-6 hover:scale-105 transition-transform duration-300 "
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
        <div className="flex space-x-8 w-full">
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
              className="hover:text-[#4768BF]"
            >
              банкоматы
            </Link>
          </div>
          <button className="group hover:scale-120 transition-transform duration-300 ">
            <Magnifier />
          </button>
          <Link href="">Войти</Link>
        </div>
      </div>
    </div>
  );
};
export default HeaderMenu;

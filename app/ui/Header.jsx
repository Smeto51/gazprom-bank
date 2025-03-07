"use client";

import "./header.css";
import Link from "next/link";
import SquareOfDots, { GazpromBankSvg, Magnifier } from "./SvgElements";
import DropdownMenu from "./DropdownMenu";
// Возможно понадобиться позже box-shadow: 0px -5px 10px 0px rgba(0, 0, 0, 0.5)
//shrink-0 - сжатие, если 0, то сжатие не происходи, в данном контексте отменит перенос элементов
const Header = () => {
  return (
    <header>
      <div className="header_full_main_menu flex  justify-center p-2 text-[14px] shadow-md">
        <div className="flex wrapper text-[#696e82] ">
          <div className="flex shrink-0 space-x-[var(--spacingHeader)] items-center hoverLink">
            <div
              tabIndex="0"
              className="lg:p-[10px] lg:-ml-[100px] lg:w-[35px] "
            >
              <Link href="" className="group ">
                <SquareOfDots />
              </Link>
            </div>
            <Link
              href=""
              className="group mr-10 hover:scale-105 transition-transform duration-300"
            >
              <GazpromBankSvg />
            </Link>

            <Link className="text-[#000000]" href="">
              Для всех
            </Link>
            <Link href="" className="">
              Private
            </Link>
            <Link href="">Малому и среднему бизнесу</Link>
            <Link href="">Крупному бизнесу</Link>
            <Link href="">Финансовым организациям</Link>
            <DropdownMenu />
          </div>
          <div className="flex justify-end w-95  items-center ml-[var(--spacingHeader)] space-x-[var(--spacingHeader)]">
            <Link href="">Мурманск</Link>
            <Link href="">Офисы и банкоматы</Link>
            <Magnifier />
            <Link href="">Войти</Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

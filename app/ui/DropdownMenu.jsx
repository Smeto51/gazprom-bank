"use client";
import { useEffect, useRef, useState } from "react";
import { ThreeDots } from "./SvgElements";
import Link from "next/link";

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useRef();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropDownRef}>
      <button onClick={toggleMenu} className="group">
        <ThreeDots />
      </button>
      <div
        className={
          `
        duration-300
        absolute mt-2 min-w-[213px] max-w-[288px]
        rounded-xl custom-shadow bg-white
        text-black text-base h-[52px] 
        flex items-center
        ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}
        transition-all` /** Анимирует все изменения (прозрачность и трансформацию).*/
        }
      >
        <div className="duration-300 px-5">
          <Link href="">Инвесторам</Link>
        </div>
      </div>
    </div>
  );
};

export default DropdownMenu;

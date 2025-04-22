"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useWindowSize } from "./useWindowSize";

const CLASS_MODAL = "transition ease-in-out duration-300 z-20"
const CLASS_MODAL_OPEN = "opacity-100 translate-y-0"
const CLASS_MODAL_CLOSE = "opacity-0 translate-y-5 pointer-events-none"


function animation() {

}

export const useModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const { width } = useWindowSize();

  const modalClasses = useMemo(
    () => ({
      default: `absolute top-full mt-2 ${CLASS_MODAL} ${
        modalIsOpen && !isAnimating
          ? CLASS_MODAL_OPEN
          : CLASS_MODAL_CLOSE
      }`,
      phone: `${CLASS_MODAL} ${
        modalIsOpen && !isAnimating
          ? CLASS_MODAL_OPEN
          : CLASS_MODAL_CLOSE
      }`,
      bg: `${CLASS_MODAL} ${
        modalIsOpen && !isAnimating
          ? CLASS_MODAL_OPEN
          : "opacity-0 translate-y-0 pointer-events-none"
      }`,
    }),
    [modalIsOpen, isAnimating]
  );

  const closeModal = useCallback(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => {
      setModalIsOpen(false);
      setIsAnimating(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const toggleModal = useCallback(() => {
    modalIsOpen ? closeModal() : setModalIsOpen(true);
  }, [modalIsOpen, closeModal]);

  useEffect(() => {
    if (!modalIsOpen || width < 1024) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const isScrollbarClick =
        target.classList.contains("custom-scrollbar") ||
        event.clientX > document.documentElement.clientWidth ||
        event.clientY > document.documentElement.clientHeight;

      if (!isScrollbarClick) {
        closeModal();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key == "Escape") {
        closeModal();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalIsOpen, closeModal]);

  return {
    modalIsOpen,
    modalRef,
    toggleModal,
    modalClasses,
  };
};

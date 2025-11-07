"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useWindowSize } from "./useWindowSize";

const MODAL_CLASSES = {
  base: "transition ease-in-out duration-300 z-1",
  open: "opacity-100 translate-y-0",
  close: "opacity-0 translate-y-5 pointer-events-none",
  closeBg: "opacity-0 translate-y-0 pointer-events-none",
  open2: "opacity-100 ",
  close2: "opacity-0 pointer-events-none",
} as const;

const getModalStateClass = (modalIsOpen: boolean, isAnimating: boolean) =>
  `${MODAL_CLASSES.base} ${
    modalIsOpen && !isAnimating ? MODAL_CLASSES.open : MODAL_CLASSES.close
  }  `;

export const useModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const { width } = useWindowSize();

  const modalClasses = useMemo(
    () => ({
      default: `absolute top-full mt-2 ${getModalStateClass(
        modalIsOpen,
        isAnimating
      )}`,
      phone: `${getModalStateClass(modalIsOpen, isAnimating)}`,
      bg: `${MODAL_CLASSES.base} ${
        modalIsOpen && !isAnimating ? MODAL_CLASSES.open : MODAL_CLASSES.closeBg
      }`,
      opacity: `${MODAL_CLASSES.base} ${
        modalIsOpen && !isAnimating ? MODAL_CLASSES.open2 : MODAL_CLASSES.close2
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
    if (modalIsOpen) {
      closeModal();
    } else {
      setModalIsOpen(true);
    }
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
  }, [modalIsOpen, closeModal, width]);

  return {
    modalIsOpen,
    modalRef,
    toggleModal,
    modalClasses,
  };
};

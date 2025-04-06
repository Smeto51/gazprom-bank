'use client'

import { useCallback, useEffect, useRef, useState } from "react";

export const useModal = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    const closeModal = useCallback(() => {
        setIsAnimating(true);
        setTimeout(() => {
          setModalIsOpen(false);
          setIsAnimating(false);
        }, 300);
      }, []);

      const toggleModalQR = useCallback(() => {
          if (modalIsOpen) {
            closeModal();
          } else {
            setModalIsOpen(true);
          }
        }, [modalIsOpen, closeModal]);
      
        useEffect(() => {
          if (!modalIsOpen) return;
      
          const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            const isScrollbarClick = target.classList.contains('custom-scrollbar') || 
            (event.clientX > (document.documentElement.clientWidth)) || (event.clientY > (document.documentElement.clientHeight))

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

        return {modalIsOpen, isAnimating, modalRef, toggleModalQR }
}
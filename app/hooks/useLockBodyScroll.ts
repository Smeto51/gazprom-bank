"use client";

import { useEffect } from "react";

export const useLockBodyScroll = (isLocked: boolean) => {
  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") {
      return;
    }

    if (!isLocked) return;
    const scrollY = window.scrollY;
    const hasScrollbar =
      document.documentElement.scrollHeight > window.innerHeight;

    const scrollbarWidth = hasScrollbar
      ? window.innerWidth - document.documentElement.clientWidth
      : 0;

    const prevOverflow = document.body.style.overflow;
    const prevPosition = document.body.style.position;
    const prevTop = document.body.style.top;
    const prevWidth = document.body.style.width;
    const prevPaddingRight = document.body.style.paddingRight;

    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.position = prevPosition;
      document.body.style.top = prevTop;
      document.body.style.width = prevWidth;
      document.body.style.paddingRight = prevPaddingRight;

      window.scrollTo(0, scrollY);
    };
  }, [isLocked]);
};

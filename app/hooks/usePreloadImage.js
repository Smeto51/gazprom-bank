"use client";

import { useEffect, useRef } from "react";

export function useImagePreload(urls = []) {
  const doneRef = useRef(new Set());
  const inFlightRef = useRef(new Map());

  useEffect(() => {
    if (!Array.isArray(urls) || urls.length === 0) return;
    const unique = Array.from(new Set(urls)).filter(Boolean);

    unique.forEach((url) => {
      if (doneRef.current.has(url)) return;
      if (inFlightRef.current.has(url)) return;

      const img = new Image();

      const markDone = () => {
        doneRef.current.add(url);
        inFlightRef.current.delete(url);
      };

      img.onload = () => {
        console.log("img loaded:", url);
        markDone();
      };

      img.onerror = () => {
        console.warn("img failed:", url);
        markDone();
      };

      inFlightRef.current.set(url, img);
      img.src = url;
    });
  }, [urls]);
}

"use client";

import { useEffect, useRef } from "react";

export function useImagePreload(urls = []) {
  const doneRef = useRef(new Set());

  useEffect(() => {
    if (!Array.isArray(urls) || urls.length === 0) return;
    const unique = Array.from(new Set()).filter(Boolean);

    unique.forEach((url) => {
      //has была ли уже ранее загрузка
      if (doneRef.current.has(url)) return;
      const img = new Image();

      const markDone = () => {
        doneRef.current.add(url);
        img.onload = () => console.log("img loaded: " + img);
        img.onerror = null;
      };

      img.onload = markDone;
      img.onerror = markDone;
      img.src = url;
    });
  }, [urls]);
}

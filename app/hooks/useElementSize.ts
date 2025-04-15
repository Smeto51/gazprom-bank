"use client";

import { RefObject, useEffect, useRef, useState } from "react";

type ElementSize = {
  width: number;
  height: number;
};
/** T — это обобщенный (generic) параметр типа
    extends HTMLElement означает, что T может быть любым HTML-элементом или его потомком 
*/
export function useElementSize<T extends HTMLElement>(): [
  RefObject<T | null>,
  ElementSize
] {
  const ref = useRef<T>(null);
  const [size, setSize] = useState<ElementSize>({ width: 0, height: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const updateSize = () => {
      const newWidth = element.offsetWidth;
      const newHeight = element.offsetHeight;

      setSize((prevSize) => {
        if (prevSize.width !== newWidth || prevSize.height !== newHeight) {
          return { width: newWidth, height: newHeight };
        }
        return prevSize;
      });
    };

    updateSize();

    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(element);

    // Добавляем MutationObserver для отслеживания изменений в DOM (например, смена города)
    const mutationObserver = new MutationObserver(updateSize);
    mutationObserver.observe(element, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return [ref, size];
}

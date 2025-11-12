"use client";

import { useEffect, useState } from "react";

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat("ru-RU").format(num);
};

export const AnimatedCounter = ({
  value,
  duration = 50,
  isFloor = true,
}: {
  value: number;
  duration?: number;
  isFloor?: boolean;
}) => {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    const startTime = Date.now();
    const startValue = displayValue;
    const endValue = value;

    const updateValue = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const currentValue = startValue + (endValue - startValue) * progress;
      setDisplayValue(
        isFloor ? Math.floor(currentValue) : Number(currentValue.toFixed(2))
      );

      if (progress < 1) {
        requestAnimationFrame(updateValue);
      }
    };
    requestAnimationFrame(updateValue);
  }, [value, duration, displayValue, isFloor]);
  return <>{formatNumber(displayValue)}</>;
};
/**        ? setDisplayValue(Math.floor(currentValue))
        : setDisplayValue(currentValue); */

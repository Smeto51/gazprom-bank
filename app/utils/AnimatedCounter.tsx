"use client";

import { useEffect, useState } from "react";

const formatNumber = (num: number): string => {
  return new Intl.NumberFormat("ru-RU").format(num);
};

export const AnimatedCounter = ({
  value,
  duration = 50,
}: {
  value: number;
  duration?: number;
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

      //const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      //const currentValue = startValue + (endValue - startValue) * easeOutQuart;
      const currentValue = startValue + (endValue - startValue) * progress;
      setDisplayValue(Math.floor(currentValue));
      if (progress < 1) {
        requestAnimationFrame(updateValue);
      }
    };
    requestAnimationFrame(updateValue);
  }, [value, duration, displayValue]);
  return <>{formatNumber(displayValue)}</>;
};

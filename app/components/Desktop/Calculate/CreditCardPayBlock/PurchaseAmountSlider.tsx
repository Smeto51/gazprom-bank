"use client";

export const PurchaseAmountSlider = () => {
  const MIN = 100;
  const MAX = 1000000;
  const step = 2900;
  return (
    <div>
      <h3 className="text-[28px] font-semibold">Минимальные платежи</h3>
      <span>Сумма покупки</span>
      <div className="realtive text-gray-300 text-[14px]">
        <span>от 100 ₽</span>
        <span className="absolute right-3">до 1 000 000 ₽</span>
      </div>
    </div>
  );
};

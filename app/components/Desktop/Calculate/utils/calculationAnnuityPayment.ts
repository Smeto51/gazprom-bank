export const getDynamicMonthlyRate = (
  months: number,
  loverRate: number = 0
) => {
  if (months <= 13) return 1.0278 - loverRate;
  if (months <= 26) return 1.0235 - loverRate;
  return 1.018 - loverRate;
};

export const calculateDifferentiatedPayment = (
  amount: number,
  months: number,
  monthlyRate: number
) => {
  const i = monthlyRate - 1;
  const principal = Math.round(amount / months);
  const interest = Math.round(amount * i);
  return principal + interest;
};

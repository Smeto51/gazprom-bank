export const parseDate = (value: string): Date | undefined => {
  const [dd, mm, yyyy] = value.split(".");
  if (!dd || !mm || !yyyy) return undefined;
  const d = new Date(Number(yyyy), Number(mm) - 1, Number(dd));
  return isNaN(d.getTime()) ? undefined : d;
};

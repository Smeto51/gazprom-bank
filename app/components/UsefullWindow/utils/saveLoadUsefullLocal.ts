"use client";

const KEY = "useful_completed";

export const loadUsefulLocalCompleted = (len: number): boolean[] => {
  const rtrn = Array(len).fill(false);
  try {
    const raw =
      typeof window !== "undefined" ? localStorage.getItem(KEY) : null;
    if (!raw) return rtrn;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length !== len) return rtrn;
    return parsed.map(Boolean);
  } catch (err) {
    console.warn("Ошибка при чтении данных из localStorage:", err);
    return rtrn;
  }
};

export const saveUsefulLocalCompleted = (value: boolean[]) => {
  try {
    if (typeof window !== "undefined") {
      localStorage.setItem(KEY, JSON.stringify(value));
    }
  } catch (err) {
    console.warn("Не удалось сохранить в localStorage:", err);
  }
};

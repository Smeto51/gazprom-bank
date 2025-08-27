"use client";

export const sortTips = <T extends { index: number }>(
  items: T[],
  completed: boolean[]
): T[] => {
  return [...items].sort((a, b) => {
    const done = Number(completed[a.index]) - Number(completed[b.index]);
    return done !== 0 ? done : a.index - b.index;
  });
};

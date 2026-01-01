"use client";

import { Case2Block } from "./Case2Block";

export const Case2Task5 = () => {
  const baseButton = {
    label: "Base",
    render() {
      return `Render ${this.label}`;
    },
    render2: () => `Render: стрелочная функция, this = ${typeof this}`,
  };
  const btn = Object.create(baseButton);
  btn.label = "Smeto";

  function printName(this: { name: string }) {
    return this.name;
  }

  return (
    <div className="flex flex-col gap-4">
      <Case2Block result={btn.render()} />
      <Case2Block result={btn.render2()} />
      <Case2Block result={printName.call({ name: "CALL" })} />
    </div>
  );
};

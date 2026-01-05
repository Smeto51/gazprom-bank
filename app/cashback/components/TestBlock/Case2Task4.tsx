"use client";

import { Case2Block } from "./Case2Block";

export const Case2Task4 = () => {
  const base = { kind: "base" };
  const child = Object.create(base);
  const isChildBaseKind =
    "Есть ли у child собственное свойство kind:" +
    " " +
    child.hasOwnProperty("kind");
  const childRes = "Чему равен child.kind:" + " " + child.kind;
  const isKindFromChild = "kind" in child;
  const newChild = (child.kind = "child");
  const shadowing = child.hasOwnProperty("kind");
  delete child.kind;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-200 p-8 rounded-xl ">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col gap-3">
          <Case2Block result={"2 " + isChildBaseKind} />
          <Case2Block result={"3 " + childRes} />
          <Case2Block
            result={
              "4 kind in child свойство доступно через цепочку прототипов: " +
              isKindFromChild.toString()
            }
          />
          <Case2Block
            result={"5 Есть ли у child собственное свойство kind: " + shadowing}
          />
          <Case2Block
            result={"6 child.kind: " + newChild + ". base.kind: " + base.kind}
          />
          <Case2Block
            result={"7 child.kind: " + child.kind + ". base.kind: " + base.kind}
          />
        </div>
      </div>
    </div>
  );
};

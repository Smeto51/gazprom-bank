"use client";
import { Case2Task2 } from "../Case2Task2";
import { NAME_AGE, TEST_NUMBER_ARRAY, TEST_PRODUCTS } from "../data/constant";

export const taskcase = (index: number) => {
  const array5 = TEST_NUMBER_ARRAY;
  const numberFive = array5.filter((n) => n > 5);
  const overPeople18 = NAME_AGE.filter((people) => people.age > 18);

  switch (index) {
    case 0:
      return `[ ${numberFive.join(", ")} ]`;
    case 1:
      return overPeople18.map((people, index) => (
        <div key={index} className="ml-5">
          <span>{people.name} </span>
          <span>{people.age} </span>
        </div>
      ));
    case 2:
      return TEST_NUMBER_ARRAY.map((number) => ` ${number * 10}`);
    case 3:
      return NAME_AGE.map((ppl) => ` ${ppl.name}`);
    case 4:
      return ["apple", "orange", "banana"].find((el) => el === "banana");
    case 5:
      const people = NAME_AGE.find((ppl) => ppl.id === 2);
      return people?.name;
    case 6:
      return TEST_NUMBER_ARRAY.some((el) => el > 5).toString();
    case 7:
      return NAME_AGE.some((el) => !el.isActive).toString();
    case 8:
      return TEST_NUMBER_ARRAY.every((el) => el > 5).toString();
    case 9:
      return NAME_AGE.every((el) => el.isActive).toString();
    case 10:
      return TEST_NUMBER_ARRAY.reduce((sum, number) => sum + number, 0);
    case 11:
      return NAME_AGE.reduce((sum, el) => sum + (el.isActive ? el.age : 0), 0);
    case 12:
      const copy = TEST_NUMBER_ARRAY.slice();
      const del = copy.shift();

      return copy.join(", ") + " Удаленный элемент: " + del;
    case 13:
      const copy2 = [...TEST_NUMBER_ARRAY];
      const del2 = copy2.pop();

      return copy2.join(", ") + " Удаленный элемент: " + del2;
    case 14:
      const spliceCopy = TEST_NUMBER_ARRAY.slice();
      spliceCopy.splice(1, 0, 10, 20, 30, 100);
      spliceCopy.splice(4, 5);
      spliceCopy.splice(1, 1, 666);
      spliceCopy.unshift(0);
      spliceCopy.push(0);
      return spliceCopy.join(", ");
    default:
      return "";
  }
};

export interface CategoryTotal {
  [key: string]: number;
}

export const case2Task2 = () => {
  const total: CategoryTotal = TEST_PRODUCTS.reduce(
    (sum: CategoryTotal, el) => {
      const { category, price } = el;
      if (!sum[category]) {
        sum[category] = 0;
      }
      sum[category] += price;
      return sum;
    },
    {}
  );

  const counts: CategoryTotal = TEST_PRODUCTS.reduce(
    (acc: CategoryTotal, el) => {
      acc[el.category] = (acc[el.category] || 0) + 1;
      return acc;
    },
    {}
  );

  const sumTotal: number = Object.values(total).reduce(
    (sum: number, val: number) => sum + val,
    0
  );
  return <Case2Task2 sumTotal={sumTotal} total={total} counts={counts} />;
};

export const taskcase2 = (index: number) => {
  switch (index) {
    case 0:
      const food = TEST_PRODUCTS.filter((el) => el.category === "food");
      return food.map((el) => el.title + ", ");
    case 1:
      return TEST_PRODUCTS.map((el) => el.title + ", ");
    case 2:
      return case2Task2();

    default:
      return "";
  }
};

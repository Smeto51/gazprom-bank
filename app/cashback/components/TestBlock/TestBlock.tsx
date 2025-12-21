"use client";

import { NAME_AGE, TASKS, TASKS_2, TEST_NUMBER_ARRAY } from "./data/constant";
import { TableOfContents } from "./TableOfContents";

export const TestBlock = () => {
  const array5 = TEST_NUMBER_ARRAY;
  const numberFive = array5.filter((n) => n > 5);
  const overPeople18 = NAME_AGE.filter((people) => people.age > 18);

  const taskcase = (index: number) => {
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
        return NAME_AGE.reduce(
          (sum, el) => sum + (el.isActive ? el.age : 0),
          0
        );
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

  return (
    <div className="relative mt-10">
      <TableOfContents />
      <h3 id="start" className="text-5xl font-semibold text-center">
        Блок для кейсов
      </h3>
      <div className="flex flex-col items-center">
        {TASKS.map((task, index) => (
          <div
            className="bg-blue-500 w-[80vw] rounded-2xl mt-10 transition-all duration-300 text-white text-lg p-11 mb-5"
            key={index}
          >
            <h3 className="text-3xl font-semibold leading-14">{task.title}</h3>
            <p className="whitespace-pre-line mb-5 text-xl">{task.desc}</p>

            {task.taskCode && (
              <pre className="bg-gray-800 text-green-400 rounded-lg font-mono text-sm whitespace-pre-wrap overflow-x-auto p-4 mb-6 w-fit">
                <code>{task.taskCode}</code>
              </pre>
            )}
            <br />
            <span>
              <i className="font-semibold">Ответ: {taskcase(index)}</i>
            </span>
          </div>
        ))}
        <h3 id="neon-line" className="text-3xl font-semibold">
          <i>Кейсы 2</i>
        </h3>
        <div
          className="bg-black w-[70vw] h-1 rounded-full 
          bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 shadow-[0_0_10px_#00ffff,0_0_20px_#0080ff,0_0_30px_#4f46e5] animate-pulse mt-5"
        />

        {TASKS_2.map((task, index) => (
          <div
            className="bg-blue-500 w-[80vw] rounded-2xl mt-10 transition-all duration-300 text-white text-lg p-11 mb-5"
            key={index}
          >
            <h3 className="text-3xl font-semibold leading-14">{task.title}</h3>
            <p className="whitespace-pre-line mb-5 text-xl">{task.desc}</p>

            {task.taskCode && (
              <pre className="bg-gray-800 text-green-400 rounded-lg font-mono text-sm whitespace-pre-wrap overflow-x-auto p-4 mb-6 w-fit">
                <code>{task.taskCode}</code>
              </pre>
            )}
            <br />
            <span>
              <i className="font-semibold">Ответ: {taskcase(index)}</i>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

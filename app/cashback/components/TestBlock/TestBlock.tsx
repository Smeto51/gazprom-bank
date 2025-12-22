"use client";

import { TASKS, TASKS_2 } from "./data/constant";
import { TableOfContents } from "./TableOfContents";
import { taskcase, taskcase2 } from "./utils/tasks";

export const TestBlock = () => {
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
            className="bg-blue-400 w-[80vw] rounded-2xl mt-10 transition-all duration-300 text-white text-lg p-11 mb-5"
            key={index}
          >
            <h3 className="text-3xl font-semibold leading-8">{task.title}</h3>
            <p className="whitespace-pre-line mb-5 text-xl">{task.desc}</p>

            {task.taskCode && (
              <pre className="bg-gray-800 text-green-400 rounded-lg font-mono text-sm whitespace-pre-wrap overflow-x-auto p-4 mb-6 w-fit">
                <code>{task.taskCode}</code>
              </pre>
            )}
            <br />
            <span>
              <i className="font-semibold">Ответ: {taskcase2(index)}</i>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

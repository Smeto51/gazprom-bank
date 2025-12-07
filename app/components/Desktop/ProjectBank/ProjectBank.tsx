"use client";

import Image from "next/image";
import { PROJECT_BANK } from "./data/constant";
import { ArrowSVG } from "@/app/ui/SvgElements";
import { useState } from "react";

export const ProjectBank = () => {
  const [isVisibleAllProject, setIsVisibleAllProject] = useState(false);

  return (
    <div className="relative pt-15 pb-16 ">
      <h2 className="text-[40px] leading-12 font-semibold mb-10">
        Проекты банка
      </h2>
      <div className="relative flex flex-wrap text-white gap-8">
        {PROJECT_BANK.map((project, index) => (
          <div
            key={index}
            className={`realtive ${project.bg} rounded-2xl 
            lg:basis-[calc(50%-24px)] lg:flex-shrink-0 lg:flex-grow-0
            hover:-translate-y-2 duration-300 transition-all cursor-pointer 
            ${
              index > 3 && !isVisibleAllProject
                ? "opacity-0 overflow-hidden w-0 h-0"
                : "opacity-100"
            }`}
          >
            <div className="relative">
              <div className="absolute right-0 bottom-0 lg:w-[272px] lg:h-[272px]">
                <Image
                  src={project.src}
                  alt={`Изображение: ${project.title}`}
                  fill
                  sizes="(max-width: 1279px) 100vw, 1280px"
                />
              </div>
              <div className="relative lg:p-8 lg:min-h-[352px] lg:max-w-[396px]">
                <h3 className="font-semibold text-[28px] leading-8 ">
                  {project.title}
                </h3>
                <p className="mt-4">{project.desc}</p>
                <div
                  className={`absolute flex bottom-8 items-center bg-white/10 p-4 rounded-[8px]`}
                >
                  <button className="w-5 ">
                    <ArrowSVG />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <button
          onClick={() => setIsVisibleAllProject(true)}
          className={`px-8 py-4 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition duration-500 
            ${
              isVisibleAllProject
                ? "opacity-0 pointer-events-none"
                : "opacity-100 cursor-pointer"
            }`}
        >
          Все проекты банка
        </button>
      </div>
    </div>
  );
};

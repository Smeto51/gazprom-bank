"use client";

import Link from "next/link";

type ErrorProps = {
  error: string;
};

export const ErrorComponent = ({ error }: ErrorProps) => (
  <div className="relative">
    <p className="text-[crimson] text-center text-4xl animate-pulse">{error}</p>
    <div className="mx-auto flex justify-center text-2xl animate-bounce">
      <Link href={"/posts/"}>
        <div className="bg-indigo-400 to-white p-3 pl-11 pr-11 rounded-lg mt-10">
          Вернуться назад
        </div>
      </Link>
    </div>
  </div>
);

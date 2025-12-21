"use client";

export const TableOfContents = () => (
  <div className="flex justify-center gap-6 mb-10 flex-wrap">
    <a
      href="#start"
      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors"
    >
      Кейсы LVL 1
    </a>
    <a
      href="#neon-line"
      className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 rounded-lg text-white font-medium transition-colors shadow-lg animate-pulse"
    >
      Кейсы LVL 2
    </a>
  </div>
);

"use client";
interface PropBlock {
  result: string;
}

export const Case2Block = ({ result }: PropBlock) => (
  <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 ">
    <div className="p-6">
      <div className="flex items-center mb-4">
        <div className="w-full bg-indigo-100 rounded-lg flex items-center">
          <span className="text-2xl font-bold text-indigo-600 ml-2">
            {result}
          </span>
        </div>
      </div>
    </div>
  </div>
);

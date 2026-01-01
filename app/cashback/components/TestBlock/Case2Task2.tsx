"use client";

import { TEST_PRODUCTS } from "./data/constant";

export interface CategoryTotal {
  [key: string]: number;
}

interface Product {
  sumTotal: number;
  total: CategoryTotal;
  counts: CategoryTotal;
}

export const Case2Task2 = ({ sumTotal, total, counts }: Product) => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-xl">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">📦</span>
            <h3 className="text-3xl font-bold text-gray-800">
              Итоги по категориям
            </h3>
          </div>
          <p className="text-gray-600">
            Суммарная стоимость товаров в каждой категории
          </p>
        </div>
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-100 text-sm mb-1">Общая сумма</p>
              <p className="text-4xl font-bold">${sumTotal.toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="text-indigo-100 text-sm mb-1">Всего товаров</p>
              <p className="text-4xl font-bold">{TEST_PRODUCTS.length}</p>
            </div>
            <span className="text-5xl opacity-50">📈</span>
          </div>
        </div>

        <div className="space-y-4">
          {Object.entries(total).map((item, index) => {
            const categoryName = item[0];
            const totalPrice = item[1];

            const partOfTotal = totalPrice / sumTotal;
            const inPercents = partOfTotal * 100;
            const rounded = inPercents.toFixed(1);

            const numberOfItems = counts[categoryName];

            return (
              <div
                key={categoryName}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <span className="text-2xl font-bold text-indigo-600">
                          {index + 1}
                        </span>
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-800">
                          {categoryName}
                        </h2>
                        <p className="text-gray-500 text-sm">
                          {numberOfItems}{" "}
                          {numberOfItems === 1 ? "товар" : "товара"}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">💵</span>
                        <span className="text-3xl font-bold text-gray-800">
                          {totalPrice.toLocaleString() + "$"}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {rounded}% от общей суммы
                      </p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 ">
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full transition-all duration-500 animate-pulse"
                      style={{ width: `${rounded}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

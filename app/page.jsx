"use client";
import { FINANCIAL_PRODUCTS_ITEMS } from "./Variable";

export default function Home() {
  console.log("Загруженно Home");
  return (
    <div>
      <div className="max-[1023]:max-w-3xl max-[1023]:ml-auto max-[1023]:mr-auto">
        <section>
          {FINANCIAL_PRODUCTS_ITEMS.map((item) => (
            <div key={item.id}>
              <h3>{item.title}</h3>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

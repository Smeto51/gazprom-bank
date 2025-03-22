import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://www.gazprombank.ru/api/v1/gazprombank/city/list/site/?ab_segment=segment11"
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Данные ошибки:", errorData);
      console.error("Статус кож:", response.status);
      console.error(
        "Заголовки",
        Object.fromEntries(response.headers.entries())
      );
      return NextResponse.json(
        { error: "Ошибка загрузки данных", details: errorData },
        { status: response.status }
      );
    }

    // Парсим JSON-тело ответа
    const data = await response.json();

    // Возвращаем JSON-ответ клиенту
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Ошибка при загрузке данных" },
      { status: 500 }
    );
  }
}

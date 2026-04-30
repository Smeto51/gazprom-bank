import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://www.gazprombank.ru/api/v1/gazprombank/city/list/site/?ab_segment=segment11",
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        },
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Данные ошибки:", errorData);
      console.error("Статус:", response.status);
      console.error(
        "Заголовки",
        Object.fromEntries(response.headers.entries()),
      );
      return NextResponse.json(
        { error: "Ошибка загрузки данных", details: errorData },
        { status: response.status },
      );
    }

    // Парсим JSON-тело ответа
    const data = await response.json();

    // Возвращаем JSON-ответ клиенту
    return NextResponse.json(data);
  } catch (error) {
    console.error("Ошибка при загрузке данных:", error);
    return NextResponse.json(
      { error: "Ошибка при загрузке данных", detail: error.message },
      { status: 500 },
    );
  }
}

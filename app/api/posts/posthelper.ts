import { NextResponse } from "next/server";

export const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

export async function upstreamError(res: Response) {
  const errorData = await res.json();
  console.error("Данные ошибки:", errorData);
  console.error("Статус:", res.status);

  const headersIterator = res.headers.entries();
  const headersObject = Object.fromEntries(headersIterator);
  console.error("Заголовки", headersObject);

  return NextResponse.json(
    {
      error: "Ошибка загрузки данных",
      details: errorData,
      status: res.status,
    },
    {
      status: 502,
    }
  );
}

export function upstreamError502Catch() {
  return NextResponse.json(
    { error: "Не удалось получить посты" },
    { status: 500 }
  );
}

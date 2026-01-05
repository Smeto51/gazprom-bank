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

export const upstreamError500Catch = () => {
  return NextResponse.json(
    { error: "Не удалось получить посты" },
    { status: 500 }
  );
};

export const isErrorNotFound = (postId: number) => {
  if (!Number.isFinite(postId) || postId <= 0) {
    return NextResponse.json({ error: "Ничего не найдено" }, { status: 404 });
  }
};

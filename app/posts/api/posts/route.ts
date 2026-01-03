import { NextResponse } from "next/server";
import { Post } from "./types";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

export async function GET() {
  try {
    const res = await fetch(POSTS_URL, {
      cache: "no-store",
    });

    if (!res.ok) {
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
    const data = await res.json();

    if (!Array.isArray(data)) {
      return NextResponse.json(
        { error: "Неожиданная форма ответа" },
        { status: 500 }
      );
    }
    const posts: Post[] = data.map((p) => ({
      id: Number(p.id),
      title: String(p.title),
      body: String(p.body),
    }));

    return NextResponse.json(posts, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Не удалось получить посты" },
      { status: 500 }
    );
  }
}

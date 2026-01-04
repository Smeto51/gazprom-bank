import { NextResponse } from "next/server";
import { ParamsPostProps, Post } from "../types";
import { POSTS_URL, upstreamError, upstreamError502Catch } from "../posthelper";

export async function GET(_request: Request, context: ParamsPostProps) {
  const idStr = context.params.id;
  const id = Number(idStr);

  if (!Number.isFinite(id) || id <= 0) {
    return NextResponse.json(
      {
        error: "Такой страницы не существует",
      },
      { status: 404 }
    );
  }

  try {
    const res = await fetch(`${POSTS_URL}/${id}`);
    if (!res.ok) {
      if (res.status === 404) {
        return NextResponse.json({ error: "Пост не найден" }, { status: 404 });
      }
      upstreamError(res);
    }
    const data = await res.json();

    const post: Post = {
      id: Number(data.id),
      title: String(data.title),
      body: String(data.body),
    };
    return NextResponse.json(post, { status: 200 });
  } catch {
    upstreamError502Catch();
  }
}

import { NextResponse } from "next/server";
import { ParamsPostProps, Post } from "../types";
import {
  isErrorNotFound,
  POSTS_URL,
  upstreamError,
  upstreamError500Catch,
} from "../posthelper";

export async function GET(_request: Request, { params }: ParamsPostProps) {
  const idStr = params.id;
  const id = Number(idStr);

  isErrorNotFound(id);

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
    upstreamError500Catch();
  }
}

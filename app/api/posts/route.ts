import { NextResponse } from "next/server";
import { Post } from "./types";
import { POSTS_URL, upstreamError, upstreamError500Catch } from "./posthelper";

export async function GET() {
  try {
    const res = await fetch(POSTS_URL);
    if (!res.ok) {
      upstreamError(res);
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
    upstreamError500Catch();
  }
}

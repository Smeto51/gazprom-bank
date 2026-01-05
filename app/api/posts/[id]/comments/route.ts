import { NextResponse } from "next/server";
import { db } from "@/app/db";
import { comments } from "@/app/db/schema";
import { desc, eq } from "drizzle-orm";
import { isErrorNotFound } from "../../posthelper";

type Context = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, { params }: Context) {
  const { id } = await params;
  const postId = Number(id);

  isErrorNotFound(postId);

  const rows = await db
    .select()
    .from(comments)
    .where(eq(comments.postId, postId))
    .orderBy(desc(comments.createdAt));

  return NextResponse.json(rows, { status: 200 });
}

const hasText = (x: unknown): x is { text: string } => {
  return (
    typeof x === "object" &&
    x !== null &&
    "text" in x &&
    typeof (x as Record<string, unknown>).text === "string"
  );
};

export async function POST(request: Request, { params }: Context) {
  const { id } = await params;
  const postId = Number(id);

  isErrorNotFound(postId);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Некорректный JSON" }, { status: 400 });
  }

  const text = hasText(body) ? body.text : "";

  if (text.trim().length < 3) {
    return NextResponse.json(
      {
        error: "Teкст должен содерждать не меньше 3 символов",
      },
      { status: 400 }
    );
  }

  const insertRows = await db
    .insert(comments)
    .values({
      postId,
      text: text.trim(),
    })
    .returning();

  const created = insertRows[0];

  return NextResponse.json(created, { status: 201 });
}

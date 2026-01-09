import { NextResponse } from "next/server";
import { db } from "@/app/db";
import { comments } from "@/app/db/schema";
import { and, desc, eq, lt, or, sql, SQL } from "drizzle-orm";
import { isErrorNotFound } from "../../posthelper";

const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 10;

export type Context = {
  params: Promise<{ id: string }>;
};

const parseCursor = (cursor: string | null) => {
  if (!cursor) return null;

  const parts = cursor.split("|");
  if (parts.length !== 2) {
    return null;
  }

  const createAt = parts[0];
  const id = Number(parts[1]);

  if (!createAt || !Number.isFinite(id)) return null;
  return { createAt, id };
};

export async function GET(request: Request, { params }: Context) {
  const { id } = await params;
  const postId = Number(id);

  isErrorNotFound(postId);

  const { searchParams } = new URL(request.url);
  const cursorRaw = searchParams.get("cursor");
  const cursor = parseCursor(cursorRaw);

  const limitRaw = searchParams.get("limit");
  const parsed = Number(limitRaw ?? DEFAULT_LIMIT);
  const bounded = Math.max(parsed, 1);
  const limit = Math.min(bounded, MAX_LIMIT);

  const base = eq(comments.postId, postId);
  let whereCondition: SQL<unknown> | undefined = base;
  if (cursor) {
    const cursorCreatedAt = new Date(cursor.createAt);
    const cursorId = cursor.id;

    const afterCursor = or(
      lt(comments.createdAt, cursorCreatedAt),
      and(eq(comments.createdAt, cursorCreatedAt), lt(comments.id, cursorId))
    );
    whereCondition = and(base, afterCursor);
  }

  const totalRow = await db
    .select({ count: sql<number>`count(*)` })
    .from(comments)
    .where(eq(comments.postId, postId));

  const total = totalRow[0].count ?? 0;

  const rows = await db
    .select()
    .from(comments)
    .where(whereCondition)
    .orderBy(desc(comments.createdAt), desc(comments.id))
    .limit(limit + 1);

  const hasMore = rows.length > limit;
  const items = hasMore ? rows.slice(0, limit) : rows;

  const nextCursor =
    hasMore && items.length > 0
      ? (() => {
          const last = items[items.length - 1];
          return `${last.createdAt.toISOString()}|${last.id}`;
        })()
      : null;

  return NextResponse.json({ items, nextCursor, total }, { status: 200 });
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

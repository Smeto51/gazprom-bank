import { FormEvent, useCallback, useEffect, useRef, useState } from "react";

export type Comment = {
  id: number | string;
  postId: number;
  text: string;
  createdAt: string;
  pending?: boolean;
};

type CommentsPage = {
  items: Comment[];
  nextCursor: string | null;
  total: number;
};

const DEFAULT_LIMIT = 10;

export const useComments = (id: string) => {
  const [nextCursor, setNextCursor] = useState<string | null>(null);

  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [commentsLoadingMore, setCommentsLoadingMore] = useState(false);
  const [commentsError, setCommentsError] = useState<string | null>(null);

  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [total, setTotal] = useState<number>(0);

  const abortRef = useRef<AbortController | null>(null);

  const fetchPage = useCallback(
    async (cursor: string | null, signal?: AbortSignal) => {
      const url = new URL(`/api/posts/${id}/comments`, window.location.origin);
      url.searchParams.set("limit", String(DEFAULT_LIMIT));

      if (cursor) {
        url.searchParams.set("cursor", cursor);
      }

      const res = await fetch(url.toString(), { signal });
      if (!res.ok) {
        throw new Error(`Ошибка загрузки комментариев ${res.status}`);
      }
      const data: CommentsPage = await res.json();
      return data;
    },
    [id]
  );

  const refresh = useCallback(async () => {
    abortRef.current?.abort();

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      setCommentsLoading(true);
      setCommentsError(null);
      const page = await fetchPage(null, controller.signal);

      setTotal(Number(page.total) || 0);
      setComments(page.items);
      setNextCursor(page.nextCursor);
    } catch (e) {
      if (e instanceof DOMException && e.name === "AbortError") {
        return;
      }

      const message = e instanceof Error ? e.message : "Неизвестная ошибка";
      setCommentsError(message);
    } finally {
      if (!controller.signal.aborted) {
        setCommentsLoading(false);
      }
    }
  }, [fetchPage]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitError(null);
    const trimmed = text.trim();
    if (trimmed.length < 3) {
      setSubmitError("Комментарий должен быть минимум 3 символа");
      return;
    }

    const tempId = `temp-${crypto.randomUUID()}`;
    const optimistic: Comment = {
      id: tempId,
      postId: Number(id),
      text: trimmed,
      createdAt: new Date().toISOString(),
      pending: true,
    };

    setComments((prev) => [optimistic, ...prev]);
    setTotal((t) => t + 1);
    setText("");

    try {
      setIsSubmitting(true);

      const res = await fetch(`/api/posts/${id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: trimmed }),
      });

      if (!res.ok) {
        let serverMessage = `Ошибка отправки: ${res.status}`;
        try {
          const errData = await res.json();
          if (typeof errData.error === "string") {
            serverMessage = errData.error;
          }
        } catch {}
        throw new Error(serverMessage);
      }

      const created: Comment = await res.json();

      setComments((prev) =>
        prev.map((comment) => (comment.id === tempId ? created : comment))
      );

      setText("");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Неизвестная ошибка";
      setComments((prev) => prev.filter((comments) => comments.id !== tempId));
      setTotal((t) => Math.max(0, t - 1));
      setSubmitError(message);
      setText(trimmed);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function loadMore() {
    if (!nextCursor) return;
    if (commentsLoadingMore) return;

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      setCommentsLoadingMore(true);
      setCommentsError(null);

      const page = await fetchPage(nextCursor, controller.signal);
      setTotal(Number(page.total) || 0);
      setComments((prev) => {
        const prevIdArray = prev.map((comment) => comment.id);

        const prevIdSet = new Set(prevIdArray);

        const NewCommentWitnotDubble = page.items.filter(
          (comment) => !prevIdSet.has(comment.id)
        );
        return [...prev, ...NewCommentWitnotDubble];
      });

      setNextCursor(page.nextCursor);
    } catch (e) {
      if (e instanceof DOMException && e?.name === "AbortError") return;
      const msg = e instanceof Error ? e.message : "Неизвестная ошибка";
      setCommentsError(msg);
    } finally {
      if (!controller.signal.aborted) setCommentsLoadingMore(false);
    }
  }

  useEffect(() => {
    refresh();

    return () => {
      abortRef.current?.abort();
    };
  }, [refresh]);

  return {
    comments,
    commentsLoading,
    commentsError,
    text,
    setText,
    isSubmitting,
    submitError,
    handleSubmit,
    refresh,
    nextCursor,
    loadMore,
    commentsLoadingMore,
    total,
  };
};

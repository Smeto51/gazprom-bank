import { FormEvent, useEffect, useState } from "react";

export type Comment = {
  id: number;
  postId: number;
  text: string;
  createdAt: string;
};

export const useCommnets = (id: string) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [commentsError, setCommentsError] = useState<string | null>(null);

  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitError(null);

    if (text.trim().length < 3) {
      setSubmitError("Комментарий должен быть минимум 3 символа");
      return;
    }

    try {
      setIsSubmitting(true);

      const res = await fetch(`/api/posts/${id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
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
      console.log("CREATED COMMENT", created);
      setComments((prev) => [created, ...prev]);
      setText("");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Неизвестная ошибка";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    let cancelled = false;

    async function loadCommnet() {
      try {
        setCommentsLoading(true);
        setCommentsError(null);

        const res = await fetch(`/api/posts/${id}/comments`);
        if (!res.ok) {
          throw new Error(`Ошибка загрузки комментариев ${res.status}`);
        }

        const data: Comment[] = await res.json();

        if (!cancelled) {
          setComments(data);
        }
      } catch (e) {
        const message = e instanceof Error ? e.message : "Неизвестная ошибка";
        if (!cancelled) setCommentsError(message);
      } finally {
        if (!cancelled) setCommentsLoading(false);
      }
    }
    loadCommnet();

    return () => {
      cancelled = true;
    };
  }, [id]);

  return {
    comments,
    commentsLoading,
    commentsError,
    text,
    setText,
    isSubmitting,
    submitError,
    handleSubmit,
  };
};

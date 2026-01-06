"use client";
import { FormEvent, use, useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import { ErrorComponent } from "../components/ErrorComponent";
import { Post } from "../../api/posts/types";

type PageProps = {
  params: Promise<{ id: string }>;
};

type Comment = {
  id: number;
  postId: number;
  text: string;
  createdAt: string;
};

export default function PostPage({ params }: PageProps) {
  const { id } = use(params);

  const [posts, setPosts] = useState<Post | null>(null);
  const [postLoading, setPostLoading] = useState(true);
  const [postError, setPostError] = useState<string | null>(null);

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
    async function loadPosts() {
      try {
        setPostLoading(true);
        setPostError(null);

        const res = await fetch(`/api/posts/${id}`);
        if (!res.ok) {
          if (res.status === 404) {
            throw new Error(`Пост не найден ${res.status}`);
          }
          throw new Error(`Запрос завершился с ошибкой ${res.status}`);
        }

        const data: Post = await res.json();

        if (!cancelled) {
          setPosts(data);
        }
      } catch (e) {
        const message = e instanceof Error ? e.message : "Неизвестная ошибка";
        if (!cancelled) setPostError(message);
      } finally {
        if (!cancelled) setPostLoading(false);
      }
    }

    loadPosts();

    return () => {
      cancelled = true;
    };
  }, [id]);

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

  if (postLoading) {
    return <Loading />;
  }

  if (postError) {
    return <ErrorComponent error={postError} />;
  }

  if (!posts) return null;

  return (
    <main>
      <section className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-indigo-50 to-white p-6  rounded-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
          <div
            className="group w-[calc(100%-24px)] mb-3 ml-3 mr-3 m-3 p-6 bg-white rounded-lg
              border border-gray-200 
              hover:shadow-2xl hover:border-indigo-300 hover:-translate-y-2
              duration-300 transition-all"
          >
            <div className="flex flex-col h-full">
              <div className="flex gap-3 mb-4 items-center">
                <div
                  className="w-10 h-10 shrink-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500
                  flex justify-center items-center text-white font-bold group-hover:scale-110 duration-300"
                >
                  {posts.id}
                </div>

                <span className="hover:text-indigo-600 duration-300">
                  <strong>{posts.title}</strong>
                </span>
              </div>

              <p className="group-hover:text-gray-700 duration-300 ">
                {posts.body}
              </p>
              <div
                className="flex items-center mt-2 border-t border-gray-100 
                  group-hover:border-indigo-200 transition-colors duration-300"
              />
              <span
                className="text-sm text-gray-500 group-hover:text-indigo-500 
                    transition-colors duration-300 mt-2"
              >
                {Math.ceil(posts.body.length / 100)} мин чтения
              </span>
            </div>
          </div>
          <section className="ml-3 mr-3 mt-8 p-6 bg-white rounded-lg border border-gray-200">
            <h2 className="text-3xl font-semibold mb-4 text-center">
              Комментарии
            </h2>
            <form
              className="realtive max-w-2xl mx-auto"
              onSubmit={handleSubmit}
            >
              <label className="text-sm font-medium text-gray-700 mb-2">
                Добавить комментарий
              </label>
              <textarea
                value={text}
                onChange={(text) => setText(text.target.value)}
                rows={4}
                placeholder="Напишите комментарий..."
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring duration-300"
                disabled={isSubmitting}
              />

              {submitError && (
                <p className="absolute mt-2 text-sm text-red-600">
                  {submitError}
                </p>
              )}

              <div className="flex justify-end">
                <button
                  className="px-4 py-2 rounded-md bg-indigo-600 text-white cursor-pointer
                  transition-all duration-300
                  hover:bg-indigo-700

                  active:scale-95 
                  active:bg-indigo-800

                  disabled:opacity-50
                  disabled:cursor-not-allowed
                  disabled:active:scale-100"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Отправка..." : "Отправить"}
                </button>
              </div>
            </form>

            <div>
              {commentsLoading && (
                <p className="text-center text-3xl">Загрузка...</p>
              )}
              {commentsError && (
                <p className="text-center text-3xl text-red-600">
                  Ошибка: {commentsError}
                </p>
              )}
              {!commentsLoading && !commentsError && comments.length > 0 ? (
                <ul className="space-y-4 mt-4">
                  {comments.map((c, index) => (
                    <li
                      key={c.id}
                      className="group rounded-xl border border-gray-200 bg-white p-4 shadow-sm
                       hover:shadow-2xl hover:border-indigo-200 transition-all hover:-translate-y-2
                        duration-300"
                    >
                      <div className="flex gap-3 items-center">
                        <div
                          className="w-10 h-10 shrink-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500
                        flex justify-center items-center text-white font-bold group-hover:scale-110 duration-300"
                        >
                          {comments.length - index}
                        </div>
                        <div className="w-px bg-gray-200 self-stretch" />
                        <div>
                          <p className="mt-2 text-gray-800 whitespace-pre-wrap leading-relaxed">
                            {c.text}
                          </p>
                          <p className="text-[12px] text-gray-500 group-hover:text-blue-500">
                            {new Date(c.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xl text-center text-gray-600">Пока пусто…</p>
              )}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

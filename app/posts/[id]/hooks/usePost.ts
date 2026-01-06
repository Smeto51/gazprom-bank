import { Post } from "../../../api/posts/types";
import { useEffect, useState } from "react";

export const usePost = (id: string) => {
  const [posts, setPosts] = useState<Post | null>(null);
  const [postLoading, setPostLoading] = useState(true);
  const [postError, setPostError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
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

    load();

    return () => {
      cancelled = true;
    };
  }, [id]);

  return { posts, postLoading, postError };
};

"use client";

import { useEffect, useState } from "react";

import { Loading } from "./Loading";
import { ErrorComponent } from "./ErrorComponent";
import Link from "next/link";
import { Post } from "../../api/posts/types";

export const PostsClient = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function loadPosts() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/api/posts");
        if (!res.ok) {
          throw new Error(`Запрос завершился с ошибкой ${res.status}`);
        }

        const data: Post[] = await res.json();

        if (!cancelled) {
          setPosts(data);
        }
      } catch (e) {
        const message = e instanceof Error ? e.message : "Неизвестная ошибка";
        if (!cancelled) setError(message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadPosts();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorComponent error={error} />;
  }

  return (
    <div>
      <p className="text-gray-600 text-lg text-center">
        {posts.length} постов найдено
      </p>
      <div className="bg-gradient-to-br from-indigo-50 to-white p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
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
                    {post.id}
                  </div>

                  <Link
                    href={`/posts/${post.id}`}
                    className="hover:text-indigo-600 duration-300"
                  >
                    <strong>{post.title}</strong>
                  </Link>
                </div>

                <p className="group-hover:text-gray-700 duration-300 ">
                  {post.body}
                </p>
                <div
                  className="flex items-center mt-2 border-t border-gray-100 
                  group-hover:border-indigo-200 transition-colors duration-300"
                />
                <span
                  className="text-sm text-gray-500 group-hover:text-indigo-500 
                    transition-colors duration-300 mt-2"
                >
                  {Math.ceil(post.body.length / 100)} мин чтения
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

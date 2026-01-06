"use client";

import { FormEvent } from "react";
import { Comment } from "../hooks/useComments";
import { CommentItem } from "./CommentItem";

type Props = {
  isSubmitting: boolean;
  submitError: string | null;

  text: string;
  setText: (text: string) => void;
  handleSubmit: (e: FormEvent) => void;

  comments: Comment[];
  commentsLoading: boolean;
  commentsError: string | null;
};

export const CommnetsSection = ({
  text,
  setText,
  handleSubmit,

  isSubmitting,
  submitError,

  comments,
  commentsLoading,
  commentsError,
}: Props) => {
  return (
    <section className="ml-3 mr-3 mt-8 p-6 bg-white rounded-lg border border-gray-200">
      <h2 className="text-3xl font-semibold mb-4 text-center">Комментарии</h2>
      <form className="realtive max-w-2xl mx-auto" onSubmit={handleSubmit}>
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
          <p className="absolute mt-2 text-sm text-red-600">{submitError}</p>
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
        {commentsLoading && <p className="text-center text-3xl">Загрузка...</p>}
        {commentsError && (
          <p className="text-center text-3xl text-red-600">
            Ошибка: {commentsError}
          </p>
        )}
        {!commentsLoading && !commentsError && comments.length > 0 ? (
          <ul className="space-y-4 mt-4">
            {comments.map((c, index) => (
              <CommentItem key={c.id} c={c} index={index} />
            ))}
          </ul>
        ) : (
          <p className="text-xl text-center text-gray-600">Пока пусто…</p>
        )}
      </div>
    </section>
  );
};

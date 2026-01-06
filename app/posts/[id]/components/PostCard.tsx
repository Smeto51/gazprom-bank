"use client";

import { Post } from "../../../api/posts/types";

export const PostCard = ({ posts }: { posts: Post }) => (
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

      <p className="group-hover:text-gray-700 duration-300 ">{posts.body}</p>
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
);

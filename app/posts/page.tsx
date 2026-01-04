"use cleint";

import { PostsClient } from "./components/PostsClient";

export default function PostsPage() {
  return (
    <main className="xl:max-w-7xl xl:mx-auto flex flex-col justify-center">
      <h1 className="text-3xl font-semibold text-center">Posts</h1>
      <PostsClient />
    </main>
  );
}

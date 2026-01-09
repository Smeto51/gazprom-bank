"use client";

import { Loading } from "../components/Loading";
import { ErrorComponent } from "../components/ErrorComponent";
import { usePost } from "./hooks/usePost";
import { useComments } from "./hooks/useComments";
import { PostCard } from "./components/PostCard";
import { CommnetsSection } from "./components/CommentsSection";

export default function PostsClient({ id }: { id: string }) {
  const { posts, postLoading, postError } = usePost(id);
  const commentsApi = useComments(id);

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
          <PostCard posts={posts} />
          <CommnetsSection
            isSubmitting={commentsApi.isSubmitting}
            submitError={commentsApi.submitError}
            text={commentsApi.text}
            setText={commentsApi.setText}
            handleSubmit={commentsApi.handleSubmit}
            comments={commentsApi.comments}
            commentsLoading={commentsApi.commentsLoading}
            commentsError={commentsApi.commentsError}
            refresh={commentsApi.refresh}
            loadmore={commentsApi.loadMore}
            nextCursor={commentsApi.nextCursor}
            commentsLoadingMore={commentsApi.commentsLoadingMore}
            total={commentsApi.total}
          />
        </div>
      </section>
    </main>
  );
}

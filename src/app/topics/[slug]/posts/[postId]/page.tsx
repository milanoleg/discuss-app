import { Suspense } from "react";
import Link from "next/link";
import PostShow from "@/components/posts/post-show";
import CommentList from "@/components/comments/comment-list";
import CommentCreateForm from "@/components/comments/comment-create-form";
import paths from "@/paths";

import PostShowLoading from "@/components/posts/post-show-loading";
import CommentsLoading from "@/components/comments/comments-loading";

interface PostShowPageProps {
  params: {
    slug: string;
    postId: string;
  };
}

const PostShowPage = ({ params }: PostShowPageProps) => {
  const { slug, postId } = params;

  return (
    <div className="space-y-3">
      <Link className="underline decoration-solid" href={paths.topicShow(slug)}>
        {"< "}Back to {slug}
      </Link>
        <Suspense fallback={<PostShowLoading />}>
            <PostShow postId={postId} />
        </Suspense>
       <CommentCreateForm postId={postId} startOpen />
        <Suspense fallback={<CommentsLoading />}>
            <CommentList postId={postId} />
        </Suspense>
    </div>
  );
};

export default PostShowPage;

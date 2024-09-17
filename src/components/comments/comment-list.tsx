import CommentShow from "@/components/comments/comment-show";
import {CommentWithAuthor, fetchCommentsByPostId} from "@/db/queries/comments";

interface CommentListProps {
  postId: string;
}

const CommentList = async ({ postId }: CommentListProps) => {
  const comments = await fetchCommentsByPostId(postId);

  const topLevelComments = comments.filter(
    (comment: CommentWithAuthor) => comment.parentId === null
  );
  const renderedComments = topLevelComments.map((comment: CommentWithAuthor) => {
    return (
      <CommentShow
        key={comment.id}
        comment={comment}
        postId={postId}
      />
    );
  });

  return (
    <div className="space-y-3">
      <h1 className="text-lg font-bold">All {comments.length} comments</h1>
      {renderedComments}
    </div>
  );
};

export default CommentList;
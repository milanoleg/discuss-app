import Image from "next/image";
import CommentCreateForm from "@/components/comments/comment-create-form";
import {CommentWithAuthor, fetchCommentsByPostId} from "@/db/queries/comments";

interface CommentShowProps {
  comment: CommentWithAuthor;
  postId: string;
}

const CommentShow = async ({ comment, postId }: CommentShowProps) => {
  const comments = await fetchCommentsByPostId(postId);

  if (!comment) {
    return null;
  }

  const childrenComments = comments.filter((c: CommentWithAuthor) => c.parentId === comment.id);

  const renderedChildren = childrenComments.map((comment: CommentWithAuthor) => (
      <CommentShow key={comment.id} comment={comment} postId={postId} />
  ));

  return (
    <div className="p-4 border mt-2 mb-1">
      <div className="flex gap-3">
        <Image
          src={comment.user.image || ""}
          alt="user image"
          width={40}
          height={40}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1 space-y-3">
          <p className="text-sm font-medium text-gray-500">
            {comment.user.name}
          </p>
          <p className="text-gray-900">{comment.content}</p>

          <CommentCreateForm postId={comment.postId} parentId={comment.id} />
        </div>
      </div>
      <div className="pl-4">{renderedChildren}</div>
    </div>
  );
};

export default CommentShow;

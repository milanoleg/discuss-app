import { cache } from "react";
import type { Comment } from "@prisma/client";

import db from '@/db';

export type CommentWithAuthor = Comment & {
    user: {
        name: string | null;
        image: string | null;
    }
}

const fetchCommentsByPostId = cache((postId: string) => {
    console.log('Query ...');

    return db.comment.findMany({
        where: {
            postId,
        },
        include: {
            user: {
                select: {
                    name: true,
                    image: true,
                }
            }
        }
    })
});

export {
    fetchCommentsByPostId
};
import { Post } from '@prisma/client';
import db from '@/db';

export type PostListItem = Post & {
    topic: {
        slug: string;
    },
    user: {
        name: string | null;
        image?: string | null;
    },
    _count: {
        comments: number;
    }
};

export type PostWithData = Awaited<ReturnType<typeof queryPostsByTopicSlug>>[number];

const queryPostsByTopicSlug = (slug: string): Promise<PostListItem[]> => {
    return db.post.findMany({
        where: {
            topic: {
                slug
            }
        },
        include: {
            topic: { select: { slug: true } },
            user: { select: { name: true } },
            _count: { select: { comments: true } },
        }
    })
};

const queryTopPosts = (): Promise<PostListItem[]> => {
    return db.post.findMany({
        orderBy: [
            {
                comments: {
                    _count: "desc"
                }
            }
        ],
        include: {
            topic: { select: { slug: true } },
            user: { select: { name: true } },
            _count: { select: { comments: true } },
        }
    });
};

const queryPostsBySearchTerm = async (term: string): Promise<PostListItem[]> => {
    return db.post.findMany({
        include: {
            topic: { select: { slug: true } },
            user: { select: { name: true, image: true } },
            _count: { select: { comments: true } },
        },
        where: {
            OR: [
                { title: { contains: term } },
                { content: { contains: term } },
            ]
        }
    });
};

export {
    queryPostsByTopicSlug,
    queryTopPosts,
    queryPostsBySearchTerm,
};
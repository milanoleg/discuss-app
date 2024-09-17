'use server';

import {z} from 'zod';
import {Post} from "@prisma/client";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";

import {auth} from "@/auth";
import db from "@/db";
import paths from "@/paths";

export type CreatePostState = {
    errors: {
        title?: string[];
        content?: string[];
        _form?: string[];
    },
    slug: string;
};

const createPostSchema = z.object({
    title: z.string().min(3),
    content: z.string().min(5),
});

export const createPost = async (state: CreatePostState, formData: FormData): Promise<CreatePostState> => {
    const session = await auth();
    const { slug } = state;

    const result = createPostSchema.safeParse({
        title: formData.get('title'),
        content: formData.get('content'),
    });

    if (!result.success) {
        return {
            ...state,
            errors: result.error.flatten().fieldErrors
        };
    }

    if (!session?.user) {
        return {
            ...state,
            errors: {
                _form: ['User must be logged in to create a new post'],
            }
        }
    }

    let post: Post;

    try {
        const topic = await db.topic.findFirst({
            where: {
                slug
            }
        });

        if (!topic) {
            return {
                ...state,
                errors: {
                    _form: ['Cannot find a topic'],
                }
            }
        }

        post = await db.post.create({
            data: {
                title: result.data.title,
                content: result.data.content,
                userId: session.user.id,
                topicId: topic.id,
            }
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return {
                ...state,
                errors: {
                    _form: [error.message],
                }
            }
        }

        return {
            ...state,
            errors: {
                _form: ['Something went wrong'],
            }
        }
    }

    revalidatePath(paths.topicShow((slug)));
    redirect(paths.postShow(slug, post.id));
};
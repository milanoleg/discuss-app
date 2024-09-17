'use server';

import {z} from 'zod';
import {Topic} from "@prisma/client";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";

import {auth} from "@/auth";
import db from "@/db";
import paths from "@/paths";

export type CreateTopicState = {
    errors: {
        name?: string[];
        description?: string[];
        _form?: string[];
    }
};

const createTopicSchema = z.object({
    name: z.string().min(3).regex(/^[a-z-]+$/, {message: 'Must be a lowercase letters or dashes without spaces'}),
    description: z.string().min(5),
});

export const createTopic = async (state: CreateTopicState, formData: FormData): Promise<CreateTopicState> => {
    const session = await auth();

    const result = createTopicSchema.safeParse({
        name: formData.get('name'),
        description: formData.get('description'),
    });

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        };
    }

    if (!session?.user) {
        return {
            errors: {
                _form: ['User must be logged in to create a new topic'],
            }
        }
    }

    let topic: Topic;

    try {
        topic = await db.topic.create({
            data: {
                slug: result.data.name,
                description: result.data.description,
            }
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return {
                errors: {
                    _form: [error.message],
                }
            }
        }

        return {
            errors: {
                _form: ['Something went wrong'],
            }
        }
    }

    revalidatePath('/');
    redirect(paths.topicShow((topic.slug)));
};
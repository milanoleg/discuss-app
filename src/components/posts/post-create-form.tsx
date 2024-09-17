'use client';

import { useFormState } from 'react-dom';
import {useSession} from "next-auth/react";
import {Input, Button, Textarea, Popover, PopoverContent, PopoverTrigger} from "@nextui-org/react";

import * as actions from '@/actions';
import FormButton from "@/components/common/form-button";
import CreateRestriction from "@/components/common/create-restriction";

type PostCreateFormProps = {
    slug: string;
};

const PostCreateForm = ({ slug }: PostCreateFormProps) => {
    const [formState, action] = useFormState(actions.createPost, {
        errors: {},
        slug,
    });
    const session = useSession();

    const createForm = (
        <form action={action}>
            <div className="flex flex-col gap-4 p-4 w-80">
                <h3 className="text-lg">Create Post</h3>
                <Input label="Title" name="title" labelPlacement="outside" placeholder="Title"
                       isInvalid={!!formState.errors.title}
                       errorMessage={formState.errors.title?.join(', ')}/>
                <Textarea label="Content" name="content" labelPlacement="outside"
                          placeholder="Fill Content" isInvalid={!!formState.errors.content}
                          errorMessage={formState.errors.content?.join(', ')}/>
                <FormButton>Submit</FormButton>
            </div>
            <div className="bg-red-200">{formState.errors._form?.join(', ')}</div>
        </form>
    );

    return (
        <Popover>
            <PopoverTrigger>
                <Button color="primary">Create a Post</Button>
            </PopoverTrigger>
            <PopoverContent>
                {session.data?.user ? createForm : <CreateRestriction entity="Post" />}
            </PopoverContent>
        </Popover>
    );
};

export default PostCreateForm;
'use client';

import { useFormState } from 'react-dom';
import {useSession} from "next-auth/react";
import {Input, Button, Textarea, Popover, PopoverContent, PopoverTrigger} from "@nextui-org/react";

import * as actions from '@/actions';
import FormButton from "@/components/common/form-button";
import CreateRestriction from '@/components/common/create-restriction';

const TopicCreateForm = () => {
    const [formState, action] = useFormState(actions.createTopic, {
        errors: {}
    });
    const session = useSession();

    const createForm = (
        <form action={action}>
            <div className="flex flex-col gap-4 p-4 w-80">
                <h3 className="text-lg">Create Topic</h3>
                <Input label="name" name="name" labelPlacement="outside" placeholder="Name"
                       isInvalid={!!formState.errors.name}
                       errorMessage={formState.errors.name?.join(', ')}/>
                <Textarea label="description" name="description" labelPlacement="outside"
                          placeholder="Describe topic" isInvalid={!!formState.errors.description}
                          errorMessage={formState.errors.description?.join(', ')}/>
                <FormButton>Submit</FormButton>
            </div>
            <div className="bg-red-200">{formState.errors._form?.join(', ')}</div>
        </form>
    );

    return (
        <Popover>
            <PopoverTrigger>
                <Button color="primary">Create a Topic</Button>
            </PopoverTrigger>
            <PopoverContent>
                {session.data?.user ? createForm : <CreateRestriction entity="Topic" />}
            </PopoverContent>
        </Popover>
    );
};

export default TopicCreateForm;
import {Button} from "@nextui-org/react";

import * as actions from "@/actions";

type CreateRestrictionProps = {
    entity: string;
};

const CreateRestriction = ({ entity }: CreateRestrictionProps) => {
    return (
        <div className="flex flex-col justify-center text-center h-52 w-40">
            <div>You must</div>
            <form action={actions.signIn} className="p-2">
                <Button type="submit" color="secondary" variant="bordered" size="sm">Sign In</Button>
            </form>
            <div>or</div>
            <form action={actions.signIn} className="p-2">
                <Button type="submit" color="primary" variant="flat" size="sm">Sign Up</Button>
            </form>
            <div>{`to create a ${entity}`}</div>
        </div>
    )
};

export default CreateRestriction;
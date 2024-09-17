import paths from "@/paths";
import Link from "next/link";
import { Chip } from "@nextui-org/react";

import db from '@/db';
import {Topic} from "@prisma/client";

const TopicsList = async () => {
    const topics = await db.topic.findMany();

    return (
        <div className="flex flex-row flex-wrap gap-2">
            {
                topics.map(({ slug, id }: Topic) => (
                    <div key={id}>
                        <Link href={paths.topicShow(slug)}>
                            <Chip color="warning" variant="shadow">
                                {slug}
                            </Chip>
                        </Link>
                    </div>
                ))
            }
        </div>
    )
};

export default TopicsList;
import {redirect} from "next/navigation";

import PostList from "@/components/posts/post-list";
import { queryPostsBySearchTerm } from "@/db/queries/posts";

type SearchPageProps = {
    searchParams: {
        term: string;
    }
};

const SearchPage = async ({ searchParams }: SearchPageProps) => {
    const { term } = searchParams;

    if (!term) {
        redirect('/');
    }

    return (
        <PostList fetchData={() => queryPostsBySearchTerm(term)} />
    );
};

export default SearchPage;
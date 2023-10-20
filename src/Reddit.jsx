import React from 'react';
import useFetch from "./useFetch";
import {useQuery} from "react-query";

function Reddit() {
    // const { data: posts, isLoading, errorMessage } = useFetch('https://www.reddit.com/r/aww.json');

    const {
        data: posts,
        isLoading,
        isError,
        error,
        isSuccess,
    } = useQuery('posts', fetchPosts, {
        retry: false,
    });

    function fetchPosts() {
        return fetch('https://www.reddit.com/r/aww.jsonx').then(response =>
            response.json()
        );
    }

    return (
        <div>
            <h2>Reddit API</h2>
            {isLoading && <div>Loading...</div>}
            {isSuccess && (
                <ul>
                    {posts.data.children.map(post => (
                        <li key={post.data.id}>
                            <a href={`https://reddit.com${post.data.permalink}`}>
                                {post.data.title}
                            </a>
                        </li>
                    ))}
                </ul>
            )}
            {isError && <div>{error.message}</div>}
        </div>
    );
}

export default Reddit;
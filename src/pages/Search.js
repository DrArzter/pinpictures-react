import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


import LoadingIndicator from "../components/LoadingIndicator";

import PostList from "../components/PostList";
import NoPostsFound from "../components/NoPostsFound";

import UserList from "../components/UserList";
import NoUsersFound from "../components/NoUsersFound";

import * as api from "../api";

export default function Search() {
    const { searchTerm } = useParams();
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const postsContainerClassName = "w-full p-[14px] animate-slide-up";

    useEffect(() => {
        const fetchData = async () => {
            const { posts, users } = await api.search(searchTerm);
            setUsers(users);
            setPosts(posts);
            setLoading(false);
        };

        fetchData();
    }, [searchTerm]);

    if (loading) {
        return <LoadingIndicator />;
    }

    return (
        <div>
            
            <div id="users" className={postsContainerClassName}>
                {users.length > 0 ? (
                    <UserList users={users} />
                ) : (
                    <NoUsersFound />
                )}
            </div>

            <div id="posts" className={postsContainerClassName}>
                {posts.length > 0 ? (
                    <PostList posts={posts} />
                ) : (
                    <NoPostsFound />
                )}
            </div>

        </div>
    );
}

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


import LoadingIndicator from "../components/LoadingIndicator";
import PostList from "../components/PostList";
import NoPostsFound from "../components/NoPostsFound";

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
            <h2>Search Results</h2>
            <div>
                <h3>Users:</h3>
                {users.length ? users.map(user => (
                    <div key={user.id}>
                        <p>{user.name}</p>
                        <img src={user.picpath} alt="User profile" />
                    </div>
                )) : <p>No users found.</p>}
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

import React, { useEffect } from "react";
import * as utils from "../utils";

export default function Posts({ posts, setPosts }) {

    useEffect(() => {
        utils.getPosts().then((data) => {
            setPosts(data);
            console.log(data);
        });
    }, [setPosts]);

    function stopPropagation(event) {
        event.stopPropagation();
    }

    return (
        <div className="flex flex-col items-center mx-auto p-4">
            <div className="w-full lg:w-3/4 bg-zinc-800 p-6 rounded-lg">
                <div>
                    <h1 className="text-2xl font-bold mb-4">Main Page</h1>
                </div>
                <p className="mt-4">Welcome to the main page. Here you can find all posts.</p>
                <p>Search by name or type:</p>
                <div className="mb-4"></div>
            </div>
            <div id="posts" className="w-full lg:w-3/4 bg-zinc-800 p-6 rounded-lg mt-4 flex flex-col justify-between">
                <h1 className="text-2xl font-bold mb-4">Posts</h1>
                {posts && posts.map((post) => (
                    <div key={post.id} className="mb-4">
                        <div className="bg-zinc-700 p-6 rounded-lg relative" onClick={(event) => stopPropagation(event)}>
                            <div className="">
                                {post.picpath && <img src={`http://localhost:3000/${post.picpath}`} alt="Post Image" className="mb-4 hover:transform hover:scale-110 transition duration-500 rounded-2xl" style={{ minWidth: '100%', minHeight: '100%' }} />}
                                <div className='flex flex-row'>
                                    <div className='flex flex-col w-1/3'>
                                        <h2 className="text-xl font-bold mb-2">{post.name}</h2>
                                        <p className="">{post.description}</p>
                                        <p className="">Cost: {post.cost}</p>
                                        <utils.StarRating rating={post.rating} postId={post.id} setPosts={setPosts} />
                                        <p className="">Posted by: <span className="cursor-pointer">{post.author}</span></p>
                                    </div>
                                    <div className="ml-4 w-full">
                                        Place for comments. Post ID: {post.id}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
import React, { useEffect, useState } from "react";
import * as utils from "../utils";

export default function Posts({ posts, setPosts }) {

    const [commentValues, setCommentValues] = useState({});

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
                                {post.picpath && <img src={`http://localhost:3000/${post.picpath}`} alt="Post Image" className="mb-4 hover:transform hover:scale-110 transition duration-500 rounded-2xl" style={{ minWidth: '100%', maxHeight: '50%' }} />}
                                <div className='flex flex-row'>
                                    <div className='flex flex-col w-1/3'>
                                        <h2 className="text-xl font-bold mb-2">{post.name}</h2>
                                        <p className="">{post.description}</p>
                                        <p className="">Cost: {post.cost}</p>
                                        <utils.StarRating rating={post.rating} postId={post.id} setPosts={setPosts} />
                                        <p className="">Posted by: <span className="cursor-pointer">{post.author}</span></p>
                                    </div>
                                    <div className="ml-4 w-full max-h-60 overflow-y-auto">
                                        {post.comments && JSON.parse(post.comments).map(comment => (
                                            <div key={comment.id} className="rounded-lg">
                                                <p className="">{comment.content}</p>
                                                <p className="">By: <span className="cursor-pointer">{comment.author}</span></p>
                                            </div>
                                        ))}
                                        <br />
                                        <div className="flex flex-row items-center rounded-lg border border-gray-700" key={post.id}>
                                            <input
                                                className="shadow appearance-none w-10/12 border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                                                type="text"
                                                value={commentValues[post.id] || ''}
                                                onChange={(e) => setCommentValues({ ...commentValues, [post.id]: e.target.value })}
                                                placeholder="Add a comment"
                                            />
                                            <svg
                                                className="w-7 cursor-pointer ml-2 rounded-lg transition duration-500"
                                                onClick={() => utils.uploadComment(post.id, commentValues[post.id], setCommentValues)}
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="M21 7.74L17.26 4H6.74L3 7.74V17.24L6.74 21H17.26L21 17.24V7.74ZM17.15 9.84L15.15 11.84L12 8.69L8.84 11.84L6.84 9.84L9.99 6.69L12 4.68L13.99 6.69L17.15 9.84ZM18.54 10.95L17.46 12.04L15.96 10.54L17.05 9.46L18.54 10.95ZM5.46 16.55L6.54 15.46L8.04 16.96L6.95 18.05L5.46 16.55ZM6 12L6.84 11.16L15.84 20.16L15 21L6 12Z" fill="#2196F3" />
                                            </svg>
                                        </div>
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
import React, { useEffect, useState } from "react";

import PostList from "../components/PostList";
import LoadingIndicator from "../components/LoadingIndicator";
import NoPostsFound from "../components/NoPostsFound";

import * as postUtils from "../utils/postUtils";

export default function Posts({ posts, setPosts }) {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMorePosts, setHasMorePosts] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      if (hasMorePosts) {
        setLoading(page === 1);
        setLoadingMore(page > 1);

        try {
          const newPosts = await postUtils.fetchPosts(page);
          if (newPosts.length === 0) {
            setHasMorePosts(false);
          } else {
            setPosts((prevPosts) =>
              page === 1 ? newPosts : [...prevPosts, ...newPosts]
            );
          }
        } catch (error) {
          console.error("Error fetching posts:", error);
        } finally {
          setLoading(false);
          setLoadingMore(false);
        }
      }
    };

    fetchPosts();
  }, [page, hasMorePosts, setPosts]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.scrollY + window.innerHeight >= document.body.scrollHeight - 100 &&
        !loadingMore &&
        hasMorePosts
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadingMore, hasMorePosts]);

  const handleLoadMore = () => {
    setHasMorePosts(true);
  };

  const postsContainerClassName = "w-full p-[14px] animate-slide-up";

  const loadMoreButtonClassName = `flex justify-center items-center mt-16 text-center cursor-pointer`;

  return (
    <div className={'px-4'}>
      {loading && page === 1 ? (
        <LoadingIndicator />
      ) : (
        <div id="posts" className={postsContainerClassName}>
          {posts.length > 0 ? (
            <PostList posts={posts} />
          ) : (
            <NoPostsFound />
          )}
          {loadingMore && hasMorePosts && <LoadingIndicator />}
          {!hasMorePosts && (
            <div className={loadMoreButtonClassName} onClick={handleLoadMore}>
              <p className="text-lg font-semibold text-yellow-400">
                That's all for now, but you can try again later :)
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
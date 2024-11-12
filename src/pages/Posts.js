import React, { useEffect, useState, useCallback } from "react";
import PostList from "../components/PostList";
import LoadingIndicator from "../components/LoadingIndicator";
import NoPostsFound from "../components/NoPostsFound";
import * as postUtils from "../utils/postUtils";

const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

const LoadMoreButton = ({ onClick }) => (
  <div
    className="flex justify-center items-center mt-16 text-center cursor-pointer"
    onClick={onClick}
  >
    <p className="text-lg font-semibold text-yellow-400">
      That's all for now, but you can try again later :)
    </p>
  </div>
);

export default function Posts({ posts, setPosts }) {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      if (hasMorePosts) {
        setLoading(true);
        setError(null);

        try {
          const newPosts = await postUtils.fetchPosts(page);
          if (newPosts.length === 0) {
            setHasMorePosts(false);
          } else {
            setPosts((prevPosts) =>
              page === 1 ? newPosts : [...prevPosts, ...newPosts]
            );
          }
        } catch (err) {
          console.error("Error fetching posts:", err);
          setError("Failed to load posts, please try again later.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPosts();
  }, [page, hasMorePosts, setPosts]);

  const handleScroll = useCallback(
    debounce(() => {
      if (
        window.scrollY + window.innerHeight >=
          document.body.scrollHeight - 100 &&
        !loading &&
        hasMorePosts
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    }, 200),
    [loading, hasMorePosts]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleLoadMore = () => {
    setHasMorePosts(true);
  };

  const postsContainerClassName = "w-full p-[14px] animate-slide-up";

  return (
    <>
      {loading && page === 1 ? (
        <LoadingIndicator />
      ) : (
        <div id="posts" className={postsContainerClassName}>
          {error && <div className="text-red-500">{error}</div>}
          {posts.length > 0 ? (
            <PostList posts={posts} />
          ) : (
            <NoPostsFound />
          )}
          {loading && hasMorePosts && <LoadingIndicator />}
          {!hasMorePosts && <LoadMoreButton onClick={handleLoadMore} />}
        </div>
      )}
    </>
  );
}

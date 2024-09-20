import React, { useEffect, useState, useContext } from "react";
import PostList from "../components/PostList";
import LoadingIndicator from "../components/LoadingIndicator";
import NoPostsFound from "../components/NoPostsFound";
import * as postUtils from "../utils/postUtils";
import ThemeContext from "../components/ThemeContext";

export default function Posts({
  user,
  setUser,
  createPostModal,
  setCreatePostModal,
  notifications,
  setNotifications,
  posts,
  setPosts,
}) {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMorePosts, setHasMorePosts] = useState(true);

  const { isDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    const fetchPosts = async () => {
      if (hasMorePosts) {
        setLoading(page === 1);
        setLoadingMore(page > 1);
        const newPosts = await postUtils.fetchPosts(page);
        if (newPosts.length === 0) {
          setHasMorePosts(false);
        } else {
          setPosts((prevPosts) =>
            page === 1 ? newPosts : [...prevPosts, ...newPosts]
          );
        }
      }
      setLoading(false);
      setLoadingMore(false);
    };
    fetchPosts();
  }, [page, hasMorePosts]);

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

  return (
    <div
      className={`p-4 ${
        isDarkMode ? "bg-darkModeBackground text-darkModeText" : ""
      }`}
    >
      {loading && page === 1 ? (
        <LoadingIndicator isDarkMode={isDarkMode} />
      ) : (
        <div
          id="posts"
          className={`w-full p-[14px] animate-slide-up ${
            isDarkMode ? "bg-darkModeBackground text-darkModeText" : ""
          }`}
        >
          {posts.length > 0 ? (
            <PostList
              posts={posts}
              setPosts={setPosts}
              user={user}
              isDarkMode={isDarkMode}
            />
          ) : (
            <NoPostsFound isDarkMode={isDarkMode} />
          )}
          {loadingMore && hasMorePosts && <LoadingIndicator isDarkMode={isDarkMode} />}
          {!hasMorePosts && (
            <div
              className="flex justify-center items-center mt-16 text-center cursor-pointer"
              onClick={handleLoadMore}
            >
              <p className="text-lg font-semibold text-yellow-400">That's all for now, but you can try again later :)</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
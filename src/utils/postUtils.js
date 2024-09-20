import * as api from "../api";

export const fetchPosts = async (page) => {
  try {
    const fetchedPosts = await api.getPosts(page);
    return fetchedPosts.map((post) => ({
      ...post,
      comments: post.comments || [],
    }));
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};
import config from "./config";

import axios from "axios";

export default async function searchPost(posts, setFilteredPosts, searchTerm) {
  if (!searchTerm) {
    setFilteredPosts(posts);
    return;
  }

  const lowerCaseSearchTerm = searchTerm.toLowerCase();

  try {
    const response = await axios.get(
      `${config.apiUrl}/search/${encodeURIComponent(searchTerm)}`
    );
    setFilteredPosts(response.data);
  } catch (error) {
    console.error("Error fetching posts:", error);
    const filteredPosts = posts.filter(
      ({ title, description }) =>
        title.toLowerCase().includes(lowerCaseSearchTerm) ||
        description.toLowerCase().includes(lowerCaseSearchTerm)
    );
    setFilteredPosts(filteredPosts);
  }
}
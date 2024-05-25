export default function searchPost(posts, setFilteredPosts, searchTerm) {
  if (!searchTerm) {
    setFilteredPosts(posts);
    return;
  }

  const lowerCaseSearchTerm = searchTerm.toLowerCase();

  const filteredPosts = posts.filter(
    ({ name, description }) =>
      name.toLowerCase().includes(lowerCaseSearchTerm) ||
      description.toLowerCase().includes(lowerCaseSearchTerm)
  );

  setFilteredPosts(filteredPosts);
}

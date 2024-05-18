export default function searchPost(posts, setFilteredPosts, searchTerm) {
  if (!searchTerm) {
    setFilteredPosts(posts);
    return;
  }
  const filtered = posts.filter(
    (post) =>
      post.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  setFilteredPosts(filtered);
}
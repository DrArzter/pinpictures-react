export default async function sortPosts(sortBy, posts, setPosts) {
  let sortedPosts = [...posts];
  if (sortBy === "id") {
    sortedPosts.sort((a, b) => a.id - b.id);
  } else if (sortBy === "name") {
    sortedPosts.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "rating") {
    sortedPosts.sort((a, b) => b.rating - a.rating);
  } else {
    sortedPosts.sort((a, b) => b.id - a.id);
  }
  setPosts(sortedPosts);
}

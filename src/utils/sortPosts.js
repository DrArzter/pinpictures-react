const SORT_BY_ID = "id";
const SORT_BY_NAME = "name";
const SORT_BY_RATING = "rating";
const SORT_BY_DEFAULT = "default";

export default async function sortPosts(sortBy, posts, setPosts) {
  let sortedPosts = [...posts];

  switch (sortBy) {
    case SORT_BY_ID:
      sortedPosts.sort((a, b) => a.id - b.id);
      break;
    case SORT_BY_NAME:
      sortedPosts.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case SORT_BY_RATING:
      sortedPosts.sort((a, b) => b.rating - a.rating);
      break;
    default:
      sortedPosts.sort((a, b) => b.id - a.id);
      break;
  }

  setPosts(sortedPosts);
}

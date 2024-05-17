export default function sortPosts(sortBy, posts) {
    let sortedPosts = [...posts];
    if (sortBy === "date") {
        sortedPosts.sort((a, b) => a.id - b.id);
    } else if (sortBy === "likes") {
        sortedPosts.sort((a, b) => b.likes - a.likes);
    } else if (sortBy === "rating") {
        sortedPosts.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "comments") {
        sortedPosts.sort((a, b) => b.comments.length - a.comments.length);
    } else if (sortBy === "name") {
        sortedPosts.sort((a, b) => a.name.localeCompare(b.name));
    }
    return sortedPosts;
}
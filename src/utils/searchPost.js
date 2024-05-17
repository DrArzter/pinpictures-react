export default function searchPost(searchTerm, posts) {
    const filteredPosts = posts.filter((post) => {
        const postName = post.name.toLowerCase();
        const postDescription = post.description.toLowerCase();
        const searchTermLower = searchTerm.toLowerCase();
        return postName.includes(searchTermLower) || postDescription.includes(searchTermLower);
    });
    return filteredPosts;
}
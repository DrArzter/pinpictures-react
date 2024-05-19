export default async function sortChats(sortBy, chats, setChats) {
  let sortedChats = [...chats];
  if (sortBy === "id") {
    sortedChats.sort((a, b) => a.id - b.id);
  } else if (sortBy === "name") {
    sortedChats.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "rating") {
    sortedChats.sort((a, b) => b.rating - a.rating);
  } else {
    sortedChats.sort((a, b) => b.id - a.id);
  }
  setChats(sortedChats);
}

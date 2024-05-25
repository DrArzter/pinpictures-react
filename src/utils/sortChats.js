const SORT_BY_ID = "id";
const SORT_BY_NAME = "name";
const SORT_BY_RATING = "rating";
const SORT_BY_DEFAULT = "default";

export default async function sortChats(sortBy, chats, setChats) {
  let sortedChats = [...chats];

  switch (sortBy) {
    case SORT_BY_ID:
      sortedChats.sort((a, b) => a.id - b.id);
      break;
    case SORT_BY_NAME:
      sortedChats.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case SORT_BY_RATING:
      sortedChats.sort((a, b) => b.rating - a.rating);
      break;
    default:
      sortedChats.sort((a, b) => b.id - a.id);
      break;
  }

  setChats(sortedChats);
}

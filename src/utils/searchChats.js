export default function searchChats(chats, searchTerm) {
  if (!searchTerm) return chats;

  return chats.filter((chat) =>
    chat.users.some((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
}

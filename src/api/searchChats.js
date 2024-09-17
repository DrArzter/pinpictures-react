export default function searchChats(chats, searchTerm) {
  if (!searchTerm) return chats;

  const lowerCaseSearchTerm = searchTerm.toLowerCase();

  return chats.filter(({ users }) =>
    users.some(({ name }) =>
      name.toLowerCase().includes(lowerCaseSearchTerm)
    )
  );
}

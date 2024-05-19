export default function searchChats(chats, setFilteredChatList, searchTerm) {
    const filteredChats = chats.filter(chat =>
      chat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredChatList(filteredChats);
  }
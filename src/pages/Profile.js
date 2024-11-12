import React, { useEffect, useState, useContext, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import FullScreenImage from "../components/modals/FullScreenImageModal";
import UpdateImageModal from "../components/modals/UpdateImageModal";
import LoadingIndicator from "../components/LoadingIndicator";
import { ThemeProvider } from "../components/ThemeContext";
import { AiOutlineUserAdd, AiOutlineMessage, AiOutlineUserDelete } from "react-icons/ai";
import config from "../api/config";
import * as api from "../api";
import UserList from "../components/UserList";

export default function Profile({ user, setUser, socket, socketEvent, socketState }) { // Добавлено socket как пропс
  const [profile, setProfile] = useState(null);
  const [friends, setFriends] = useState([]);
  const { username } = useParams();
  const navigate = useNavigate();
  const [showFullScreen, setShowFullScreen] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const isDarkMode = useContext(ThemeProvider);

  useEffect(() => {
    if (!username) return;
    
    const loadProfileData = async () => {
      setLoading(true);
      try {
        const [userData, friendsData] = await Promise.all([
          api.getUserByName(username),
          api.getFriends(username)
        ]);
        setProfile(userData);
        setFriends(friendsData);
      } catch (error) {
        console.error("Error fetching profile or friends:", error);
      }
      setLoading(false);
    };

    loadProfileData();
  }, [username]);

  const handleProfilePicClick = () => setShowFullScreen(true);

  const handleAddFriendClick = () => {
    if (!profile || !user) return;
    api.addFriend(profile.id).then(() => {});
  };

  const handleConfirmFriendClick = () => {
    if (!profile || !user) return;
    api.confirmFriend(profile.id).then(() => {});
  };

  const handleDeleteFriendClick = () => {
    if (!profile || !user) return;
    api.removeFriend(profile.id).then(() => {});
  };

  const handleSendMessage = async () => {
    if (!socket || !profile) return;
  
    socket.send(JSON.stringify({
      type: 'createChat',
      recipientId: profile.id
    }));
  };

  useEffect(() => {
    if (!socketEvent) return;
    if (socketEvent.type === 'chatExists' || socketEvent.type === 'chatCreated') {
      console.log(socketEvent);
      navigate('/chats/' + socketEvent.id);
    }
  }, [socketEvent]);

  const profilePicSrc = useMemo(() => {
    if (!profile) return "";
    return profile.picpath.startsWith("https://ui-avatars.com/")
      ? profile.picpath
      : config.apiUrl.replace("/api", "/") + profile.picpath;
  }, [profile]);

  const profileBackground = useMemo(() => {
    if (!profile) return "";
    return profile.bgpicpath.startsWith("https://ui-avatars.com/")
      ? profile.bgpicpath
      : config.apiUrl.replace("/api", "/") + profile.bgpicpath;
  }, [profile]);

  const profileHeaderClassName = `relative w-full h-[40vh] flex flex-col items-center mb-16`;
  const profileBackgroundClassName = `w-full h-full object-cover rounded-b-3xl`;
  const profileInfoClassName = `flex w-5/6 mt-[-5rem] items-center justify-between`;
  const profilePicClassName = `w-40 h-40 rounded-full border-4 border-white cursor-pointer`;
  const profileUsernameClassName = `text-3xl font-bold mt-32`;
  const actionsContainerClassName = `flex gap-4 mt-32 hidden md:flex`;
  const friendListContainerClassName = `flex justify-center rounded-xl ${isDarkMode ? "bg-zinc-800" : ""}`;
  const iconClassName = `text-3xl cursor-pointer`;

  const isFriend = friends.some(friend => friend.name === user.name && friend.status === "confirmed");
  const isPending = friends.some(friend => friend.name === user.name && friend.status === "pending");

  if (loading) {
    return <LoadingIndicator />;
  }

  if (!profile) {
    return (
      <div className="flex justify-center items-center w-full h-64">
        <p>Profile not found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mx-auto">
      <div className={profileHeaderClassName}>
        <img
          id="profileBackground"
          className={profileBackgroundClassName}
          src={profileBackground}
          alt="Profile Background"
        />
        <div className={profileInfoClassName}>
          <div className="flex items-center">
            <img
              id="profilePic"
              className={profilePicClassName}
              src={profilePicSrc}
              onClick={handleProfilePicClick}
              alt="Profile Pic"
            />
            <p className={profileUsernameClassName} id="profileUsername">
              {profile.name}
            </p>
          </div>
          {user && profile.name !== user.name && (
            <div className={actionsContainerClassName}>
              <AiOutlineMessage className={iconClassName} onClick={() => handleSendMessage()} />
              {isFriend ? (
                <AiOutlineUserDelete className={iconClassName} onClick={handleDeleteFriendClick} />
              ) : (
                <AiOutlineUserAdd
                  className={iconClassName}
                  onClick={isPending ? handleConfirmFriendClick : handleAddFriendClick}
                />
              )}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center w-5/6">
        <div className="flex flex-row w-full max-h-[15vh] justify-end">
          <div className="flex flex-col border-2 border-dotted border-opacity-10 p-4 w-[20vw] rounded-xl">
            <Link to={`/profile/${user.name}/friends`}>
              <p className="px-6 pt-2 w-full border-b-2 border-dotted border-opacity-10 border-zinc-500">Friends</p>
            </Link>
            <div className={`${friendListContainerClassName} overflow-y-scroll cuteScrollBar2`}>
              <UserList users={friends.filter(friend => friend.status === "confirmed")} />
            </div>
          </div>
        </div>
      </div>
      {showFullScreen && <FullScreenImage imageUrl={profilePicSrc} onClose={() => setShowFullScreen(false)} />}
      {showUpdateModal && (
        <UpdateImageModal
          onClose={() => setShowUpdateModal(false)}
          user={user}
          setUser={setUser}
          profile={profile}
          setProfile={setProfile}
        />
      )}
    </div>
  );
}

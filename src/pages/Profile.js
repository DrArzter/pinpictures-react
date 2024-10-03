import React, { useEffect, useState, useContext, useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

import FullScreenImage from "../components/modals/FullScreenImageModal";
import UpdateImageModal from "../components/modals/UpdateImageModal";
import LoadingIndicator from "../components/LoadingIndicator";
import { ThemeProvider } from "../components/ThemeContext";

import { AiOutlineUserAdd, AiOutlineSetting, AiOutlineMessage, AiOutlineUserDelete } from "react-icons/ai";

import config from "../api/config";
import * as api from "../api";
import UserList from "../components/UserList";

function Profile({ user, setUser }) {
  const [profile, setProfile] = useState(null);
  const [friends, setFriends] = useState([]);
  const { username } = useParams();
  const navigate = useNavigate();
  const [showFullScreen, setShowFullScreen] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const isDarkMode = useContext(ThemeProvider);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await api.getUserByName(username);
        setProfile(userData);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    const fetchFriends = async () => {
      try {
        const friendsData = await api.getFriends(username);
        setFriends(friendsData);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };

    const loadProfileData = async () => {
      setLoading(true);
      await Promise.all([fetchUser(), fetchFriends()]);
      setLoading(false);
    };

    if (username) {
      loadProfileData();
    }
  }, [username]);


  const handleProfilePicClick = () => {
    setShowFullScreen(true);
  };

  const handleAddFriendClick = () => {
    if (!profile || !user) return;
    api.addFriend(profile.id).then(() => {
    });
  };

  const handleConfirmFriendClick = () => {
    if (!profile || !user) return;
    api.confirmFriend(profile.id).then(() => {
    });
  };

  const handleDeleteFriendClick = () => {
    if (!profile || !user) return;
    api.removeFriend(profile.id).then(() => {
    });
  };

  const redirectToChat = (id) => {
    navigate(`/chat/${id}`);
  };

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

  const profileInfoClassName = `flex w-3/4 mt-[-5rem] items-center justify-between`;

  const profilePicClassName = `w-40 h-40 rounded-full border-4 border-white cursor-pointer`;

  const profileUsernameClassName = `text-3xl font-bold mt-32`;

  const actionsContainerClassName = `flex gap-4 mt-32 hidden md:flex`;

  const friendListContainerClassName = `lg:w-3/4 flex justify-center rounded-full gap-4 mt-20 ${isDarkMode ? "bg-zinc-800" : "bg-zinc-700"}`;

  const iconClassName = `text-3xl cursor-pointer`;


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
              <AiOutlineMessage className={iconClassName} onClick={() => redirectToChat(profile.id)} />
            {friends.some(friend => friend.name === user.name && friend.status === "confirmed") ? (
              <AiOutlineUserDelete
                className={iconClassName}
                onClick={handleDeleteFriendClick}
              />
            ) : (
              <AiOutlineUserAdd
                className={iconClassName}
                onClick={friends.some(friend => friend.name === user.name && friend.status === "pending") ? handleConfirmFriendClick : handleAddFriendClick}
              />
            )}
            </div>
          )}
        </div>
      </div>

      <div className={friendListContainerClassName}>
        <UserList users={friends.filter(friend => friend.status === "confirmed")} />
      </div>

      {showFullScreen && (
        <FullScreenImage imageUrl={profilePicSrc} onClose={() => setShowFullScreen(false)} />
      )}

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

export default Profile;
import React, { useEffect, useState, useRef, useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

import FullScreenImage from "../components/modals/FullScreenImageModal";
import UpdateImageModal from "../components/modals/UpdateImageModal";

import { AiOutlineUserAdd, AiOutlineSetting, AiOutlineMessage } from "react-icons/ai";
import { FaSpinner } from "react-icons/fa";

import config from "../api/config";
import * as api from "../api";

function Profile({ user, setUser }) {
  const [profile, setProfile] = useState(null);
  const { username } = useParams();
  const navigate = useNavigate();
  const [showFullScreen, setShowFullScreen] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await api.getUserByName(username);
        setProfile(userData);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchUser();
    }
  }, [username]);

  const handleProfilePicClick = () => {
    setShowFullScreen(true);
  };

  const handleAddFriendClick = () => {
    if (!profile || !user) return;
    api.addFriend(profile.id).then(() => {
      setUser({ ...user, friends: [...user.friends, profile] });
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

  const friendListContainerClassName = `lg:w-3/4 flex justify-center items-center bg-zinc-800 rounded-full gap-4 mt-20`;

  const iconClassName = `text-3xl cursor-pointer`;


  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-64">
        <FaSpinner className="text-yellow-500 text-4xl animate-spin" />
      </div>
    );
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
              <AiOutlineUserAdd className={iconClassName} onClick={handleAddFriendClick} />
            </div>
          )}
        </div>
      </div>

      <div className={friendListContainerClassName}>FRIEND LIST COMING SOON</div>

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
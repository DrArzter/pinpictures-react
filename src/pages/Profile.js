import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";

import FullScreenImage from "../components/modals/FullScreenImageModal";
import UpdateImageModal from "../components/modals/UpdateImageModal";

import { AiOutlineUserAdd, AiOutlineSetting, AiOutlineMessage } from "react-icons/ai";
import { FaSpinner } from "react-icons/fa";

import config from "../api/config";
import * as api from "../api";
import * as utils from "../utils";

function Profile({ user, setUser }) {
  const [profile, setProfile] = useState(null);
  const { username } = useParams();
  const navigate = useNavigate();
  const [showFullScreen, setShowFullScreen] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const redirectToChat = (id) => {
    navigate(`/chat/${id}`);
  };

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
    setIsDropdownOpen((prev) => !prev);
  };

  const handleAddFriendClick = () => {
    if (!profile) return;
    api.addFriend(profile.id).then(() => {
      setUser({ ...user, friends: [...user.friends, profile] });
    });
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

  if (!profile) {
    return (
      <div className="flex justify-center items-center w-full h-64">
        <FaSpinner className="text-yellow-500 text-4xl animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mx-auto">
      <div className="relative w-full h-[40vh] flex flex-col items-center mb-16">
        <img
          id="profileBackground"
          className="w-full h-full object-cover rounded-b-3xl"
          src={profileBackground}
          alt="Profile Background"
        />
        <div className="flex w-3/4 mt-[-5rem] items-center justify-between">
          <div className="flex items-center">
            <img
              id="profilePic"
              className="w-40 h-40 rounded-full border-4 border-white cursor-pointer"
              src={profilePicSrc}
              onClick={handleProfilePicClick}
              alt="Profile Pic"
            />
            <p className="text-3xl font-bold mt-32" id="profileUsername">
              {profile.name}
            </p>
          </div>
          {profile.name !== user.name && (
            <div className="flex gap-4 mt-32 hidden md:flex">
              <AiOutlineMessage
                className="text-3xl cursor-pointer"
                onClick={() => redirectToChat(profile.id)}
              />
              <AiOutlineUserAdd
                className="text-3xl cursor-pointer"
                onClick={() => handleAddFriendClick(profile.id)}
              />
            </div>
          )}
        </div>
      </div>

      <div className="lg:w-3/4 flex justify-center items-center bg-zinc-800 rounded-full gap-4 mt-20">
        FRIEND LIST COMING SOON
      </div>

      {showFullScreen && (
        <FullScreenImage
          imageUrl={profilePicSrc}
          onClose={() => setShowFullScreen(false)}
        />
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

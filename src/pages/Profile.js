import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import * as utils from "../utils";
import config from '../utils/config';
import FullScreenImage from "../components/FullScreenImage";
import UpdateImageModal from "../components/UpdateImageModal";
import { FaSpinner } from 'react-icons/fa';
import { motion } from 'framer-motion';

function Profile({ user, setUser }) {
  const [profile, setProfile] = useState(null);
  const { username } = useParams();
  const navigate = useNavigate();
  const [showFullScreen, setShowFullScreen] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const redirectToChat = useCallback((id) => {
    navigate(`/chat/${id}`);
  }, [navigate]);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await utils.getUserByName(username);
      setProfile(userData);
    };
    if (username) {
      fetchUser();
    }
  }, [username]);

  const handleChatCreate = useCallback(() => {
    if (profile && profile.id) {
      utils.createChat(profile.id)
        .then((data) => {
          if (data) {
            redirectToChat(data.chatId);
          }
        })
        .catch((error) => {
          console.error('Error creating chat:', error);
        });
    }
  }, [profile, redirectToChat]);

  const handleProfilePicClick = useCallback(() => {
    setShowFullScreen(true);
    toggleDropdown();
  }, []);

  const handleUpdateImageClick = useCallback(() => {
    setShowUpdateModal(true);
    toggleDropdown();
  }, []);

  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen(prev => !prev);
  }, []);

  const handleClickOutside = useCallback((event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen, handleClickOutside]);

  const profilePicSrc = useMemo(() => {
    if (!profile) return '';
    return profile.picpath.startsWith("https://ui-avatars.com/")
      ? profile.picpath
      : config.apiUrl.replace('/api', '/') + profile.picpath;
  }, [profile]);

  if (!profile) {
    return (
      <div className="flex justify-center items-center w-full h-64">
        <FaSpinner className="text-yellow-500 text-4xl animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mx-auto p-4">
      <div className="w-full lg:w-3/4 bg-zinc-800 p-6 rounded-lg shadow-lg">
        <div className="flex flex-row justify-between items-center mb-4">
          {user && profile && user.name === profile.name ? (
            <>
              <Link
                className="hover:underline bg-zinc-700 rounded p-2 hover:bg-zinc-600"
                to="/settings"
                title="Edit your profile"
              >
                Edit
              </Link>
              <button
                className="bg-zinc-700 rounded p-2 hover:bg-zinc-600 hover:underline"
                onClick={() => utils.logout(setUser)}
                title="Logout"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              className="bg-zinc-700 rounded p-2 hover:bg-zinc-600 hover:underline"
              onClick={handleChatCreate}
              title="Send a message"
            >
              Message
            </button>
          )}
        </div>
        <div className="relative flex flex-col items-center text-center">
          {profile && (
            <>
              <div
                className="relative"
                onMouseEnter={toggleDropdown}
                onMouseLeave={toggleDropdown}
              >
                <img
                  src={profilePicSrc}
                  alt="Profile Picture"
                  className="w-32 h-32 rounded-full mb-4 cursor-pointer"
                  style={{ objectFit: "cover" }}
                  onClick={handleProfilePicClick}
                />
                {isDropdownOpen && profile && user.name === profile.name && (
                  <motion.div
                    ref={dropdownRef}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute top-0 left-0 mt-36 text-sm text-bold w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-[999]"
                  >
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      <button
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                        onClick={handleUpdateImageClick}
                      >
                        Update Image
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
              <p className="text-xl font-bold mb-2">{profile.name}</p>
              {profile.bio && (
                <p className="text-md text-gray-300 mb-4">{profile.bio}</p>
              )}
            </>
          )}
        </div>
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

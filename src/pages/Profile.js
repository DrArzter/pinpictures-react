import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import * as utils from "../utils";
import config from '../utils/config';

function Profile({ user, setUser }) {
  const [profile, setProfile] = useState(null);
  const { username } = useParams();
  const navigate = useNavigate();

  const redirectToChat = (id) => {
    navigate(`/chat/${id}`);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await utils.getUserByName(username);
      setProfile(userData);
    };

    if (username) {
      fetchUser();
    }
  }, [username]);

  const handleChatCreate = () => {
    utils.createChat(profile.id)
      .then((data) => {
        if (data) {
          redirectToChat(data.chatId);
        }
      })
      .catch((error) => {
        console.error('Error creating chat:', error);
      });
  };

  if (!profile) {
    return (
      <div className="text-center text-3xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        Loading...
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
              >
                Edit
              </Link>
              <button
                className="bg-zinc-700 rounded p-2 hover:bg-zinc-600 hover:underline"
                onClick={() => utils.logout(setUser)}
              >
                Logout
              </button>
            </>
          ) : (
            <button
              className="bg-zinc-700 rounded p-2 hover:bg-zinc-600 hover:underline"
              onClick={handleChatCreate}
            >
              Message
            </button>
          )}
        </div>
        <div className="flex flex-col items-center text-center">
          {profile && (
            <>
              <img
                src={
                  profile.picpath.startsWith("https://ui-avatars.com/")
                    ? profile.picpath
                    : config.apiUrl.replace('/api', '/') + profile.picpath
                }
                alt="Profile Picture"
                className="w-32 h-32 rounded-full mb-4"
              />
              <p className="text-xl font-bold mb-2"> {profile.name}</p>
              <p className="text-lg text-gray-400 mb-2"> {profile.email}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;

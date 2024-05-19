import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as utils from "../utils";

function Profile(user, setUser) {
  const [profile, setProfile] = useState();
  const { username } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await utils.getUserByName(username);
      setProfile(userData);
    };

    if (username) {
      fetchUser();
    }
  }, [username]);

  if (!profile) {
    return <div className="text-center text-3xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">Loading...</div>;
  }
  return (
    <div className="flex flex-col items-center mx-auto p-4">
      <div className="flex flex-row justify-between w-full lg:w-3/4 items-center p-6 text-center bg-zinc-800 rounded-lg">
        <h1 className="text-2xl font-bold text-center">Profile</h1>
        <div className="flex flex-row gap-4">
          {user.user && profile && user.user.name === profile.name && <Link className="hover:underline bg-zinc-700 rounded p-2 hover:bg-zinc-600" to="/AccountSettings">Edit</Link> }
        </div>
      </div>
      <div className="w-full lg:w-3/4 p-6 rounded-lg bg-zinc-800 mt-4">
        {profile && (
          <>
            <p className="mb-4">Name: {profile.name}</p>
            <p className="mb-4">Email: {profile.email}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;

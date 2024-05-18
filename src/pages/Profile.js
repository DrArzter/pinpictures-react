import React, { } from "react";
import { Link } from "react-router-dom";

function Profile({ user }) {

  return (
    <div className="flex flex-col items-center mx-auto p-4">
      <div className="flex flex-row justify-between w-full lg:w-3/4 items-center p-6 text-center bg-zinc-800 rounded-lg">
        <h1 className="text-2xl font-bold text-center">Profile</h1>
        <div className="flex flex-row gap-4">
          <button className="hover:underline bg-zinc-700 rounded p-2 hover:bg-zinc-600">Delete</button>
          <Link className="hover:underline bg-zinc-700 rounded p-2 hover:bg-zinc-600" to="/AccountSettings">Edit</Link>
        </div>
      </div>
      <div className="w-full lg:w-3/4 p-6 rounded-lg bg-zinc-800 mt-4">
        {user && (
          <>
            <p className="mb-4">Name: {user.name}</p>
            <p className="mb-4">Email: {user.email}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;

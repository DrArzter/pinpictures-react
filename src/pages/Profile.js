import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function AccountSettings({ user }) {

  return (
    <div className="flex flex-col items-center mx-auto p-4">
      <div className="w-full lg:w-3/4  bg-zinc-800 p-6 rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        {user && (
          <>
            <p className="mb-4">Name: {user.name}</p>
            <p className="mb-4">Email: {user.email}</p>
            <div className="flex flex-row gap-4">
              <button className="bg-zinc-700 text-white px-4 py-2 rounded-md hover:bg-zinc-600" onClick={() => { }}>Delete</button>
              <Link to="/AccountSettings" className="bg-zinc-700 text-white px-4 py-2 rounded-md hover:bg-zinc-600">Edit</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AccountSettings;

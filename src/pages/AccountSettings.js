import React from "react";

const AccountSettings = ({ user }) => {
  return (
    <div className="flex flex-col items-center mx-auto p-4 min-h-screen text-zinc-100">
      <div className="w-full lg:w-3/4 bg-zinc-800 p-6 rounded-lg shadow-lg">
        <div className="flex flex-col items-start space-y-4">
          <div className="w-full bg-zinc-700 p-4 rounded-md">
            <h2 className="text-xl font-semibold mb-2">Profile Information</h2>
            <p className="text-zinc-300">Username: {user.name}</p>
            <p className="text-zinc-300">Email: {user.email}</p>
          </div>
          <div className="w-full bg-zinc-700 p-4 rounded-md">
            <h2 className="text-xl font-semibold mb-2">Security Settings</h2>
            <button className="mt-2 bg-zinc-600 hover:bg-zinc-500 text-white py-2 px-4 rounded">
              Change Password
            </button>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-3/4 p-6 rounded-lg bg-zinc-800 mt-4 shadow-lg">
        <p className="text-zinc-300 text-center">More settings coming soon...</p>
      </div>
    </div>
  );
};

export default AccountSettings;

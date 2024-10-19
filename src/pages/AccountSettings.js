import React from "react";

const AccountSettings = ({ user }) => {
  return (
    <div className="flex flex-col items-center mx-auto p-4 min-h-screen">
      <div className="w-full lg:w-5/6 p-6 rounded-lg shadow-lg">
        <div className="flex flex-col items-start space-y-4">
          <div className="w-full p-4 rounded-md">
            <h2 className="text-xl font-semibold mb-2">Profile Information</h2>
            <p className="">Username: {user.name}</p>
            <p className="">Email: {user.email}</p>
          </div>
          <div className="w-full p-4 rounded-md">
            <h2 className="text-xl font-semibold mb-2">Security Settings</h2>
            <button className="mt-2 py-2 px-4 rounded">
              Change Password
            </button>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-5/6 p-6 rounded-lg mt-4 shadow-lg">
        <p className="text-center">More settings coming soon...</p>
      </div>
    </div>
  );
};

export default AccountSettings;

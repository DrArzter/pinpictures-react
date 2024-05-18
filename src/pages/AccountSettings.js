import React, { useState, useEffect } from "react";

function AccountSettings( {user} ) {  
  
  return (
    <div className="flex flex-col items-center mx-auto p-4">
      <div className="w-full lg:w-3/4  bg-zinc-800 p-6 rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Account Settings</h1> 
      </div>
    </div>
  );
}

export default AccountSettings;

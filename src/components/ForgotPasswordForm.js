
import React from "react";

export default function LoginForm({ 
  username, 
  setUsername, 
  password, 
  setPassword, 
  handleSubmit, 
  toggleRegistration, 
  toggleForgotPassword, 
  isDarkMode 
}) {
  return (
    <div className={`flex flex-col items-center w-full max-w-md gap-6 p-8 sm:p-16 rounded-3xl md:shadow-2xl ${isDarkMode ? "bg-darkModeBackground" : "bg-lightModeBackground"}`}>
      <div className="text-center">
        <h2 className="text-2xl">Reset password</h2>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full">
        <div className="w-full">
          <label className="block text-sm mb-1">Email</label>
          <input
            type="text"
            placeholder="Enter your username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <button type="submit" className={`w-full py-2 rounded-3xl text-darkModeText bg-red-500`}>
          Reset
        </button>
        <button onClick={toggleForgotPassword} className="mt-4 text-lightModeText">
          Back
        </button>
        <button onClick={toggleRegistration} className="mt-2 text-lightModeText">
          Don't have an account? Sign up
        </button>
      </form>
    </div>
  );
}

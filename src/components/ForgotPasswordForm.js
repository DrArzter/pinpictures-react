import React from "react";

export default function LoginForm({
  username,
  setUsername,
  password,
  setPassword,
  handleSubmit,
  toggleRegistration,
  toggleForgotPassword,
}) {
  const containerClassName = `flex flex-col items-center w-full max-w-md gap-6 p-8 sm:p-16 rounded-3xl md:shadow-2xl md:shadow-2xl`;

  const buttonClassName = `w-full py-2 rounded-3xl bg-red-500`;

  return (
    <div className={containerClassName}>
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
        <button type="submit" className={buttonClassName}>
          Reset
        </button>
        <button onClick={toggleForgotPassword} className="mt-4">
          Back
        </button>
        <button onClick={toggleRegistration} className="mt-2">
          Don't have an account? Sign up
        </button>
      </form>
    </div>
  );
}
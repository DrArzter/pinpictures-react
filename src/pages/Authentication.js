import React, { useState } from "react";
import * as utils from "../utils";

export default function Authentication({ setUser }) {
  const [registration, setRegistration] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirect = utils.useRedirectToMainPage();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let userData;
      if (registration) {
        userData = await utils.registration(username, email, password);
        setRegistration(false);
      } else if (forgotPassword) {
        //await utils.forgotPassword(email); //TODO: Add forgot password functionality
        setForgotPassword(false);
      } else {
        userData = await utils.login(username, password);
      }
      if (!forgotPassword) {
        setUser(userData);
        redirect();
      }
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  }

  function toggleRegistration() {
    setRegistration(!registration);
    setForgotPassword(false);
    setUsername("");
    setEmail("");
    setPassword("");
  }

  function toggleForgotPassword() {
    setForgotPassword(!forgotPassword);
    setRegistration(false);
    setUsername("");
    setEmail("");
    setPassword("");
  }

  return (
    <div className="flex flex-col items-center min-h-screen  p-4">
      <div className="flex flex-col w-full lg:w-1/2 xl:w-1/3 items-center bg-zinc-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6">
          {forgotPassword ? "Forgot Password" : registration ? "Sign Up" : "Sign In"}
        </h1>
        <form className="w-full max-w-md" onSubmit={handleSubmit}>
          {!forgotPassword && (
            <div className="mb-6">
              <label className="block text-sm font-bold mb-2" htmlFor="username">
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight text-zinc-700 focus:outline-none focus:shadow-outline bg-white"
                id="username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required={!forgotPassword}
              />
            </div>
          )}
          {(registration || forgotPassword) && (
            <div className="mb-6">
              <label className="block text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight text-zinc-700 focus:outline-none focus:shadow-outline bg-white"
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          )}
          {!forgotPassword && (
            <div className="mb-6">
              <label className="block text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight text-zinc-700 focus:outline-none focus:shadow-outline bg-white"
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          )}
          <div className="flex items-center justify-center mb-6">
            <button
              className="bg-zinc-700 hover:bg-zinc-600 transition duration-300 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {forgotPassword ? "Send Reset Link" : registration ? "Sign Up" : "Sign In"}
            </button>
          </div>
          <div className="text-center mb-4">
            {forgotPassword ? (
              <a
                className="font-bold text-sm hover:text-zinc-400 transition duration-300 cursor-pointer"
                onClick={toggleForgotPassword}
              >
                Back to Sign In
              </a>
            ) : (
              <a
                className="font-bold text-sm hover:text-zinc-400 transition duration-300 cursor-pointer"
                onClick={toggleRegistration}
              >
                {registration
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </a>
            )}
          </div>
          {!registration && !forgotPassword && (
            <div className="text-center mt-4">
              <a
                className="font-bold text-sm hover:text-zinc-400 transition duration-300 cursor-pointer"
                onClick={toggleForgotPassword}
              >
                Forgot Password?
              </a>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

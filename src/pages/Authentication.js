import React, { useState } from "react";
import * as utils from "../utils";

export default function Authentification({ setUser }) {
  const [registration, setRegistration] = useState(false);
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
      } else {
        userData = await utils.login(username, password);
      }
      setUser(userData);
      redirect();
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  }

  function toggleRegistration() {
    setRegistration(!registration);
    setUsername("");
    setEmail("");
    setPassword("");
  }

  return (
    <div className="flex flex-col items-center min-h-screen mx-auto p-4">
      <div className="flex flex-col w-full lg:w-3/4 items-center bg-zinc-800 p-6 rounded-lg">
        <form className="w-full max-w-md" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="shadow shadow-zinc-700 text-zinc-700 appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          {registration && (
            <div className="mb-6">
              <label className="block text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="shadow shadow-zinc-700 text-zinc-700 appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          )}
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow shadow-zinc-700 text-zinc-700 appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-zinc-700 hover:bg-zinc-900 transition duration-300 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          </div>
          <div className="my-4"></div>
          {registration ? (
            <div className="flex items-center justify-between">
              <a
                className="inline-block align-baseline font-bold text-sm hover:text-zinc-200 transition duration-300 cursor-pointer"
                onClick={toggleRegistration}
              >
                Already have an account? Sign In
              </a>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <a
                className="inline-block align-baseline font-bold text-sm hover:text-zinc-200 transition duration-300 cursor-pointer"
                onClick={toggleRegistration}
              >
                Don't have an account? Sign Up
              </a>
            </div>
          )}
          <div className="flex items-center justify-between">
            <a
              className="inline-block align-baseline font-bold text-sm hover:text-zinc-200 transition duration-300"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

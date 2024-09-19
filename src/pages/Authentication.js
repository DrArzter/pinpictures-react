import React, { useState, useContext } from "react";
import  ThemeContext  from "../components/ThemeContext";
import RegistrationForm from "../components/RegistrationForm";

import * as api from "../api";
import * as utils from "../utils";

export default function Authentication({ setUser }) {
  const [registration, setRegistration] = useState(true);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  const { isDarkMode } = useContext(ThemeContext)

  const redirect = utils.useRedirectToMainPage();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let userData;
      if (registration) {
        userData = await api.registration(username, email, password);
        setRegistration(false);
      } else if (forgotPassword) {
        //await utils.forgotPassword(email); //TODO: Add forgot password functionality
        setForgotPassword(false);
      } else {
        userData = await api.login(username, password);
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
    <div className="flex flex-col items-center py-[58px] w-full">
    {
      registration ? (
        <RegistrationForm username={username} setUsername={setUsername} email={email} setEmail={setEmail} password={password} setPassword={setPassword} handleSubmit={handleSubmit} toggleRegistration={toggleRegistration}/>
      ) : forgotPassword ? (
        <div></div>
      ) : (
        <div></div>
      )
    }
    </div>
  );
}

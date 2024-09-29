import React, { useState, useContext } from "react";

import * as api from "../api";
import * as utils from "../utils";

import LoginForm from "../components/LoginForm";
import RegistrationForm from "../components/RegistrationForm";
import ForgetPasswordForm from "../components/ForgotPasswordForm";

export default function Authentication({ setUser }) {
  const [registration, setRegistration] = useState(true);
  const [forgotPassword, setForgotPassword] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirect = utils.useRedirectToMainPage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let userData;
      if (registration) {
        userData = await api.registration(username, email, password);
        setRegistration(false);
      } else if (forgotPassword) {
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
  };

  const toggleRegistration = () => {
    setRegistration(!registration);
    setForgotPassword(false);
    setUsername("");
    setPassword("");
  };

  const toggleForgotPassword = () => {
    setForgotPassword(!forgotPassword);
    setRegistration(false);
    setUsername("");
    setPassword("");
  };

  const containerClassName = "flex flex-col items-center md:py-40 py-20 w-full";

  return (
    <div className={containerClassName}>
      {registration ? (
        <RegistrationForm
          username={username}
          setUsername={setUsername}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleSubmit={handleSubmit}
          toggleRegistration={toggleRegistration}
        />
      ) : forgotPassword ? (
        <ForgetPasswordForm
          username={username}
          setUsername={setUsername}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleSubmit={handleSubmit}
          toggleRegistration={toggleRegistration}
          toggleForgotPassword={toggleForgotPassword}
        />
      ) : (
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleSubmit={handleSubmit}
          toggleRegistration={toggleRegistration}
          toggleForgotPassword={toggleForgotPassword}
        />
      )}
    </div>
  );
}
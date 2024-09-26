import React, { useState, useContext } from "react";
import ThemeContext from "../components/ThemeContext";

import * as api from "../api";
import * as utils from "../utils";

import LoginForm from "../components/LoginForm";
import RegistrationForm from "../components/RegistrationForm";
import ForgetPasswordForm from "../components/ForgotPasswordForm";

export default function Authentication({ setUser }) {
  const [registration, setRegistration] = useState(true); // Переключение между регистрацией и логином
  const [forgotPassword, setForgotPassword] = useState(false); // Переключение между логином и сбросом пароля

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isDarkMode } = useContext(ThemeContext);

  const redirect = utils.useRedirectToMainPage();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let userData;
      if (registration) {
        userData = await api.registration(username, email, password);
        setRegistration(false); // После успешной регистрации переключаемся на логин
      } else if (forgotPassword) {
        // TODO: добавить функциональность сброса пароля
        //await utils.forgotPassword(email); 
        setForgotPassword(false); // Возвращаемся к логину после сброса пароля
      } else {
        userData = await api.login(username, password);
      }
      
      if (!forgotPassword) {
        setUser(userData); // Устанавливаем данные пользователя после успешного логина
        redirect(); // Перенаправляем на главную страницу
      }
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  }

  function toggleRegistration() {
    setRegistration(!registration);
    setForgotPassword(false);
    setUsername("");
    setPassword("");
  }

  function toggleForgotPassword() {
    setForgotPassword(!forgotPassword);
    setRegistration(false);
    setUsername("");
    setPassword("");
  }

  return (
    <div className={`flex flex-col items-center md:py-40 py-20 w-full ${isDarkMode ? "bg-darkModeBackground text-darkModeText" : "bg-lightModeBackground text-lightModeText"}`}>
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

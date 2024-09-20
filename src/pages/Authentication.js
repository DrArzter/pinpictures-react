import React, { useState, useContext } from "react";
import ThemeContext from "../components/ThemeContext";

import * as api from "../api";
import * as utils from "../utils";

import LoginForm from "../components/LoginForm";
import RegistrationForm from "../components/RegistrationForm";

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
    <div className={`flex flex-col items-center md:mt-40 mt-20 w-full ${isDarkMode ? "bg-darkModeBackground text-darkModeText" : ""}`}>
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
        <div className="w-full max-w-sm">
          <h2 className="text-xl font-bold mb-4">Reset Password</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-4 p-2 w-full border"
            />
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
              Send Reset Link
            </button>
            <button
              type="button"
              onClick={() => setForgotPassword(false)}
              className="text-blue-500 mt-4 block"
            >
              Back to Login
            </button>
          </form>
        </div>
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

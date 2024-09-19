import React, { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";



const RegistrationForm = ({ username, setUsername, email, setEmail, password, setPassword, handleSubmit, toggleRegistration }) => {

  function onChange(value) {
    console.log("Captcha value:", value);
  }

  return (
    <div className="flex flex-col items-center w-full gap-[18px]">
      <div className="flex flex-col items-center">
        <p className="text-[32px]">Welcome to PinPictures</p>
        <p>Some good text here</p>
      </div>
      <div className="flex flex-col items-center w-full">
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-[18px] px-[45px] w-full">
          <div className="w-full">
            <p className="text-[14px] ml-[8px] text-ACDC">Username</p>
            <input
              type="text"
              placeholder="Enter your username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="rounded-[12px] py-[8px] px-[6px] border border-[2px] border-ACDC w-full"
            />
          </div>
          <div className="w-full">
            <p className="text-[14px] ml-[8px] text-ACDC">Email</p>
            <input
              type="email"
              placeholder="Enter your email adress..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-[12px] py-[8px] px-[6px] border border-[2px] border-ACDC w-full"
            />
          </div>
          <div className="w-full">
            <p className="text-[14px] ml-[8px] text-ACDC">Password</p>
            <input
              type="password"
              placeholder="Enter your password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-[12px] py-[8px] px-[6px] border border-[2px] border-ACDC w-full"
            />
          </div>
          <ReCAPTCHA
            sitekey="6LficpceAAAAANnSeUpax0_D-ug002vJNOKvKSJR"
            onChange={onChange}
          />
          <button type="submit" className="rounded-[16px] bg-red">Sign up</button>
          <button onClick={toggleRegistration}>Already have an account?</button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm
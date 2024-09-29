import React from "react";
import * as utils from "../utils";

export default function NotFound() {
  const redirect = utils.useRedirectToMainPage();

  const containerClassName = `flex flex-col items-center min-h-screen p-4`;

  const errorHeaderClassName = `w-full lg:w-3/4 p-6 bg-zinc-800 rounded-lg shadow-lg`;

  const errorContentClassName = `w-full lg:w-3/4 p-6 bg-zinc-800 rounded-lg shadow-lg mt-4`;

  const linkClassName = `text-blue-400 hover:underline cursor-pointer`;

  return (
    <div className={containerClassName}>
      <div className={errorHeaderClassName}>
        <h1 className="text-5xl font-bold text-center mb-4">Error 404</h1>
        <h2 className="text-3xl font-bold text-center mb-4">Page Not Found</h2>
      </div>
      <div className={errorContentClassName}>
        <p className="text-center mb-4">
          If you have any questions or concerns, please contact me.
        </p>
        <p className="text-center">
          <span className={linkClassName} onClick={redirect}>
            Get back to main page
          </span>
        </p>
      </div>
    </div>
  );
}
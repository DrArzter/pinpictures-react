import React from "react";

export default function Support() {
  const containerClassName = `flex flex-col items-center mx-auto p-4`;

  const supportHeaderClassName = `w-full lg:w-3/4 p-6 bg-zinc-800 rounded-lg`;

  const supportContentClassName = `w-full lg:w-3/4 p-6 rounded-lg bg-zinc-800 mt-4`;

  const iframeClassName = `w-full lg:w-[325px] h-[646px]`;

  return (
    <div className={containerClassName}>
      <div className={supportHeaderClassName}>
        <h1 className="text-2xl font-bold mb-4">Support</h1>
      </div>
      <div className={supportContentClassName}>
        <p className="mb-4">If you have any questions or concerns, please contact me.</p>
        <p className="mb-4">Email: chapegarostislav@gmail.com</p>
        <a href="https://github.com/DrArzter" className="mb-4">
          GitHub
        </a>
      </div>
    </div>
  );
}
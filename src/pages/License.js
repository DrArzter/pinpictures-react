import React from "react";

export default function License() {
  const containerClassName = `flex flex-col items-center mx-auto p-4 min-h-screen`;

  const licenseHeaderClassName = `w-full lg:w-3/4 bg-zinc-800 p-6 rounded-lg shadow-md`;

  const licenseContentClassName = `w-full lg:w-3/4 bg-zinc-800 p-6 rounded-lg mt-4 shadow-md`;

  const paragraphClassName = `mb-4`;


  return (
    <div className={containerClassName}>
      <div className={licenseHeaderClassName}>
        <h1 className="text-3xl font-bold mb-6 text-center">License</h1>
        <p className="mb-6 text-center">MIT License</p>
        <p className="mb-6 text-center">Copyright (c) 2024 Rostislaw Chapegma</p>
      </div>
      <div className={licenseContentClassName}>
        <p className={paragraphClassName}>
          Permission is hereby granted, free of charge, to any person obtaining a copy
          of this software and associated documentation files (the "Software"), to deal
          in the Software without restriction, including without limitation the rights
          to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
          copies of the Software, and to permit persons to whom the Software is
          furnished to do so, subject to the following conditions:
        </p>
        <p className={paragraphClassName}>
          The above copyright notice and this permission notice shall be included in all
          copies or substantial portions of the Software.
        </p>
        <p className={paragraphClassName}>
          THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
          IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
          FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
          AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
          LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
          OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
          SOFTWARE.
        </p>
      </div>
    </div>
  );
}
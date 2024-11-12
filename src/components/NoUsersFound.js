import React from "react";

export default function NoUsersFound() {
  const className = `text-center`;

  return (
    <div className={className}>
      <p>
        No users found. Try searching for something else or registrate!
      </p>
    </div>
  );
}
import React, { useContext } from "react";
import User from "./User";

export default function UserList({ users }) {

  const postListClassName = "flex gap-4 overflow-x-auto break-keep p-4";

  return (
    <div className={postListClassName}>
      {users.map((user) => (
        <User key={user.id} user={user} />
      ))}
    </div>
  );
}
import React, { useContext } from "react";
import User from "./User";

export default function UserList({ users }) {

  const postListClassName = "grid grid-cols-4 gap-4 break-lines p-4";

  return (
    <div className={postListClassName}>
      {users.map((user) => (
        <User key={user.id} user={user} />
      ))}
    </div>
  );
}
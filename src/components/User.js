import React, { useMemo } from "react";
import { RxAvatar } from "react-icons/rx";

import config from "../api/config";
import { Link } from "react-router-dom";

export default function User({ user }) {

    const profilePicSrc = useMemo(() => {
        if (!user) return "";
        return user.picpath.startsWith("https://ui-avatars.com/")
            ? user.picpath
            : config.apiUrl.replace("/api", "/") + user.picpath;
    }, [user]);

    const profilePicClassName = `w-20 h-20 rounded-full border-4 border-white cursor-pointer`;

    return (
        <Link to={`/profile/${user.name}`}>
        <div className="flex flex-col items-center justify-center rounded-full cursor-pointer">
            <img
                id="profilePic"
                className={profilePicClassName}
                src={profilePicSrc}
                alt="Profile Pic"
            />
            <h2 className="text-2xl font-bold">{user.name}</h2>
        </div>
        </Link>
    );
}
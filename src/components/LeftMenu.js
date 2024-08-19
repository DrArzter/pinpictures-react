import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaUserAlt, FaCog, FaInfoCircle } from "react-icons/fa";

import * as utils from "../utils";

export default function LeftMenu({ user }) {
    const menuLinks = [
        { name: "Home", path: "/" },
        { name: "Profile", path: user ? `/profile/${user.name}` : "/authentification" },
        { name: "Settings", path: "/settings" }
    ];

    return (
        <div className="fixed top-0 left-0 h-full w-24 flex flex-col bg-zinc-800 shadow-lg lg:block hidden transition-transform duration-300 ease-in-out">
            <utils.ScrollToTop />
            <div className="flex flex-col justify-between h-full">
                <div className="mt-20 flex flex-col justify-evenly space-y-4 text-white">
                    {menuLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className="flex flex-col items-center space-y-2 hover:text-yellow-500 transition duration-300"
                        >
                            {link.name === "Home" && <FaHome size={24} />}
                            {link.name === "Profile" && <FaUserAlt size={24} />}
                            {link.name === "Settings" && <FaCog size={24} />}
                            <span className="text-sm">{link.name}</span>
                        </Link>
                    ))}
                </div>

                <div className="mb-4 flex flex-col items-center mb-20 space-y-2 text-white">
                    <Link
                        to="/support"
                        className="flex flex-col items-center space-y-2 hover:text-yellow-500 transition duration-300"
                    >
                        <FaInfoCircle size={24} />
                        <span className="text-sm">Support</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

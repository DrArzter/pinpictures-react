import React, { useState } from "react";
import { Link } from "react-router-dom";

import * as utils from "../utils";

export default function Header({user, headerLinks }) {   

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <header className="header p-4">
            <div className="header__logo text-3xl font-bold flex flex-row justify-between items-center">
                <div className="header__logo text-3xl font-bold items-center flex flex-row">
                    <svg width="100" height="50" viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg">
                        <g transform="rotate(10, 30, 25)">
                            <path d="M10,5 L10,45 L20,45 L20,27.5 L27.5,27.5 C35,27.5 40,22.5 40,15 C40,7.5 35,5 27.5,5 L10,5 Z M20,15 L20,12.5 L27.5,12.5 C30,12.5 32.5,15 32.5,15 C32.5,17.5 30,20 27.5,20 L20,20 L20,15 Z" fill="#D1D5DB" />
                        </g>
                        <g transform="rotate(10, 60, 25)">
                            <path d="M45,20 L45,45 L55,45 L55,35 C57.5,37.5 62.5,37.5 65,35 C67.5,32.5 67.5,27.5 65,25 C62.5,22.5 57.5,22.5 55,25 L55,20 L45,20 Z M55,27.5 C57.5,27.5 60,30 60,30 C60,32.5 57.5,35 55,35 L55,27.5 Z" fill="#D1D5DB" />
                        </g>
                    </svg>
                    <Link to="/" className="header__logo text-3xl font-bold">PinPictures</Link>
                </div>
                <div className="header__login ml-4 flex flex-row ">
                    <button type="button" onClick={toggleDropdown} className="btn btn--primary inline-flex items-center">
                        {user ? user[0].name : 'Login'}
                        <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                    {isDropdownOpen && <utils.DropdownMenu headerLinks={headerLinks} isDropdownOpen={isDropdownOpen} />}
                </div>
            </div>
        </header>
    );
}

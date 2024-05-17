import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as utils from "../utils";

export default function Header({ user, headerLinks }) {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <header className="header p-4 rounded-2xl relative">
            <div className="header__logo text-3xl font-bold flex flex-row justify-between lg:mx-auto items-center lg:w-3/4">
                <div className="header__logo text-3xl font-bold items-center flex flex-row">
                    <svg width="40px" height="40" className="fill-zinc-300" version="1.1" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg">
                        <g>
                            <path d="m1089.6 248.4-420-230.4c-43.199-24-94.801-24-138 0l-420 230.4c-46.801 25.203-75.602 73.203-75.602 126v451.2c0 52.801 28.801 100.8 74.398 126l420 230.4c21.602 12 45.602 18 69.602 18s48-6 69.602-18l420-230.4c45.602-25.199 74.398-73.199 74.398-126v-451.2c0-52.797-28.801-100.8-74.398-126zm26.398 577.2c0 34.801-19.199 67.199-50.398 84l-420 230.4c-28.801 15.602-63.602 15.602-92.398 0l-420-230.4c-31.199-16.801-49.199-49.199-49.199-84l-0.003906-451.2c0-34.801 19.199-67.199 49.199-84l420-230.4c14.398-8.3984 30-12 46.801-12s31.199 3.6016 45.602 12l420 230.4c31.199 16.801 50.398 49.199 50.398 84z" />
                            <path d="m495.6 484.8h-60c-25.199 0-37.199 12-37.199 39.602v136.8c0 21.602 12 34.801 32.398 34.801 20.398 0 32.398-12 32.398-34.801v-33.602h33.602c50.398 0 90-15.602 90-72-1.1992-55.203-40.801-70.801-91.199-70.801zm3.5977 93.598h-36v-43.199h33.602c15.602 0 25.199 8.3984 25.199 21.602 0 14.398-12 21.598-22.801 21.598z" />
                            <path d="m720 484.8h-60c-25.199 0-37.199 12-37.199 39.602v136.8c0 21.602 12 34.801 32.398 34.801 20.398 0 32.398-12 32.398-34.801v-33.602h32.402c50.398 0 90-15.602 90-72 0-55.203-39.602-70.801-90-70.801zm3.6016 93.598h-36v-43.199h32.398c15.602 0 25.199 8.3984 25.199 21.602 0 14.398-10.801 21.598-21.598 21.598z" />
                        </g>
                    </svg>
                    <Link to="/" className="header__logo ml-4 text-3xl font-bold">PinPictures</Link>
                </div>
                <div className="header__login ml-4 flex flex-row relative">
                    <button type="button" onClick={toggleDropdown} className="btn btn--primary inline-flex items-center">
                        {user ? user[0].name : 'Login'}
                        <svg className="-mr-1 mt-2 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                    {isDropdownOpen && <utils.DropdownMenu headerLinks={headerLinks} user={user} isDropdownOpen={isDropdownOpen} toggleDropdown={toggleDropdown} />}
                </div>
            </div>
        </header>
    );
}

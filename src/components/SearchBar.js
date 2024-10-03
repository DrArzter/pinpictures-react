import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom'

import { SlMagnifier } from "react-icons/sl";
import ThemeContext from "./ThemeContext";

export default function SearchBar() {

    const Navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = () => {
        if (!searchTerm) return;
        Navigate(`/search/${searchTerm}`);
        setSearchTerm("");
    };

    const { isDarkMode } = useContext(ThemeContext);

    const searchBarClassName = `flex items-center bg-white flex-grow max-w-xl mx-4 rounded-full hidden lg:flex border-2 shadow-sm`;

    const searchInputClassName = `w-full rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-lightModeText`;

    const searchIconContainerClassName = `p-2  rounded-full cursor-pointer text-lightModeText hover:text-yellow-500 hover:scale-110 transition-all duration-300`;

    return (
        <div className={searchBarClassName}>
            <input className={searchInputClassName}
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            type="text" 
            placeholder="Search..." />
            <div className={searchIconContainerClassName}
                onClick={(e) => handleSearch(e, searchTerm)}>
                <SlMagnifier size={24} />
            </div>
        </div>
    );
}
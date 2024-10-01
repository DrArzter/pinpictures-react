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

    const searchBarClassName = `flex items-center flex-grow max-w-xl mx-4 rounded-full hidden lg:flex transition-colors ${isDarkMode ? "bg-[#555] text-white" : "bg-[#D9D9D9]"
        } shadow-sm`;

    const searchInputClassName = `w-full rounded-full px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors ${isDarkMode ? "bg-[#555]" : "bg-[#D9D9D9]"
        }`;

    const searchIconContainerClassName = `p-2 rounded-full cursor-pointer hover:bg-[#D9D9D9] transition-colors ${isDarkMode ? "bg-[#777]" : "bg-[#ACACAC]"
        }`;

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
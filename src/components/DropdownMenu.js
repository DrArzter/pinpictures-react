import React from "react";

export default function DropDownMenu({ children }) {

    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className={`absolute right-0 mt-12 mr-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none ${isDropdownOpen ? 'block' : 'hidden'}`}>
            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                {headerLinks.map((link, index) => (
                    <Link key={index} to={link.path} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                        {link.name}
                    </Link>
                ))}
            </div>
        </div>
    );
}
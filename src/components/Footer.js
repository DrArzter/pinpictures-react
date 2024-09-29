import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import debounce from 'lodash/debounce';

import { GoHomeFill } from "react-icons/go";
import { FaUser } from "react-icons/fa";
import { SlMagnifier } from "react-icons/sl";

import ThemeContext from "../components/ThemeContext";

export default function Footer(user) {
  const [isVisible, setIsVisible] = useState(false);
  const { isMobile, setIsMobile } = useContext(ThemeContext);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;
      setIsVisible(isBottom);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = debounce(() => {
      setIsMobile(window.innerWidth < 768);
    }, 500);

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      handleResize.cancel();
    };
  }, [isMobile]);

  const mobileFooterClassName = `fixed flex flex-row justify-evenly bottom-0 left-0 right-0 text-center z-[999] bg-white h-[6vh] transition-all duration-800`;

  const desktopFooterClassName = `bg-zinc-800 py-4 text-center w-full fixed bottom-0 transition-transform duration-300 transform ${isVisible ? 'translate-y-0' : 'translate-y-full'}`;

  const getLinkClassName = (path) => `${location.pathname === path ? "bg-black" : "bg-white"} rounded-b-[25px] w-full p-[7px]`;

  const getIconClassName = (path) => `${location.pathname === path ? "text-white" : "text-ACDC"} mx-auto w-full self-center h-full`;

  const profileLinkPath = user.user ? "/Profile/"+user.user.name : "/Authentification";

  return (
    <>
      {isMobile ? (
        <footer className={mobileFooterClassName}>
          <Link to="/" className={getLinkClassName("/")}>
            <GoHomeFill className={getIconClassName("/")} />
          </Link>
          <Link to="/Search" className={getLinkClassName("/Search")}>
            <SlMagnifier className={getIconClassName("/Search")} />
          </Link>
          <Link to={profileLinkPath} className={getLinkClassName(profileLinkPath)}>
            <FaUser className={getIconClassName(profileLinkPath)} />
          </Link>
        </footer>
      ) : (
        <footer className={desktopFooterClassName}>
          <div>
            <a href="https://github.com/DrArzter" className="hover:text-gray-400">
              GitHub
            </a>
          </div>
        </footer>
      )}
    </>
  );
}
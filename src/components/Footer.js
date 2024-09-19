import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import ThemeContext from "../components/ThemeContext";
import debounce from 'lodash/debounce';
import { GoHomeFill } from "react-icons/go";
import { FaUser } from "react-icons/fa";
import { SlMagnifier } from "react-icons/sl";




export default function Footer(user) {

  const [isVisible, setIsVisible] = useState(false);

  const { isMobile, setIsMobile } = useContext(ThemeContext)

  useEffect(() => {
    function handleScroll() {
      const isBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;
      setIsVisible(isBottom);
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {

    const handleResize = debounce(() => {
      setIsMobile(window.innerWidth < 768);
    }, 500);

    // Run once on mount to set the correct state
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      handleResize.cancel();
    };
  }, [isMobile]);

  var location = useLocation();
  
  return (
    <>
    {
      isMobile ?  (
         
        <footer 
        className={`fixed flex flex-row justify-evenly bottom-0 left-0 right-0 text-center z-[999] bg-white h-[6vh] transition-all duration-800 `}
      >
          <Link to="/" 
          className={`${location.pathname === "/" ? "bg-black" : "bg-white"} rounded-br-[25px] w-full p-[7px]`}
          ><GoHomeFill className={`${location.pathname === "/" ? "text-white" : "text-ACDC"} mx-auto w-full self-center h-full`}/></Link>
          <Link to="/Search" 
          className={`${location.pathname === "/Search" ? "bg-black" : "bg-white"} rounded-b-[25px] w-full p-[7px]`}
          ><SlMagnifier className={`${location.pathname === "/Search" ? "text-white" : "text-ACDC"} mx-auto w-full self-center h-full`}/></Link>
          <Link to={`${user.user ? "/Profile/"+user.user.name : "/Authentification"}`}
          className={`${location.pathname === `${user.user ? "/Profile/"+user.user.name : "/Authentification"}` ? "bg-black" : "bg-white"} rounded-bl-[25px] w-full p-[7px]`}
          ><FaUser className={`${location.pathname === `${user.user ? "/Profile/"+user.user.name : "/Authentification"}` ? "text-white" : "text-ACDC"} mx-auto w-full self-center h-full`}/></Link>
      </footer>
      ) : (
        <footer 
        className={`bg-zinc-800 py-4 text-center w-full fixed bottom-0 transition-transform duration-300 transform ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <div>
          <a href="https://github.com/DrArzter" className="hover:text-gray-400">GitHub</a>
        </div>
      </footer>
      )
    }
    </>
  )
}

import React from "react";
import { useState, useEffect } from "react";

export default function Footer() {
    const [isVisible, setIsVisible] = useState(false);
  
    useEffect(() => {
      function handleScroll() {
        const isBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;
        setIsVisible(isBottom);
      }
  
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  
    return (
      <footer className={`bg-zinc-800 py-4 text-center w-full fixed bottom-0 transition-all duration-300 ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
        <div>
          <div>
            <a href="https://github.com/DrArzter" className="hover:text-gray-400">GitHub</a>
          </div>
        </div>
      </footer>
    );
  }
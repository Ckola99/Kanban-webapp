import React from "react";
import useDarkMode from "../hooks/useDarkMode";
import lightIcon from "../assets/icon-light-theme.svg";
import darkIcon from "../assets/icon-dark-theme.svg";
import { useLocation } from "react-router-dom";

const DarkModeToggle = () => {
  const [isDarkMode, toggleDarkMode] = useDarkMode();
  const location = useLocation();

  const isWorkPage = location.pathname.includes('workpage');

  return (
    <div
      className={`w-[235px] h-12 mx-auto rounded-lg bg-secondary-light-gray flex items-center ${isWorkPage && isDarkMode ? 'dark:bg-gray-700': 'dark:bg-secondary-black' }`}
    >
      <div className="flex items-center justify-center w-full gap-5">
        {/* Light mode icon */}
        <img src={lightIcon} alt="Light Icon" className="w-6 h-6" />

        {/* Toggle Switch */}
        <button  onClick={toggleDarkMode} className="bg-primary-blue w-11 h-6 rounded-3xl flex items-center px-1 py-2">
          <div
            className={`w-4 h-4 bg-white rounded-full transition-all duration-300 ease-in-out ${
              isDarkMode ? 'transform translate-x-5' : 'transform translate-x-0'
            }`}
          ></div>
        </button>

        {/* Dark mode icon */}
        <img src={darkIcon} alt="Dark Icon" className="w-6 h-6" />
      </div>
    </div>
  );
};

export default DarkModeToggle;

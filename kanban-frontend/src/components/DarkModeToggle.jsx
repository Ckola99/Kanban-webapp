// src/components/DarkModeToggle.jsx
import React from "react";
import useDarkMode from "../hooks/useDarkMode";

const DarkModeToggle = () => {
	const [isDarkMode, toggleDarkMode] = useDarkMode();

	return (
		<button
			onClick={toggleDarkMode}
			className="p-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
		>
			{isDarkMode
				? "Switch to Light Mode"
				: "Switch to Dark Mode"}
		</button>
	);
};

export default DarkModeToggle;

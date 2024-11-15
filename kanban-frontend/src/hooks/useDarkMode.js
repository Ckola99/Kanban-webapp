// src/hooks/useDarkMode.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../features/theme/themeSlice';

const useDarkMode = () => {
	const dispatch = useDispatch();
	const isDarkMode = useSelector((state) => state.theme.isDarkMode);

	const toggleDarkMode = () => {
		dispatch(toggleTheme());
	};

	useEffect(() => {
		// Dynamically update the body class based on the theme state.
		const theme = isDarkMode ? 'dark' : 'light';

		//dynamically adds the dark class or removes it with the 2nd parameter. If isDarkMode is true, the dark class is added to <body>.
		document.body.classList.toggle('dark', isDarkMode);
	}, [isDarkMode]);

	return [isDarkMode, toggleDarkMode];
};

export default useDarkMode;

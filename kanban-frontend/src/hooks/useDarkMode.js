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
		if (isDarkMode) {
			document.body.classList.add('dark');
		} else {
			document.body.classList.remove('dark');
		}
	}, [isDarkMode]);

	return [isDarkMode, toggleDarkMode];
};

export default useDarkMode;

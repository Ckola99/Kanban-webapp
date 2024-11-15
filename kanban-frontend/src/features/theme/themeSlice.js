import { createSlice } from '@reduxjs/toolkit';

const savedTheme = window.localStorage.getItem('theme') || 'light';

const initialState = {
	isDarkMode: savedTheme === 'dark', // Boolean indicating whether dark mode is active.,
};

const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		toggleTheme: (state) => {
			state.isDarkMode = !state.isDarkMode;

			// Update localStorage with the new theme.
			const theme = state.isDarkMode ? 'dark' : 'light';
			window.localStorage.setItem('theme', theme);
		},
	},
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;

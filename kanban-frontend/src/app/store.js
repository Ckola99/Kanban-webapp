import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../features/theme/themeSlice'
import boardsSliceReducer from '../features/boards/boardsSlice'

const store = configureStore({
	reducer: {
		theme: themeReducer,
		boards: boardsSliceReducer,
	},
});

export default store;

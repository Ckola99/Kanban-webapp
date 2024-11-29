import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../features/theme/themeSlice'
import boardsSliceReducer from '../features/boards/boardsSlice'
import promodoroSliceReducer from '../features/promodoro/promodoroSlice'

const store = configureStore({
	reducer: {
		theme: themeReducer,
		boards: boardsSliceReducer,
		promodoro: promodoroSliceReducer
	},
});

export default store;

import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../features/theme/themeSlice'
import boardsSliceReducer from '../features/boards/boardsSlice'
import pomodoroSliceReducer from '../features/pomodoro/pomodoroSlice'

const store = configureStore({
	reducer: {
		theme: themeReducer,
		boards: boardsSliceReducer,
		pomodoro: pomodoroSliceReducer
	},
});

export default store;

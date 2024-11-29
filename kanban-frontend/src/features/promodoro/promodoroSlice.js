import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	workBoard: false,
	work: false,
	shortBreak: false,
	longBreak: false,
	isTimerRunning: false,
	completedSessions: 0
}


const promodoroSlice = createSlice({
	name: 'promodoro',
	initialState,
	reducers: {

	}
})

export default promodoroSlice.reducer;

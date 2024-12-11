// src/features/pomodoro/pomodoroSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	workBoard: false, // Tracks whether the Pomodoro modal is open
	activeSession: "work", // Tracks the current session type ('work', 'shortBreak', 'longBreak')
	isTimerRunning: false, // Indicates if the timer is active
	completedSessions: 0, // Tracks the number of completed work sessions
	currentTask: null, // Stores the current task being worked on
	pomodoroSettings: {
		workDuration: 25, // Work session duration in minutes
		shortBreakDuration: 5, // Short break duration in minutes
		longBreakDuration: 15, // Long break duration in minutes
		longBreakInterval: 4, // After how many sessions to take a long break
	},
	timerValue: 1500, // Current timer value in seconds (defaults to 25 minutes)
};

const pomodoroSlice = createSlice({
	name: "pomodoro",
	initialState,
	reducers: {
		workBoardOpen: (state) => {
			state.workBoard = true;
		},
		workBoardClose: (state) => {
			state.workBoard = false;
		},
		startTimer: (state) => {
			state.isTimerRunning = true;
		},
		pauseTimer: (state) => {
			state.isTimerRunning = false;
		},
		resetTimer: (state) => {
			const { activeSession, pomodoroSettings } = state;
			state.isTimerRunning = false;
			switch (activeSession) {
				case "work":
					state.timerValue = pomodoroSettings.workDuration * 60;
					break;
				case "shortBreak":
					state.timerValue = pomodoroSettings.shortBreakDuration * 60;
					break;
				case "longBreak":
					state.timerValue = pomodoroSettings.longBreakDuration * 60;
					break;
				default:
					state.timerValue = pomodoroSettings.workDuration * 60;
			}
		},
		switchSession: (state) => {
			const { completedSessions, pomodoroSettings } = state;
			if (state.activeSession === "work") {
				state.completedSessions += 1;
				state.activeSession =
					state.completedSessions % pomodoroSettings.longBreakInterval === 0
						? "longBreak"
						: "shortBreak";
			} else {
				state.activeSession = "work";
			}
		},
		setCurrentTask: (state, action) => {
			state.currentTask = action.payload;
		},
		decrementTimer: (state) => {
			if (state.timerValue > 0) state.timerValue -= 1;
		},
	},
});

export default pomodoroSlice.reducer;
export const {
	workBoardOpen,
	workBoardClose,
	startTimer,
	pauseTimer,
	resetTimer,
	switchSession,
	setCurrentTask,
	decrementTimer,
} = pomodoroSlice.actions;
export const selectPomodoroState = (state) => state.pomodoro;

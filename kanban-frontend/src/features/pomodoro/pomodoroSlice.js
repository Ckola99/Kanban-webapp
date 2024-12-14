import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	workBoard: false, // Tracks whether the Pomodoro modal is open
	activeSession: "work", // Tracks the current session type ('work', 'shortBreak', 'longBreak')
	isTimerRunning: false, // Indicates if the timer is active
	completedSessions: 0, // Tracks the number of completed work sessions
	currentTask: null, // Stores the current task being worked on
	pomodoroSettings: {
		workDuration: 25  , // Work session duration in minutes
		shortBreakDuration: 5, // Short break duration in minutes
		longBreakDuration: 15, // Long break duration in minutes
		longBreakInterval: 4, // After how many sessions to take a long break
	},
	timerValue: 25 * 60 // Current timer value in seconds (defaults to 25 minutes)
};

const pomodoroSlice = createSlice({
	name: "pomodoro",
	initialState,
	reducers: {
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
				state.activeSession =
					state.completedSessions % pomodoroSettings.longBreakInterval === 0
						? "longBreak"
						: "shortBreak";
				if (state.activeSession === "longBreak") state.completedSessions = 0;
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
		// Define and export the incrementPomodoroCount action
		incrementPomodoroCount: (state) => {
			state.completedSessions += 1;
		},
		updateSettings: (state, action) => {
			const { workDuration, shortBreakDuration, longBreakDuration, longBreakInterval } =
				action.payload;
			state.pomodoroSettings = {
				workDuration: workDuration || state.pomodoroSettings.workDuration,
				shortBreakDuration: shortBreakDuration || state.pomodoroSettings.shortBreakDuration,
				longBreakDuration: longBreakDuration || state.pomodoroSettings.longBreakDuration,
				longBreakInterval: longBreakInterval || state.pomodoroSettings.longBreakInterval,
			};
			// Update timerValue based on the active session
			switch (state.activeSession) {
				case "work":
					state.timerValue = state.pomodoroSettings.workDuration * 60;
					break;
				case "shortBreak":
					state.timerValue = state.pomodoroSettings.shortBreakDuration * 60;
					break;
				case "longBreak":
					state.timerValue = state.pomodoroSettings.longBreakDuration * 60;
					break;
				default:
					state.timerValue = state.pomodoroSettings.workDuration * 60;
			}
		}
	},
});

export default pomodoroSlice.reducer;
export const {
	startTimer,
	pauseTimer,
	resetTimer,
	switchSession,
	setCurrentTask,
	decrementTimer,
	incrementPomodoroCount, // Export the action here
	updateSettings
} = pomodoroSlice.actions;
export const selectPomodoroState = (state) => state.pomodoro;

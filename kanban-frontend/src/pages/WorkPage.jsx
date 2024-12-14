// Import necessary libraries
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	selectPomodoroState,
	resetTimer,
	switchSession,
	decrementTimer,
	incrementPomodoroCount,
	startTimer
} from "../features/pomodoro/pomodoroSlice";
import "react-circular-progressbar/dist/styles.css";
import DarkModeToggle from '../components/DarkModeToggle'
import PlayButton from '../components/PlayButton'
import PauseButton from '../components/PauseButton'
import ResetButton from '../components/ResetButton'
import SettingsButton from '../components/SettingsButton'
import PomodoroClock from '../components/PomodoroClock'
import WorkTasks from '../components/WorkTasks'



const WorkPage = () => {

	const dispatch = useDispatch();

	const {
		activeSession,
		timerValue,
		pomodoroSettings,
		isTimerRunning,
		completedSessions,
	} = useSelector(selectPomodoroState);


	// Get the duration for the current session in seconds
	const sessionDuration =
		activeSession === "work"
			? pomodoroSettings.workDuration * 60
			: activeSession === "shortBreak"
				? pomodoroSettings.shortBreakDuration * 60
				: pomodoroSettings.longBreakDuration * 60;

	// Calculate progress for the circular progress bar
	const progress = (timerValue / sessionDuration) * 100;

	// Handle timer updates using useEffect
	useEffect(() => {
		let interval;
		if (isTimerRunning) {
			interval = setInterval(() => {
				dispatch(decrementTimer());
			}, 1000);
		} else {
			clearInterval(interval);
		}
		return () => clearInterval(interval);
	}, [isTimerRunning, dispatch]);

	const playAudio = (message) => {
		const speech = new SpeechSynthesisUtterance(message);
		speech.lang = "en-US";
		speech.pitch = 1;
		speech.rate = 1;
		speechSynthesis.speak(speech);
	};

	// Handle session transitions and the 4-Pomodoro logic
	useEffect(() => {
		if (timerValue === 0) {
			if (activeSession === "work") {
				if (completedSessions === 4) {
					playAudio("Long break time! Relax and recharge.");
					dispatch(switchSession("longBreak")); // Switch to long break after 4 Pomodoros
				} else {
					playAudio("Short break time! Take a quick rest.");
					dispatch(incrementPomodoroCount());
					dispatch(switchSession("shortBreak")); // Switch to short break otherwise
				}
			} else {
				playAudio("Back to work! Stay focused.");
				dispatch(switchSession("work")); // Switch back to work after a break
			}
			dispatch(resetTimer());
			dispatch(startTimer());
		}
	}, [timerValue, activeSession, completedSessions, dispatch]);


	return (
		<div className="relative font-plus-jakarta dark:bg-primary-black min-h-screen bg-primary-light-gray grid place-content-center ">
			<h1 className=" dark:text-white text-primary-blue text-center extra-large-heading mb-2">Work Mode</h1>
			<div className="max-w-[90%] max-h-[90%] grid grid-cols-2 gap-2 mx-auto">
				<div className="dark:bg-secondary-black bg-white flex flex-col items-center p-5 rounded-lg relative min-w-[350px]">

					<h1 className="text-white mb-2">{activeSession === 'work' ? `Promodoro ${completedSessions + 1}` : activeSession === 'shortBreak' ? ' Short Break' : 'Long Break'}</h1>

					<PomodoroClock progress={progress} timerValue={timerValue} />



					{/* Buttons */}
					<div className="flex justify-center space-x-5 mb-5">

						{isTimerRunning ? (
							<PauseButton />
						) : (
							<PlayButton />
						)}

						<ResetButton />
					</div>

					<SettingsButton />

					<DarkModeToggle />
				</div>

				{/* Tasks */}
				<WorkTasks />

			</div>
		</div>
	);
};

export default WorkPage;
